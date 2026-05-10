import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request, { params }) {
  try {
    const { handle } = params;
    const db = await getDb();

    // Find user by handle
    const user = await db.collection('users').findOne({ handle });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user's posts (if any)
    const posts = await db
      .collection('posts')
      .find({ creatorId: user._id.toString() })
      .sort({ createdAt: -1 })
      .toArray();

    // Get user's reels
    const reels = await db
      .collection('reels')
      .find({ creatorId: user._id.toString() })
      .sort({ createdAt: -1 })
      .toArray();

    // Get user's trips (if agency/creator)
    const trips = await db
      .collection('trips')
      .find({ creatorId: user._id.toString() })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: {
        profile: {
          _id: user._id.toString(),
          email: user.email,
          handle: user.handle,
          displayName: user.displayName,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          isAdmin: user.isAdmin || false,
          isVerified: user.isVerified || false,
          profileType: user.profileType || 'user',
          links: user.links || [],
          stats: user.stats || { posts: 0, followers: 0, following: 0 },
          highlights: user.highlights || [],
          creatorStats: user.creatorStats || {},
        },
        posts: posts.map(p => ({
          ...p,
          _id: p._id.toString(),
          creatorId: p.creatorId,
        })),
        reels: reels.map(r => ({
          ...r,
          _id: r._id.toString(),
          creatorId: r.creatorId,
        })),
        trips: trips.map(t => ({
          ...t,
          _id: t._id.toString(),
          creatorId: t.creatorId,
        })),
      },
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
