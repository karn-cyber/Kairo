import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

const CHANNEL_SEED = [
  {
    slug: 'himalayan-first-timers',
    name: 'Himalayan First Timers',
    description: 'Beginner-friendly questions, gear lists, and starter routes.',
  },
  {
    slug: 'weekend-treks',
    name: 'Weekend Treks',
    description: '2-day and 3-day getaways from major Indian cities.',
  },
  {
    slug: 'budget-backpackers',
    name: 'Budget Backpackers',
    description: 'Plan low-cost itineraries and split costs smartly.',
  },
  {
    slug: 'solo-women-travel',
    name: 'Solo Women Travel',
    description: 'Safety-first planning, trusted leads, and verified groups.',
  },
];

const POST_SEED = [
  {
    channelSlug: 'himalayan-first-timers',
    title: 'Best month for Kedarkantha for first-time trekkers?',
    body: 'I can travel between Nov-Jan. Looking for snow + manageable weather. Any suggestions?',
    imageDataUrl: '/travelPhotos/381e714ee60f8c08d1a5b41d3a0b776f.jpg',
  },
  {
    channelSlug: 'weekend-treks',
    title: 'Coorg weekend route from Bengaluru',
    body: 'Sharing a 2N/3D route with stay options and local cafe recommendations.',
    imageDataUrl: '/travelPhotos/45e246b6c2b74ed1c2f0e77b4fb52e06.jpg',
  },
  {
    channelSlug: 'budget-backpackers',
    title: 'Spiti under ₹18k - realistic breakdown',
    body: 'Bus, stay, food, permits and emergency buffer. Posting a full line-item estimate.',
    imageDataUrl: '/travelPhotos/15db363c3fb05bd75d7a3da746271a4e.jpg',
  },
  {
    channelSlug: 'feed',
    title: 'Are down jackets absolutely necessary for October treks?',
    body: 'I am doing a trek in mid-October and trying to pack light. Can I manage with layering fleeces and a windbreaker, or is a proper down jacket non-negotiable? Would love to hear your experiences.',
    imageDataUrl: null,
  },
  {
    channelSlug: 'solo-women-travel',
    title: 'Any verified homestays in Dharamkot?',
    body: 'Looking for safe, reliable homestays in Dharamkot for a 2-week workation. Good Wi-Fi and a supportive host are my main priorities. Please share contacts if you have any.',
    imageDataUrl: null,
  },
];

export function slugify(input) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function ensureIndexes(db) {
  await Promise.all([
    db.collection('community_channels').createIndex({ slug: 1 }, { unique: true }),
    db.collection('community_channels').createIndex({ name: 1 }),
    db.collection('community_posts').createIndex({ createdAt: -1 }),
    db.collection('community_posts').createIndex({ channelSlug: 1, createdAt: -1 }),
    db.collection('community_channel_follows').createIndex({ channelSlug: 1, userId: 1 }, { unique: true }),
  ]);
}

export async function ensureCommunitySeed() {
  const db = await getDb();
  await ensureIndexes(db);

  const channelCount = await db.collection('community_channels').countDocuments();
  if (channelCount === 0) {
    const now = new Date();
    await db.collection('community_channels').insertMany(
      CHANNEL_SEED.map((channel) => ({
        ...channel,
        followersCount: Math.floor(Math.random() * 500) + 200,
        creatorId: null,
        creatorName: 'Kairo Team',
        createdAt: now,
        updatedAt: now,
      }))
    );
  }

  const postCount = await db.collection('community_posts').countDocuments();
  if (postCount === 0) {
    const now = new Date();
    await db.collection('community_posts').insertMany(
      POST_SEED.map((post, index) => ({
        ...post,
        authorId: null,
        authorName: 'Kairo Community',
        authorRole: 'traveller',
        upvotes: 25 + index * 17,
        commentsCount: 3 + index,
        createdAt: new Date(now.getTime() - index * 1000 * 60 * 60),
      }))
    );
  }
}

