import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request) {
  try {
    const db = await getDb();
    
    // Create admin user
    const adminUser = {
      _id: new ObjectId(),
      email: 'findyourkairo@gmail.com',
      password: 'hashed_password_here', // In production, use proper hashing
      handle: 'kairolife',
      displayName: 'Kairo Life',
      bio: 'Travel is not a hobby. It\'s a way of thinking.\nReal trips. Real people. Real India. 🏔\nFounded @kairo',
      avatarUrl: 'https://via.placeholder.com/150?text=Kairo',
      isAdmin: true,
      isVerified: true,
      profileType: 'creator',
      links: [
        { label: 'Our website', url: 'https://kairo.in' },
        { label: 'Book a trip', url: 'https://kairo.in/trips' },
      ],
      stats: {
        posts: 248,
        followers: 14200,
        following: 312,
      },
      highlights: [
        { id: 'h1', title: 'Spiti', coverUrl: 'https://via.placeholder.com/56?text=Spiti' },
        { id: 'h2', title: 'Coorg', coverUrl: 'https://via.placeholder.com/56?text=Coorg' },
        { id: 'h3', title: 'Hampi', coverUrl: 'https://via.placeholder.com/56?text=Hampi' },
        { id: 'h4', title: 'Gear', coverUrl: 'https://via.placeholder.com/56?text=Gear' },
        { id: 'h5', title: 'Tips', coverUrl: 'https://via.placeholder.com/56?text=Tips' },
      ],
      creatorStats: {
        tripsPublished: 38,
        avgRating: 4.8,
        totalBookings: 2100,
        earned: '₹2.4L',
      },
      createdAt: new Date(),
    };

    // Check if admin user already exists
    const existingUser = await db.collection('users').findOne({ email: 'findyourkairo@gmail.com' });
    let userId;
    
    if (existingUser) {
      userId = existingUser._id;
      // Update with admin privileges and verified status
      await db.collection('users').updateOne(
        { _id: userId },
        { 
          $set: { 
            isAdmin: true, 
            isVerified: true,
            handle: 'kairolife',
            displayName: 'Kairo Life',
            bio: adminUser.bio,
            profileType: 'creator',
            creatorStats: adminUser.creatorStats,
          } 
        }
      );
    } else {
      const result = await db.collection('users').insertOne(adminUser);
      userId = result.insertedId;
    }

    // Create sample reels for this admin user
    const reels = [
      {
        _id: new ObjectId(),
        creatorId: userId.toString(),
        creatorHandle: 'kairolife',
        creatorName: 'Kairo Life',
        creatorAvatar: 'https://via.placeholder.com/150?text=Kairo',
        title: 'Kedarkantha Winter Trek',
        description: 'What no travel blog will tell you about Kedarkantha in winter',
        videoUrl: 'https://via.placeholder.com/500?text=Kedarkantha+Trek',
        thumbnailUrl: 'https://via.placeholder.com/500?text=Kedarkantha+Thumb',
        duration: 45,
        likes: 2340,
        comments: 142,
        shares: 89,
        views: 12450,
        location: 'Uttarakhand',
        tags: ['trek', 'winter', 'himalayas', 'adventure'],
        isVerified: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new ObjectId(),
        creatorId: userId.toString(),
        creatorHandle: 'kairolife',
        creatorName: 'Kairo Life',
        creatorAvatar: 'https://via.placeholder.com/150?text=Kairo',
        title: 'Coorg in Monsoon',
        description: 'Coorg in monsoon — what worked for our group',
        videoUrl: 'https://via.placeholder.com/500?text=Coorg+Monsoon',
        thumbnailUrl: 'https://via.placeholder.com/500?text=Coorg+Thumb',
        duration: 38,
        likes: 1890,
        comments: 107,
        shares: 62,
        views: 9230,
        location: 'Karnataka',
        tags: ['coorg', 'monsoon', 'coffee', 'nature'],
        isVerified: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new ObjectId(),
        creatorId: userId.toString(),
        creatorHandle: 'kairolife',
        creatorName: 'Kairo Life',
        creatorAvatar: 'https://via.placeholder.com/150?text=Kairo',
        title: 'Spiti Valley Expedition',
        description: '5 days in Spiti Valley - the coldest inhabited desert',
        videoUrl: 'https://via.placeholder.com/500?text=Spiti+Valley',
        thumbnailUrl: 'https://via.placeholder.com/500?text=Spiti+Thumb',
        duration: 52,
        likes: 3120,
        comments: 201,
        shares: 156,
        views: 18900,
        location: 'Himachal Pradesh',
        tags: ['spiti', 'desert', 'himalayas', 'adventure', 'road-trip'],
        isVerified: true,
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new ObjectId(),
        creatorId: userId.toString(),
        creatorHandle: 'kairolife',
        creatorName: 'Kairo Life',
        creatorAvatar: 'https://via.placeholder.com/150?text=Kairo',
        title: 'Hampi - Where History Lives',
        description: 'Exploring ancient ruins and vibrant markets in Hampi',
        videoUrl: 'https://via.placeholder.com/500?text=Hampi',
        thumbnailUrl: 'https://via.placeholder.com/500?text=Hampi+Thumb',
        duration: 41,
        likes: 2560,
        comments: 168,
        shares: 94,
        views: 14200,
        location: 'Karnataka',
        tags: ['hampi', 'history', 'temples', 'culture'],
        isVerified: true,
        createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      },
      {
        _id: new ObjectId(),
        creatorId: userId.toString(),
        creatorHandle: 'kairolife',
        creatorName: 'Kairo Life',
        creatorAvatar: 'https://via.placeholder.com/150?text=Kairo',
        title: 'Manali to Leh Highway',
        description: 'The highest motorable road in the world - epic journey',
        videoUrl: 'https://via.placeholder.com/500?text=Manali+Leh',
        thumbnailUrl: 'https://via.placeholder.com/500?text=Manali+Leh+Thumb',
        duration: 58,
        likes: 4200,
        comments: 312,
        shares: 201,
        views: 24100,
        location: 'Himachal Pradesh, Ladakh',
        tags: ['manali', 'leh', 'road-trip', 'adventure', 'mountains'],
        isVerified: true,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
      },
    ];

    // Insert reels
    await db.collection('reels').deleteMany({ creatorHandle: 'kairolife' });
    const reelsResult = await db.collection('reels').insertMany(reels);

    return NextResponse.json({
      success: true,
      message: 'Admin user and reels created successfully',
      data: {
        userId: userId.toString(),
        userEmail: 'findyourkairo@gmail.com',
        userHandle: 'kairolife',
        reelsCount: reelsResult.insertedIds.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
