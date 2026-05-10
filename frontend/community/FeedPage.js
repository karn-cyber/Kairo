'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import AuthGate from '@/components/AuthGate';
import { Badge, Button, Card } from '@/components/UI';

function toRelativeTime(value) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();

  if (Number.isNaN(diff)) {
    return 'just now';
  }

  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

async function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function FeedPage({ initialChannel = '' }) {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sidebar, setSidebar] = useState({ trendingChannels: [], trendingPosts: [], people: [], followedSlugs: [] });

  const [channelSearch, setChannelSearch] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(initialChannel || '');

  const [channelForm, setChannelForm] = useState({ name: '', description: '' });
  const [postForm, setPostForm] = useState({ title: '', body: '', imageDataUrl: '' });
  const [showPackageForm, setShowPackageForm] = useState(false);
  const [packageForm, setPackageForm] = useState({ title: '', price: '', days: '', location: '' });
  const [isPostExpanded, setIsPostExpanded] = useState(false);

  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [creatingChannel, setCreatingChannel] = useState(false);
  const [status, setStatus] = useState('');

  const loadAll = useCallback(async () => {
    setLoading(true);
    setStatus('');

    try {
      const channelQuery = channelSearch ? `?q=${encodeURIComponent(channelSearch)}` : '';

      const postsParams = new URLSearchParams();
      if (selectedChannel) postsParams.set('channel', selectedChannel);
      if (globalSearch) postsParams.set('q', globalSearch);

      const postsQuery = postsParams.toString() ? `?${postsParams.toString()}` : '';

      const [userRes, channelsRes, postsRes, sidebarRes] = await Promise.all([
        fetch('/api/me/'),
        fetch(`/api/community/channels/${channelQuery}`),
        fetch(`/api/community/posts/${postsQuery}`),
        fetch('/api/community/sidebar/'),
      ]);

      const [userData, channelsData, postsData, sidebarData] = await Promise.all([
        userRes.json(),
        channelsRes.json(),
        postsRes.json(),
        sidebarRes.json(),
      ]);

      if (userData.ok) {
        setUser(userData.user);
      }

      if (channelsData.ok) {
        setChannels(channelsData.channels || []);
      }

      if (postsData.ok) {
        setPosts(postsData.posts || []);
      }

      if (sidebarData.ok) {
        setSidebar({
          trendingChannels: sidebarData.trendingChannels || [],
          trendingPosts: sidebarData.trendingPosts || [],
          people: sidebarData.people || [],
          followedSlugs: sidebarData.followedSlugs || [],
        });
      }
    } catch {
      setStatus('Unable to load feed right now. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [channelSearch, globalSearch, selectedChannel]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // No longer syncing postForm.channelSlug since we use selectedChannel directly

  const followedSet = useMemo(() => {
    const combined = new Set(sidebar.followedSlugs || []);
    channels.forEach((channel) => {
      if (channel.isFollowing) {
        combined.add(channel.slug);
      }
    });
    return combined;
  }, [channels, sidebar.followedSlugs]);

  const handleFollowToggle = async (slug) => {
    setStatus('');
    try {
      const response = await fetch(`/api/community/channels/${slug}/follow/`, { method: 'POST' });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Could not update follow status.');
      }
      setChannels((prev) =>
        prev.map((channel) =>
          channel.slug === slug
            ? { ...channel, isFollowing: result.isFollowing, followersCount: result.followersCount }
            : channel
        )
      );
      setSidebar((prev) => {
        const nextFollows = new Set(prev.followedSlugs || []);
        if (result.isFollowing) {
          nextFollows.add(slug);
        } else {
          nextFollows.delete(slug);
        }
        return { ...prev, followedSlugs: Array.from(nextFollows) };
      });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Could not update follow status.');
    }
  };

  const handleCreateChannel = async (event) => {
    event.preventDefault();
    setStatus('');
    setCreatingChannel(true);

    try {
      const response = await fetch('/api/community/channels/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channelForm),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to create channel.');
      }

      setChannelForm({ name: '', description: '' });
      setSelectedChannel(result.channel.slug);
      await loadAll();
      setStatus(`Created /c/${result.channel.slug}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to create channel.');
    } finally {
      setCreatingChannel(false);
    }
  };

  const handlePostImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setStatus('Only image files are allowed.');
      return;
    }

    if (file.size > 1_300_000) {
      setStatus('Image too large. Please use an image under 1.3 MB.');
      return;
    }

    const dataUrl = await toDataUrl(file);
    setPostForm((prev) => ({ ...prev, imageDataUrl: dataUrl }));
    setStatus('Image attached.');
  };

  const submitPost = async (event) => {
    event.preventDefault();
    setPosting(true);
    setStatus('');

    try {
      const payload = { ...postForm, channelSlug: selectedChannel || '' };
      if (showPackageForm) {
        payload.attachedPackage = packageForm;
      }

      const response = await fetch('/api/community/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to publish post.');
      }

      setPostForm((prev) => ({ ...prev, title: '', body: '', imageDataUrl: '' }));
      setShowPackageForm(false);
      setPackageForm({ title: '', price: '', days: '', location: '' });
      await loadAll();
      setStatus('Posted successfully.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to publish post.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <>
        <AuthGate title="Community feed is members only" description="Sign in to create channels, post threads, and follow communities.">
          <div style={{ padding: '34px 0', flex: 1 }}>
            <div className="container" style={{ maxWidth: '1320px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr) 300px', gap: '18px', alignItems: 'start' }}>
                <Card style={{ position: 'sticky', top: '34px', padding: '16px' }}>
                <div style={{ fontFamily: 'var(--PD)', fontWeight: 800, fontSize: '20px', color: 'var(--ink)', marginBottom: '12px' }}>
                  Channels
                </div>
                <input
                  value={channelSearch}
                  onChange={(event) => setChannelSearch(event.target.value)}
                  placeholder="Search channels"
                  style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--line)', padding: '10px 12px', fontFamily: 'var(--DS)', marginBottom: '12px', fontSize: '13px' }}
                />
                <button
                  onClick={() => {
                    setSelectedChannel('');
                  }}
                  style={{ width: '100%', textAlign: 'left', border: 'none', background: selectedChannel ? '#fff' : 'var(--og)', padding: '10px 12px', borderRadius: '10px', color: 'var(--ink)', cursor: 'pointer', marginBottom: '6px' }}
                >
                  All channels
                </button>

                <div style={{ display: 'grid', gap: '6px', marginBottom: '14px', maxHeight: '360px', overflow: 'auto' }}>
                  {channels.map((channel) => (
                    <div key={channel.slug} style={{ border: '1px solid var(--line2)', borderRadius: '10px', padding: '9px 10px', background: selectedChannel === channel.slug ? 'rgba(200,90,26,0.09)' : '#fff' }}>
                      <button
                        onClick={() => {
                          setSelectedChannel(channel.slug);
                        }}
                        style={{ border: 'none', background: 'transparent', padding: 0, margin: 0, display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          /c/{channel.slug}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{channel.followersCount} followers</div>
                      </button>
                      <button
                        onClick={() => handleFollowToggle(channel.slug)}
                        style={{ marginTop: '8px', border: '1px solid var(--line)', borderRadius: '8px', background: followedSet.has(channel.slug) ? 'var(--ink)' : '#fff', color: followedSet.has(channel.slug) ? '#fff' : 'var(--ink)', fontSize: '11px', fontWeight: 600, padding: '6px 10px', cursor: 'pointer' }}
                      >
                        {followedSet.has(channel.slug) ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCreateChannel} style={{ borderTop: '1px solid var(--line2)', paddingTop: '12px', display: 'grid', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>Create channel</div>
                  <input
                    value={channelForm.name}
                    onChange={(event) => setChannelForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Channel name"
                    required
                    style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--line)', padding: '9px 10px', fontFamily: 'var(--DS)', fontSize: '12px' }}
                  />
                  <textarea
                    value={channelForm.description}
                    onChange={(event) => setChannelForm((prev) => ({ ...prev, description: event.target.value }))}
                    placeholder="What is this channel about?"
                    rows={3}
                    style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--line)', padding: '9px 10px', fontFamily: 'var(--DS)', fontSize: '12px', resize: 'vertical' }}
                  />
                  <Button type="submit" variant="primary" disabled={creatingChannel}>
                    {creatingChannel ? 'Creating...' : 'Create'}
                  </Button>
                </form>
              </Card>

              <div>
                {/* Search at the very top */}
                <input
                  value={globalSearch}
                  onChange={(event) => setGlobalSearch(event.target.value)}
                  placeholder="Search posts, channels, topics"
                  style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--line)', padding: '14px 18px', fontFamily: 'var(--DS)', fontSize: '15px', marginBottom: '14px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                />


                <Card style={{ marginBottom: '14px', padding: isPostExpanded ? '16px' : '12px 16px' }}>
                  {!isPostExpanded ? (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#8B5E3C,#C4864A)', flexShrink: 0 }} />
                      <input 
                        placeholder="Create Post" 
                        onFocus={() => setIsPostExpanded(true)}
                        style={{ flex: 1, background: '#f6f7f8', border: '1px solid var(--line)', borderRadius: '4px', padding: '10px 14px', fontSize: '14px', color: 'var(--ink)' }}
                      />
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsPostExpanded(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </button>
                      <button style={{ border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsPostExpanded(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { submitPost(e); setIsPostExpanded(false); }} style={{ display: 'grid', gap: '0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Create a post</div>
                        <button type="button" onClick={() => setIsPostExpanded(false)} style={{ border: 'none', background: 'transparent', fontSize: '12px', color: 'var(--muted)', cursor: 'pointer', padding: '4px' }}>Cancel</button>
                      </div>
                      
                      <input
                        value={postForm.title}
                        onChange={(event) => setPostForm((prev) => ({ ...prev, title: event.target.value }))}
                        placeholder="Title"
                        required
                        autoFocus
                        style={{ borderRadius: '4px', border: '1px solid var(--line)', borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 'none', padding: '12px 14px', fontFamily: 'var(--DS)', fontSize: '15px', fontWeight: 600 }}
                      />
                      
                      {/* Formatting toolbar */}
                      <div style={{ display: 'flex', gap: '12px', padding: '10px 14px', background: '#f9f9fa', borderLeft: '1px solid var(--line)', borderRight: '1px solid var(--line)' }}>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--ink3)', padding: '0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                        </button>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--ink3)', padding: '0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                        </button>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--ink3)', padding: '0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        </button>
                        <button type="button" style={{ border: 'none', background: 'transparent', color: 'var(--ink3)', padding: '0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        </button>
                      </div>

                      <textarea
                        value={postForm.body}
                        onChange={(event) => setPostForm((prev) => ({ ...prev, body: event.target.value }))}
                        placeholder="Text (optional)"
                        rows={5}
                        required
                        style={{ borderRadius: '4px', borderTopLeftRadius: 0, borderTopRightRadius: 0, border: '1px solid var(--line)', padding: '12px 14px', fontFamily: 'var(--DS)', fontSize: '14px', resize: 'vertical', marginBottom: '12px' }}
                      />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <label style={{ border: '1px solid var(--line)', borderRadius: '20px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--ink2)', background: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> Add image
                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePostImage} />
                          </label>
                          {user && user.role === 'agency' && (
                            <button
                              type="button"
                              onClick={() => setShowPackageForm((prev) => !prev)}
                              style={{ border: '1px solid var(--line)', borderRadius: '20px', padding: '6px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: showPackageForm ? '#fff' : 'var(--ink2)', background: showPackageForm ? 'var(--orange)' : '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6"></path><path d="M6 8v14h12V8"></path></svg> Add package
                            </button>
                          )}
                          {postForm.imageDataUrl && (
                            <button
                              type="button"
                              onClick={() => setPostForm((prev) => ({ ...prev, imageDataUrl: '' }))}
                              style={{ border: 'none', background: 'transparent', color: 'var(--orange)', fontWeight: 600, fontSize: '12px', cursor: 'pointer' }}
                            >
                              Remove image
                            </button>
                          )}
                        </div>

                        <Button type="submit" variant="primary" disabled={posting} style={{ borderRadius: '20px', padding: '8px 20px' }}>
                          {posting ? 'Posting...' : 'Post'}
                        </Button>
                      </div>

                      {showPackageForm && (
                        <div style={{ background: '#fafafa', border: '1px solid var(--line2)', borderRadius: '12px', padding: '16px', marginTop: '12px', display: 'grid', gap: '12px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>Attach a Package Deal</div>
                          <input
                            placeholder="Package Title (e.g. Kedarkantha Winter Trek)"
                            value={packageForm.title}
                            onChange={(e) => setPackageForm((prev) => ({ ...prev, title: e.target.value }))}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', fontFamily: 'var(--DS)' }}
                            required={showPackageForm}
                          />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <input
                              placeholder="Price (e.g. ₹8,500)"
                              value={packageForm.price}
                              onChange={(e) => setPackageForm((prev) => ({ ...prev, price: e.target.value }))}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', fontFamily: 'var(--DS)' }}
                              required={showPackageForm}
                            />
                            <input
                              placeholder="Duration (e.g. 5 Days)"
                              value={packageForm.days}
                              onChange={(e) => setPackageForm((prev) => ({ ...prev, days: e.target.value }))}
                              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', fontFamily: 'var(--DS)' }}
                            />
                          </div>
                          <input
                            placeholder="Location (e.g. Uttarakhand, India)"
                            value={packageForm.location}
                            onChange={(e) => setPackageForm((prev) => ({ ...prev, location: e.target.value }))}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '13px', fontFamily: 'var(--DS)' }}
                          />
                        </div>
                      )}

                      {postForm.imageDataUrl && (
                        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--line2)', marginTop: '12px' }}>
                          <img src={postForm.imageDataUrl} alt="Post preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', display: 'block', background: '#000' }} />
                        </div>
                      )}
                    </form>
                  )}
                </Card>

                {status && (
                  <Card style={{ marginBottom: '14px', border: '1px solid rgba(200,90,26,0.2)', background: '#FFF9F4' }}>
                    <div style={{ fontSize: '13px', color: 'var(--ink3)' }}>{status}</div>
                  </Card>
                )}

                {loading ? (
                  <Card>
                    <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Loading feed...</div>
                  </Card>
                ) : posts.length === 0 ? (
                  <Card>
                    <div style={{ fontFamily: 'var(--PD)', fontSize: '22px', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>
                      No posts found
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)' }}>Try a different search or create the first post in this channel.</div>
                  </Card>
                ) : (
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {posts.map((post) => (
                      <Card key={post.id} style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--line2)', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <Badge type="orange">/c/{post.channelSlug}</Badge>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.authorName} · {toRelativeTime(post.createdAt)}</span>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: 'auto' }}>{post.authorRole}</span>
                        </div>
                        <div style={{ padding: '14px 16px' }}>
                          <div style={{ fontFamily: 'var(--PD)', fontWeight: 800, fontSize: '23px', color: 'var(--ink)', lineHeight: 1.12, marginBottom: '10px' }}>
                            {post.title}
                          </div>
                          <div style={{ fontSize: '14px', color: 'var(--ink3)', lineHeight: 1.7, marginBottom: post.imageDataUrl ? '12px' : '6px' }}>
                            {post.body}
                          </div>
                          {post.imageDataUrl && (
                            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line2)' }}>
                              <img src={post.imageDataUrl} alt={post.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }} />
                            </div>
                          )}
                          {post.attachedPackage && (
                            <div style={{ background: '#FFF9F4', border: '1px solid rgba(200,90,26,0.3)', borderRadius: '12px', padding: '16px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                  <Badge type="orange" style={{ marginBottom: '8px', display: 'inline-block' }}>Official Package</Badge>
                                  <div style={{ fontFamily: 'var(--PD)', fontSize: '18px', fontWeight: 800, color: 'var(--ink)' }}>{post.attachedPackage.title}</div>
                                  <div style={{ fontSize: '12px', color: 'var(--ink3)', marginTop: '4px' }}>
                                    {post.attachedPackage.location} {post.attachedPackage.location && post.attachedPackage.days && '·'} {post.attachedPackage.days}
                                  </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontFamily: 'var(--DS)', fontSize: '20px', fontWeight: 700, color: 'var(--orange)' }}>{post.attachedPackage.price}</div>
                                  <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Per Person</div>
                                </div>
                              </div>
                              <Link href="/trip-hub" style={{ textDecoration: 'none', display: 'inline-block', alignSelf: 'flex-start', marginTop: '8px' }}>
                                <div style={{ background: 'var(--orange)', color: '#fff', fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  View Details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                              </Link>
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--line2)', padding: '12px 16px', fontSize: '12px', color: 'var(--muted)' }}>
                          <span>▲ {post.upvotes}</span>
                          <span>💬 {post.commentsCount}</span>
                          <Link href={`/community/?channel=${encodeURIComponent(post.channelSlug)}`} style={{ color: 'var(--orange)', fontWeight: 600 }}>
                            Open channel
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ position: 'sticky', top: '34px', display: 'grid', gap: '12px' }}>
                <Card>
                  <div style={{ fontFamily: 'var(--PD)', fontWeight: 800, fontSize: '20px', color: 'var(--ink)', marginBottom: '10px' }}>
                    Trending
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {sidebar.trendingChannels.map((channel) => (
                      <button
                        key={channel.slug}
                        onClick={() => {
                          setSelectedChannel(channel.slug);
                        }}
                        style={{ border: '1px solid var(--line2)', background: '#fff', borderRadius: '10px', padding: '10px', textAlign: 'left', cursor: 'pointer' }}
                      >
                        <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--ink)' }}>/c/{channel.slug}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{channel.followersCount} followers</div>
                      </button>
                    ))}
                  </div>
                </Card>

                <Card>
                  <div style={{ fontFamily: 'var(--PD)', fontWeight: 800, fontSize: '20px', color: 'var(--ink)', marginBottom: '10px' }}>
                    Rising posts
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {sidebar.trendingPosts.map((post) => (
                      <div key={post.id} style={{ border: '1px solid var(--line2)', borderRadius: '10px', padding: '10px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>/c/{post.channelSlug}</div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.45 }}>{post.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
                          ▲ {post.upvotes} · 💬 {post.commentsCount}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <div style={{ fontFamily: 'var(--PD)', fontWeight: 800, fontSize: '20px', color: 'var(--ink)', marginBottom: '10px' }}>
                    People to follow
                  </div>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {sidebar.people.map((person) => (
                      <div key={person.id} style={{ border: '1px solid var(--line2)', borderRadius: '10px', padding: '10px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>{person.fullName}</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)' }}>{person.role} · {person.email}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </AuthGate>
        <Footer />
    </>
  );
}
