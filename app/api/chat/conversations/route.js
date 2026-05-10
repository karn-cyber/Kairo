import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';
import { SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET(request) {
  try {
    const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId || !ObjectId.isValid(sessionId)) {
      return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const userId = new ObjectId(sessionId);

    // Get user info
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user) {
      return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 });
    }

    // Get direct conversations
    const directConversations = await db
      .collection('chat_direct_messages')
      .find({
        participants: userId,
      })
      .sort({ lastMessageAt: -1 })
      .limit(50)
      .toArray();

    // Get community memberships
    const communityMemberships = await db
      .collection('chat_community_members')
      .find({ userId })
      .toArray();

    const communityIds = communityMemberships.map(m => m.communityId);

    // Get communities the user is a member of
    const communities = await db
      .collection('chat_communities')
      .find({ _id: { $in: communityIds } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      ok: true,
      conversations: directConversations.map(conv => ({
        id: String(conv._id),
        participants: conv.participants.map(p => String(p)),
        lastMessage: conv.lastMessage,
        lastMessageAt: conv.lastMessageAt,
        lastMessageBy: String(conv.lastMessageBy),
      })),
      communities: communities.map(c => ({
        id: String(c._id),
        name: c.name,
        type: c.type, // 'public', 'invite-only', or 'main'
        lastMessage: c.lastMessage,
        lastMessageAt: c.lastMessageAt,
        unreadCount: c.unreadCount || 0,
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : 'Unable to load chats' },
      { status: 500 }
    );
  }
}
