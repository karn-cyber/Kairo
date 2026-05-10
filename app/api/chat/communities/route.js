import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'public' or 'invite-only'

    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();

    let filter = { type: { $in: ['public', 'invite-only'] } };
    if (type === 'public' || type === 'invite-only') {
      filter = { type };
    }

    const communities = await db
      .collection('chat_communities')
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({
      ok: true,
      communities: communities.map(c => ({
        id: String(c._id),
        name: c.name,
        description: c.description,
        type: c.type,
        joinCode: c.type === 'invite-only' ? c.joinCode : null,
        memberCount: c.memberCount || 0,
        lastMessage: c.lastMessage,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load communities' },
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

    const body = await request.json();
    const { action, communityId, joinCode } = body;

    if (action === 'join') {
      if (!communityId || !ObjectId.isValid(communityId)) {
        return NextResponse.json({ ok: false, message: 'Invalid community ID' }, { status: 400 });
      }

      const community = await db
        .collection('chat_communities')
        .findOne({ _id: new ObjectId(communityId) });

      if (!community) {
        return NextResponse.json({ ok: false, message: 'Community not found' }, { status: 404 });
      }

      if (community.type === 'invite-only' && joinCode !== community.joinCode) {
        return NextResponse.json({ ok: false, message: 'Invalid join code' }, { status: 403 });
      }

      // Check if already member
      const existing = await db
        .collection('chat_community_members')
        .findOne({
          communityId: new ObjectId(communityId),
          userId,
        });

      if (existing) {
        return NextResponse.json({ ok: true, message: 'Already a member' });
      }

      // Add member
      await db.collection('chat_community_members').insertOne({
        _id: new ObjectId(),
        communityId: new ObjectId(communityId),
        userId,
        joinedAt: new Date(),
      });

      // Update member count
      await db
        .collection('chat_communities')
        .updateOne(
          { _id: new ObjectId(communityId) },
          { $inc: { memberCount: 1 } }
        );

      return NextResponse.json({
        ok: true,
        message: 'Joined community successfully',
      });
    }

    return NextResponse.json(
      { ok: false, message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to perform action' },
      { status: 500 }
    );
  }
}
