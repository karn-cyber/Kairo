export const mockPosts = Array.from({ length: 15 }, (_, i) => ({
  id: `post_${i + 1}`,
  imageUrl: `https://via.placeholder.com/500?text=Post+${i + 1}`,
  caption: `Beautiful travel moment from our latest expedition #travel #india #adventure`,
  likes: Math.floor(Math.random() * 5000) + 500,
  comments: Math.floor(Math.random() * 200) + 10,
  postType: i % 4 === 0 ? 'carousel' : i % 4 === 1 ? 'video' : i % 4 === 2 ? 'reel' : 'image',
  location: ['Spiti Valley', 'Coorg', 'Hampi', 'Goa', 'Kerala'][Math.floor(Math.random() * 5)],
  postedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  commentsData: [
    {
      id: 'c1',
      author: 'rohankapoor',
      avatarUrl: 'https://via.placeholder.com/36?text=RK',
      text: 'Absolutely stunning! 🔥',
      likes: 124,
      timestamp: '2h',
    },
    {
      id: 'c2',
      author: 'priyatravels',
      avatarUrl: 'https://via.placeholder.com/36?text=PT',
      text: 'This is on my bucket list!',
      likes: 89,
      timestamp: '1h',
    },
  ],
}));

export const mockSavedPosts = mockPosts.slice(0, 8).map((post, idx) => ({
  ...post,
  id: `saved_${idx}`,
}));

export const mockSavedCollections = [
  {
    id: 'col_1',
    title: 'Spiti Ideas',
    postCount: 24,
    previews: [
      'https://via.placeholder.com/250?text=Spiti+1',
      'https://via.placeholder.com/250?text=Spiti+2',
      'https://via.placeholder.com/250?text=Spiti+3',
      'https://via.placeholder.com/250?text=Spiti+4',
    ],
  },
  {
    id: 'col_2',
    title: 'Budget Trips',
    postCount: 18,
    previews: [
      'https://via.placeholder.com/250?text=Budget+1',
      'https://via.placeholder.com/250?text=Budget+2',
      'https://via.placeholder.com/250?text=Budget+3',
      'https://via.placeholder.com/250?text=Budget+4',
    ],
  },
  {
    id: 'col_3',
    title: 'Adventure',
    postCount: 31,
    previews: [
      'https://via.placeholder.com/250?text=Adv+1',
      'https://via.placeholder.com/250?text=Adv+2',
      'https://via.placeholder.com/250?text=Adv+3',
      'https://via.placeholder.com/250?text=Adv+4',
    ],
  },
];

export const mockFollowers = [
  { id: 'f1', handle: 'rohankapoor', displayName: 'Rohan Kapoor', avatarUrl: 'https://via.placeholder.com/36?text=RK' },
  { id: 'f2', handle: 'priyatravels', displayName: 'Priya Sharma', avatarUrl: 'https://via.placeholder.com/36?text=PS' },
  { id: 'f3', handle: 'trekwithaj', displayName: 'Arjun Verma', avatarUrl: 'https://via.placeholder.com/36?text=AV' },
  { id: 'f4', handle: 'mountaingoer', displayName: 'Sarah Chen', avatarUrl: 'https://via.placeholder.com/36?text=SC' },
  { id: 'f5', handle: 'wanderlust_soul', displayName: 'Maya Desai', avatarUrl: 'https://via.placeholder.com/36?text=MD' },
];
