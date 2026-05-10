const mockPostSeed = [
  { title: 'Kedarkantha Winter Trek', location: 'Uttarakhand', type: 'reel', likes: 4200, comments: 312 },
  { title: 'Coorg in Monsoon', location: 'Karnataka', type: 'video', likes: 1890, comments: 107 },
  { title: 'Spiti Valley Expedition', location: 'Himachal Pradesh', type: 'carousel', likes: 3120, comments: 201 },
  { title: 'Hampi Heritage Walk', location: 'Karnataka', type: 'image', likes: 2560, comments: 168 },
  { title: 'Manali to Leh Highway', location: 'Ladakh', type: 'reel', likes: 5100, comments: 421 },
  { title: 'Valley of Flowers', location: 'Uttarakhand', type: 'video', likes: 2270, comments: 143 },
  { title: 'Munnar Tea Trails', location: 'Kerala', type: 'image', likes: 1740, comments: 88 },
  { title: 'Meghalaya Caves & Falls', location: 'Meghalaya', type: 'carousel', likes: 1988, comments: 124 },
  { title: 'Tirthan Valley Camp', location: 'Himachal Pradesh', type: 'reel', likes: 2875, comments: 190 },
  { title: 'Coastal Karnataka Ride', location: 'Karnataka', type: 'video', likes: 1650, comments: 77 },
  { title: 'Rann of Kutch Sunrise', location: 'Gujarat', type: 'image', likes: 1490, comments: 66 },
  { title: 'Gokarna Beach Circuit', location: 'Karnataka', type: 'carousel', likes: 2630, comments: 158 },
  { title: 'Kashmir Alpine Lakes', location: 'Jammu & Kashmir', type: 'reel', likes: 4780, comments: 356 },
  { title: 'Munsiyari Views', location: 'Uttarakhand', type: 'video', likes: 2110, comments: 114 },
  { title: 'Arunachal Road Diary', location: 'Arunachal Pradesh', type: 'image', likes: 1320, comments: 59 },
];

export const mockPosts = mockPostSeed.map((post, index) => ({
  id: `post_${index + 1}`,
  title: post.title,
  creatorHandle: 'kairolife',
  creatorName: 'Kairo Life',
  imageUrl: `https://via.placeholder.com/500?text=${encodeURIComponent(post.title)}`,
  caption: `${post.title} — real trip story from Kairo Life #travel #india #adventure`,
  likes: post.likes,
  comments: post.comments,
  postType: post.type,
  location: post.location,
  postedAt: new Date(Date.now() - (index + 1) * 2 * 24 * 60 * 60 * 1000).toISOString(),
  commentsData: [
    {
      id: `c1_${index + 1}`,
      author: 'rohankapoor',
      avatarUrl: 'https://via.placeholder.com/36?text=RK',
      text: 'Absolutely stunning! 🔥',
      likes: 124,
      timestamp: '2h',
    },
    {
      id: `c2_${index + 1}`,
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
