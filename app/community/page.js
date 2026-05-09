import FeedPage from '@/frontend/community/FeedPage';

export const metadata = {
  title: 'Community | Kairo',
  description: 'Join the Kairo community to share travel plans and find companions.',
};

export default function Community({ searchParams }) {
  const initialChannel = searchParams?.channel || '';
  return <FeedPage initialChannel={initialChannel} />;
}
