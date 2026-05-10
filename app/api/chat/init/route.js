import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME } from '@/lib/session';

// Initialize Kairo main community for all users
export async function POST(request) {
  try {
    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = new ObjectId(sessionId);
    const db = await getDb();

    // Ensure Kairo main community exists
    let mainCommunity = await db
      .collection('chat_communities')
      .findOne({ type: 'main' });

    if (!mainCommunity) {
      const newCommunity = {
        _id: new ObjectId(),
        name: 'Kairo Community',
        description: 'Main community for all Kairo users',
        type: 'main',
        memberCount: 1,
        createdAt: new Date(),
      };
      await db.collection('chat_communities').insertOne(newCommunity);
      mainCommunity = newCommunity;
    }

    // Check if user is already a member
    const existing = await db
      .collection('chat_community_members')
      .findOne({
        communityId: mainCommunity._id,
        userId,
      });

    if (!existing) {
      await db.collection('chat_community_members').insertOne({
        _id: new ObjectId(),
        communityId: mainCommunity._id,
        userId,
        joinedAt: new Date(),
      });

      // Update member count
      await db
        .collection('chat_communities')
        .updateOne(
          { _id: mainCommunity._id },
          { $inc: { memberCount: 1 } }
        );
    }

    return NextResponse.json({
      ok: true,
      mainCommunityId: String(mainCommunity._id),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to initialize chat' },
      { status: 500 }
    );
  }
}
