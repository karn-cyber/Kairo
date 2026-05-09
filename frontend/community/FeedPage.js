'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Nav from '@/components/Nav';
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
  const [postForm, setPostForm] = useState({ channelSlug: initialChannel || '', title: '', body: '', imageDataUrl: '' });

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

  useEffect(() => {
    if (!postForm.channelSlug && selectedChannel) {
      setPostForm((prev) => ({ ...prev, channelSlug: selectedChannel }));
    }
  }, [selectedChannel, postForm.channelSlug]);

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
      setPostForm((prev) => ({ ...prev, channelSlug: result.channel.slug }));
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
      const response = await fetch('/api/community/posts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.message || 'Unable to publish post.');
      }

      setPostForm((prev) => ({ ...prev, title: '', body: '', imageDataUrl: '' }));
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
      <Nav variant="light" />
      <AuthGate title="Community feed is members only" description="Sign in to create channels, post threads, and follow communities.">
        <section className="section warm" style={{ paddingTop: '34px' }}>
          <div className="container" style={{ maxWidth: '1320px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '260px minmax(0,1fr) 300px', gap: '18px', alignItems: 'start' }}>
              <Card style={{ position: 'sticky', top: '86px', padding: '16px' }}>
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
                    setPostForm((prev) => ({ ...prev, channelSlug: '' }));
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
                          setPostForm((prev) => ({ ...prev, channelSlug: channel.slug }));
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
                <Card style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '11px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>Feed</div>
                      <div style={{ fontFamily: 'var(--PD)', fontSize: '24px', fontWeight: 800, color: 'var(--ink)' }}>
                        Reddit-style community
                      </div>
                    </div>
                    <Badge type="orange">{user?.fullName || 'Member'}</Badge>
                  </div>
                  <input
                    value={globalSearch}
                    onChange={(event) => setGlobalSearch(event.target.value)}
                    placeholder="Search posts, channels, topics"
                    style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--line)', padding: '12px 14px', fontFamily: 'var(--DS)', fontSize: '14px' }}
                  />
                </Card>

                <Card style={{ marginBottom: '14px' }}>
                  <form onSubmit={submitPost} style={{ display: 'grid', gap: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>Create post</div>
                    <select
                      value={postForm.channelSlug}
                      onChange={(event) => setPostForm((prev) => ({ ...prev, channelSlug: event.target.value }))}
                      required
                      style={{ borderRadius: '10px', border: '1px solid var(--line)', padding: '10px 12px', fontFamily: 'var(--DS)', fontSize: '13px' }}
                    >
                      <option value="">Select a channel</option>
                      {channels.map((channel) => (
                        <option key={channel.slug} value={channel.slug}>
                          /c/{channel.slug}
                        </option>
                      ))}
                    </select>
                    <input
                      value={postForm.title}
                      onChange={(event) => setPostForm((prev) => ({ ...prev, title: event.target.value }))}
                      placeholder="Post title"
                      required
                      style={{ borderRadius: '10px', border: '1px solid var(--line)', padding: '10px 12px', fontFamily: 'var(--DS)', fontSize: '13px' }}
                    />
                    <textarea
                      value={postForm.body}
                      onChange={(event) => setPostForm((prev) => ({ ...prev, body: event.target.value }))}
                      placeholder="Write your thread..."
                      rows={4}
                      required
                      style={{ borderRadius: '10px', border: '1px solid var(--line)', padding: '10px 12px', fontFamily: 'var(--DS)', fontSize: '13px', resize: 'vertical' }}
                    />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <label style={{ border: '1px dashed var(--line)', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '12px', color: 'var(--ink3)', background: '#fff' }}>
                        Add image
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePostImage} />
                      </label>
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

                    {postForm.imageDataUrl && (
                      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line2)' }}>
                        <img src={postForm.imageDataUrl} alt="Post preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', display: 'block' }} />
                      </div>
                    )}

                    <Button type="submit" variant="primary" disabled={posting}>
                      {posting ? 'Publishing...' : 'Publish post'}
                    </Button>
                  </form>
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

              <div style={{ position: 'sticky', top: '86px', display: 'grid', gap: '12px' }}>
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
                          setPostForm((prev) => ({ ...prev, channelSlug: channel.slug }));
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
        </section>
      </AuthGate>
      <Footer />
    </>
  );
}
