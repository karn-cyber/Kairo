import { redirect } from 'next/navigation';

export default function ProfileMePage() {
  // Redirect to kairolife profile
  redirect('/profile/kairolife');
  return null;
}
