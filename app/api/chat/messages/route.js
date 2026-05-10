import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const communityId = searchParams.get('communityId');
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();

    let messages;

    if (conversationId && ObjectId.isValid(conversationId)) {
      // Fetch direct message conversation
      messages = await db
        .collection('chat_messages')
        .find({ conversationId: new ObjectId(conversationId) })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
    } else if (communityId && ObjectId.isValid(communityId)) {
      // Fetch community messages
      messages = await db
        .collection('chat_community_messages')
        .find({ communityId: new ObjectId(communityId) })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();
    } else {
      return NextResponse.json({ ok: false, message: 'Invalid conversation or community ID' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      messages: messages.reverse().map(msg => ({
        id: String(msg._id),
        text: msg.text,
        authorId: String(msg.authorId),
        authorName: msg.authorName,
        authorRole: msg.authorRole,
        createdAt: msg.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load messages' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = new ObjectId(sessionId);
    const db = await getDb();

    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { text, conversationId, communityId, recipientId } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ ok: false, message: 'Message text is required' }, { status: 400 });
    }

    if (conversationId && ObjectId.isValid(conversationId)) {
      // Direct message
      const message = {
        _id: new ObjectId(),
        conversationId: new ObjectId(conversationId),
        authorId: userId,
        authorName: user.fullName || user.email,
        authorRole: user.role,
        text: text.trim(),
        createdAt: new Date(),
      };

      await db.collection('chat_messages').insertOne(message);

      // Update conversation last message
      await db
        .collection('chat_direct_messages')
        .updateOne(
          { _id: new ObjectId(conversationId) },
          {
            $set: {
              lastMessage: text.trim(),
              lastMessageBy: userId,
              lastMessageAt: new Date(),
            },
          }
        );

      return NextResponse.json({
        ok: true,
        message: {
          id: String(message._id),
          text: message.text,
          authorId: String(message.authorId),
          authorName: message.authorName,
          authorRole: message.authorRole,
          createdAt: message.createdAt,
        },
      });
    } else if (communityId && ObjectId.isValid(communityId)) {
      // Community message
      const message = {
        _id: new ObjectId(),
        communityId: new ObjectId(communityId),
        authorId: userId,
        authorName: user.fullName || user.email,
        authorRole: user.role,
        text: text.trim(),
        createdAt: new Date(),
      };

      await db.collection('chat_community_messages').insertOne(message);

      // Update community last message
      await db
        .collection('chat_communities')
        .updateOne(
          { _id: new ObjectId(communityId) },
          {
            $set: {
              lastMessage: text.trim(),
              lastMessageAt: new Date(),
            },
          }
        );

      return NextResponse.json({
        ok: true,
        message: {
          id: String(message._id),
          text: message.text,
          authorId: String(message.authorId),
          authorName: message.authorName,
          authorRole: message.authorRole,
          createdAt: message.createdAt,
        },
      });
    } else if (recipientId) {
      // Start new direct message
      const conversation = await db
        .collection('chat_direct_messages')
        .findOne({
          participants: { $all: [userId, new ObjectId(recipientId)] },
        });

      let conversationObjectId;

      if (conversation) {
        conversationObjectId = conversation._id;
      } else {
        const newConversation = {
          _id: new ObjectId(),
          participants: [userId, new ObjectId(recipientId)],
          lastMessage: text.trim(),
          lastMessageBy: userId,
          lastMessageAt: new Date(),
        };
        await db.collection('chat_direct_messages').insertOne(newConversation);
        conversationObjectId = newConversation._id;
      }

      const message = {
        _id: new ObjectId(),
        conversationId: conversationObjectId,
        authorId: userId,
        authorName: user.fullName || user.email,
        authorRole: user.role,
        text: text.trim(),
        createdAt: new Date(),
      };

      await db.collection('chat_messages').insertOne(message);

      return NextResponse.json({
        ok: true,
        conversationId: String(conversationObjectId),
        message: {
          id: String(message._id),
          text: message.text,
          authorId: String(message.authorId),
          authorName: message.authorName,
          authorRole: message.authorRole,
          createdAt: message.createdAt,
        },
      });
    }

    return NextResponse.json(
      { ok: false, message: 'Invalid request parameters' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to send message' },
      { status: 500 }
    );
  }
}