export async function listChannels({ query = '', userId = null } = {}) {
  const db = await getDb();
  const filters = {};

  if (query) {
    filters.$or = [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { slug: { $regex: query, $options: 'i' } },
    ];
  }

  const channels = await db
    .collection('community_channels')
    .find(filters)
    .sort({ followersCount: -1, createdAt: -1 })
    .limit(50)
    .toArray();

  let followedMap = new Map();

  if (userId && ObjectId.isValid(userId)) {
    const follows = await db
      .collection('community_channel_follows')
      .find({ userId: new ObjectId(userId) })
      .toArray();

    followedMap = new Map(follows.map((follow) => [follow.channelSlug, true]));
  }

  return channels.map((channel) => ({
    id: String(channel._id),
    slug: channel.slug,
    name: channel.name,
    description: channel.description,
    followersCount: channel.followersCount || 0,
    creatorName: channel.creatorName || 'Community',
    createdAt: channel.createdAt,
    isFollowing: followedMap.get(channel.slug) || false,
  }));
}

export async function createChannel({ name, description, user }) {
  const db = await getDb();
  const cleanName = String(name || '').trim();
  const cleanDescription = String(description || '').trim();

  if (!cleanName) {
    throw new Error('Channel name is required.');
  }

  let slugBase = slugify(cleanName);
  if (!slugBase) {
    slugBase = `channel-${Date.now()}`;
  }

  let slug = slugBase;
  let suffix = 1;

  while (await db.collection('community_channels').findOne({ slug })) {
    suffix += 1;
    slug = `${slugBase}-${suffix}`;
  }

  const now = new Date();

  const insertResult = await db.collection('community_channels').insertOne({
    slug,
    name: cleanName,
    description: cleanDescription || 'New community thread.',
    followersCount: 1,
    creatorId: new ObjectId(user.id),
    creatorName: user.fullName,
    createdAt: now,
    updatedAt: now,
  });

  await db.collection('community_channel_follows').updateOne(
    {
      channelSlug: slug,
      userId: new ObjectId(user.id),
    },
    {
      $setOnInsert: {
        channelSlug: slug,
        userId: new ObjectId(user.id),
        createdAt: now,
      },
    },
    { upsert: true }
  );

  return {
    id: String(insertResult.insertedId),
    slug,
    name: cleanName,
    description: cleanDescription || 'New community thread.',
    followersCount: 1,
    creatorName: user.fullName,
    isFollowing: true,
  };
}

export async function toggleFollowChannel({ slug, userId }) {
  const db = await getDb();
  const channel = await db.collection('community_channels').findOne({ slug });

  if (!channel) {
    throw new Error('Channel not found.');
  }

  const userObjectId = new ObjectId(userId);
  const existing = await db.collection('community_channel_follows').findOne({
    channelSlug: slug,
    userId: userObjectId,
  });

  let isFollowing = false;

  if (existing) {
    await db.collection('community_channel_follows').deleteOne({ _id: existing._id });
    await db.collection('community_channels').updateOne({ slug }, { $inc: { followersCount: -1 } });
    isFollowing = false;
  } else {
    await db.collection('community_channel_follows').insertOne({
      channelSlug: slug,
      userId: userObjectId,
      createdAt: new Date(),
    });
    await db.collection('community_channels').updateOne({ slug }, { $inc: { followersCount: 1 } });
    isFollowing = true;
  }

  const refreshed = await db.collection('community_channels').findOne({ slug });

  return {
    slug,
    isFollowing,
    followersCount: Math.max(0, refreshed?.followersCount || 0),
  };
}

function sanitizeImageData(imageDataUrl) {
  if (!imageDataUrl) {
    return null;
  }

  const value = String(imageDataUrl);

  if (value.startsWith('/travelPhotos/')) {
    return value;
  }

  if (!value.startsWith('data:image/')) {
    throw new Error('Only image uploads are supported.');
  }

  if (value.length > 1_800_000) {
    throw new Error('Image is too large. Please keep it under ~1.3 MB.');
  }

  return value;
}

