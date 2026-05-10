export const mockProfile = {
  id: 'user_123',
  handle: 'kairolife',
  displayName: 'Kairo Life',
  avatarUrl: 'https://via.placeholder.com/150?text=Kairo',
  bio: 'Travel is not a hobby. It\'s a way of thinking.\nReal trips. Real people. Real India. 🏔\nFounded @kairo',
  links: [
    { id: 'link_1', label: 'Our website', url: 'https://kairo.in' },
    { id: 'link_2', label: 'Book a trip', url: 'https://kairo.in/trips' },
  ],
  isVerified: true,
  profileType: 'creator', // 'user' | 'creator' | 'agency'
  isFollowing: false,
  stats: {
    posts: 248,
    followers: 14200,
    following: 312,
  },
  highlights: [
    { id: 'h1', title: 'Spiti', coverUrl: 'https://via.placeholder.com/56?text=Spiti', items: [] },
    { id: 'h2', title: 'Coorg', coverUrl: 'https://via.placeholder.com/56?text=Coorg', items: [] },
    { id: 'h3', title: 'Hampi', coverUrl: 'https://via.placeholder.com/56?text=Hampi', items: [] },
    { id: 'h4', title: 'Gear', coverUrl: 'https://via.placeholder.com/56?text=Gear', items: [] },
    { id: 'h5', title: 'Tips', coverUrl: 'https://via.placeholder.com/56?text=Tips', items: [] },
  ],
  creatorStats: {
    tripsPublished: 38,
    avgRating: 4.8,
    totalBookings: 2100,
    earned: '₹2.4L',
  },
};

export const mockOwnProfile = {
  id: 'user_me',
  handle: 'yourhandle',
  displayName: 'Your Name',
  avatarUrl: 'https://via.placeholder.com/150?text=You',
  bio: 'Exploring the world one trip at a time 🌍',
  links: [
    { id: 'link_1', label: 'My blog', url: 'https://example.com' },
  ],
  isVerified: false,
  profileType: 'user',
  isFollowing: false,
  stats: {
    posts: 42,
    followers: 892,
    following: 156,
  },
  highlights: [],
};
