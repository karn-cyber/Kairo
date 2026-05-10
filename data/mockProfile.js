export const mockProfile = {
  id: 'user_123',
  handle: 'kairolife',
  displayName: 'Kairo Life',
  avatarUrl: 'https://via.placeholder.com/150/F2EDE3/C85A1A?text=K',
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
    { id: 'h1', title: 'Spiti', coverUrl: 'https://via.placeholder.com/56/F2EDE3/C85A1A?text=Spiti', items: [] },
    { id: 'h2', title: 'Coorg', coverUrl: 'https://via.placeholder.com/56/F2EDE3/C85A1A?text=Coorg', items: [] },
    { id: 'h3', title: 'Hampi', coverUrl: 'https://via.placeholder.com/56/F2EDE3/C85A1A?text=Hampi', items: [] },
    { id: 'h4', title: 'Gear', coverUrl: 'https://via.placeholder.com/56/F2EDE3/C85A1A?text=Gear', items: [] },
    { id: 'h5', title: 'Tips', coverUrl: 'https://via.placeholder.com/56/F2EDE3/C85A1A?text=Tips', items: [] },
  ],
  creatorStats: {
    tripsPublished: 38,
    avgRating: 4.8,
    totalBookings: 2100,
    earned: '₹2.4L',
  },
  trips: [
    {
      id: 'trip_1',
      title: 'Kedarkantha Winter Trek',
      price: '₹8,500',
      location: 'Uttarakhand',
      days: 6,
      rating: 4.9,
      reviews: 127,
      nodes: [
        { type: 'activity', label: 'Trek' },
        { type: 'food', label: 'Juda ki Chai' },
        { type: 'stay', label: 'Base camp stay' },
      ],
    },
    {
      id: 'trip_2',
      title: 'Coorg in Monsoon',
      price: '₹7,200',
      location: 'Karnataka',
      days: 3,
      rating: 4.8,
      reviews: 92,
      nodes: [
        { type: 'activity', label: 'Coffee estate' },
        { type: 'stay', label: 'Coffee stay' },
      ],
    },
    {
      id: 'trip_3',
      title: 'Spiti Valley Expedition',
      price: '₹24,900',
      location: 'Himachal Pradesh',
      days: 6,
      rating: 4.9,
      reviews: 145,
      nodes: [
        { type: 'activity', label: 'Road trip' },
        { type: 'food', label: 'Local meals' },
        { type: 'stay', label: 'Homestay' },
      ],
    },
  ],
};

export const mockOwnProfile = {
  ...mockProfile,
};