export async function createPost({ user, channelSlug, title, body, imageDataUrl, attachedPackage }) {
  const db = await getDb();
  const cleanTitle = String(title || '').trim();
  const cleanBody = String(body || '').trim();

  let finalPackage = null;
  if (attachedPackage) {
    if (user.role !== 'agency') {
      throw new Error('Only agencies can attach packages to posts.');
    }
    finalPackage = {
      title: String(attachedPackage.title || '').trim(),
      price: String(attachedPackage.price || '').trim(),
      days: String(attachedPackage.days || '').trim(),
      location: String(attachedPackage.location || '').trim(),
    };
    if (!finalPackage.title || !finalPackage.price) {
      throw new Error('Package title and price are required.');
    }
  }

  if (!channelSlug) {
    channelSlug = 'feed';
  }

  if (!cleanTitle) {
    throw new Error('Post title is required.');
  }

  if (!cleanBody) {
    throw new Error('Post body is required.');
  }

  let channel = null;
  if (channelSlug !== 'feed') {
    channel = await db.collection('community_channels').findOne({ slug: channelSlug });
    if (!channel) {
      throw new Error('Selected channel does not exist.');
    }
  }

  const post = {
    channelSlug,
    title: cleanTitle,
    body: cleanBody,
    imageDataUrl: sanitizeImageData(imageDataUrl),
    authorId: new ObjectId(user.id),
    authorName: user.fullName,
    authorRole: user.role,
    upvotes: 0,
    commentsCount: 0,
    createdAt: new Date(),
    attachedPackage: finalPackage,
  };

  const insertResult = await db.collection('community_posts').insertOne(post);

  return {
    id: String(insertResult.insertedId),
    ...post,
  };
}

export async function listPosts({ channel = '', query = '' } = {}) {
  const db = await getDb();

  const filters = {};
  if (channel) {
    filters.channelSlug = channel;
  }

  if (query) {
    filters.$or = [
      { title: { $regex: query, $options: 'i' } },
      { body: { $regex: query, $options: 'i' } },
      { channelSlug: { $regex: query, $options: 'i' } },
    ];
  }

  const posts = await db.collection('community_posts').find(filters).sort({ createdAt: -1 }).limit(80).toArray();

  return posts.map((post) => ({
    id: String(post._id),
    channelSlug: post.channelSlug,
    title: post.title,
    body: post.body,
    imageDataUrl: post.imageDataUrl || null,
    attachedPackage: post.attachedPackage || null,
    authorName: post.authorName,
    authorRole: post.authorRole || 'traveller',
    upvotes: post.upvotes || 0,
    commentsCount: post.commentsCount || 0,
    createdAt: post.createdAt,
  }));
}

export async function getSidebarData({ userId = null } = {}) {
  const db = await getDb();

  const [trendingChannels, recentPosts, people] = await Promise.all([
    db.collection('community_channels').find({}).sort({ followersCount: -1 }).limit(6).toArray(),
    db.collection('community_posts').find({}).sort({ createdAt: -1 }).limit(6).toArray(),
    db.collection('users').find({}).sort({ lastSeenAt: -1, createdAt: -1 }).limit(6).toArray(),
  ]);

  let followedSlugs = [];
  if (userId && ObjectId.isValid(userId)) {
    const follows = await db
      .collection('community_channel_follows')
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    followedSlugs = follows.map((item) => item.channelSlug);
  }

  return {
    trendingChannels: trendingChannels.map((channel) => ({
      slug: channel.slug,
      name: channel.name,
      followersCount: channel.followersCount || 0,
    })),
    trendingPosts: recentPosts.map((post) => ({
      id: String(post._id),
      title: post.title,
      channelSlug: post.channelSlug,
      upvotes: post.upvotes || 0,
      commentsCount: post.commentsCount || 0,
    })),
    people: people.map((person) => ({
      id: String(person._id),
      fullName: person.fullName,
      role: person.role,
      email: person.email,
    })),
    followedSlugs,
  };
}
