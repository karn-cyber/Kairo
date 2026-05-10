'use client';
import React, { useState, useEffect } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileHighlights from '@/components/profile/ProfileHighlights';
import ProfileTabBar from '@/components/profile/ProfileTabBar';
import ProfileGrid from '@/components/profile/ProfileGrid';
import ProfileTripList from '@/components/profile/ProfileTripList';
import CreatorBadgeStrip from '@/components/profile/CreatorBadgeStrip';
import EditProfileModal from '@/components/profile/EditProfileModal';
import PostModal from '@/components/profile/PostModal';
import FollowersModal from '@/components/profile/FollowersModal';
import { useProfile } from '@/hooks/useProfile';
import { useProfilePosts } from '@/hooks/useProfilePosts';
import { useFollowToggle } from '@/hooks/useFollowToggle';
import { mockOwnProfile } from '@/data/mockProfile';
import { mockPosts, mockSavedPosts } from '@/data/mockPosts';

export default function ProfilePage({ params }) {
  const handle = params.handle === 'me' ? mockOwnProfile.handle : params.handle;
  const isOwnProfile = params.handle === 'me' || handle === mockOwnProfile.handle;

  // State
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(0);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [followersModalTab, setFollowersModalTab] = useState('followers');

  // Hooks
  const { profile, loading, error } = useProfile(handle);
  const { posts, loading: postsLoading } = useProfilePosts(handle, activeTab);
  const { isFollowing, toggleFollow } = useFollowToggle(handle);

  const displayProfile = profile || (isOwnProfile ? mockOwnProfile : null);

  if (loading || !displayProfile) {
    return <div style={{ textAlign: 'center', padding: '40px 20px' }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '40px 20px', color: 'red' }}>Profile not found</div>;
  }

  const isCreator = displayProfile.profileType === 'creator' || displayProfile.profileType === 'agency';

  // Get tab content
  const getTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <ProfileGrid posts={posts} onPostClick={(idx) => { setSelectedPostIndex(idx); setIsPostModalOpen(true); }} />;
      case 'reels':
        return isCreator ? <ProfileGrid posts={posts} onPostClick={(idx) => { setSelectedPostIndex(idx); setIsPostModalOpen(true); }} /> : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>No reels yet</div>;
      case 'trips':
        return isCreator ? <ProfileTripList /> : <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)' }}>Not a creator</div>;
      case 'saved':
        return isOwnProfile ? <ProfileGrid posts={mockSavedPosts} onPostClick={(idx) => { setSelectedPostIndex(idx); setIsPostModalOpen(true); }} /> : null;
      case 'tagged':
        return <ProfileGrid posts={posts} onPostClick={(idx) => { setSelectedPostIndex(idx); setIsPostModalOpen(true); }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ background: 'var(--color-background-primary)', minHeight: '100vh' }}>
      {/* Main Container */}
      <div style={{ maxWidth: 935, margin: '0 auto', padding: '0 20px' }}>
        {/* Profile Header */}
        <div style={{ paddingTop: 40, paddingBottom: 40 }}>
          <ProfileHeader
            profile={displayProfile}
            isOwnProfile={isOwnProfile}
            isFollowing={isFollowing}
            onFollow={toggleFollow}
            onEdit={() => setIsEditModalOpen(true)}
            onFollowersClick={() => { setFollowersModalTab('followers'); setIsFollowersModalOpen(true); }}
            onFollowingClick={() => { setFollowersModalTab('following'); setIsFollowersModalOpen(true); }}
          />
        </div>

        {/* Highlights */}
        <div style={{ paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
          <ProfileHighlights isOwnProfile={isOwnProfile} highlights={displayProfile.highlights} />
        </div>

        {/* Creator Badge Strip */}
        {isCreator && <CreatorBadgeStrip stats={displayProfile.creatorStats} />}

        {/* Tab Bar */}
        <div style={{ paddingTop: 20, paddingBottom: 20 }}>
          <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} isCreator={isCreator} isOwnProfile={isOwnProfile} />
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '400px', paddingBottom: 40 }}>
          {getTabContent()}
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={displayProfile}
      />

      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        posts={posts}
        initialIndex={selectedPostIndex}
      />

      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        activeTab={followersModalTab}
        onTabChange={setFollowersModalTab}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}
