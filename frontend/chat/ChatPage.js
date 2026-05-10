'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import AuthGate from '@/components/AuthGate';
import { Badge, Button, Card } from '@/components/UI';
import ConversationList from './ConversationList';
import ChatScreen from './ChatScreen';
import CommunityList from './CommunityList';

function toRelativeTime(value) {
  const date = new Date(value);
  const diff = Date.now() - date.getTime();
  if (Number.isNaN(diff)) return 'just now';
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ChatPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('direct'); // 'direct', 'communities'
  const [activeChat, setActiveChat] = useState(null); // { type: 'direct' | 'community', id, name }
  
  const [conversations, setConversations] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [publicCommunities, setPublicCommunities] = useState([]);
  const [mainCommunityId, setMainCommunityId] = useState(null);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [createCommunityName, setCreateCommunityName] = useState('');
  const [createCommunityType, setCreateCommunityType] = useState('public');

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // Get current user
        const userRes = await fetch('/api/me/');
        const userData = await userRes.json();
        if (userData.ok) {
          setUser(userData.user);
        }

        // Initialize chat (create main community, add user)
        const initRes = await fetch('/api/chat/init/', { method: 'POST' });
        const initData = await initRes.json();
        if (initData.ok) {
          setMainCommunityId(initData.mainCommunityId);
        }

        // Load conversations and communities
        const chatRes = await fetch('/api/chat/conversations/');
        const chatData = await chatRes.json();
        if (chatData.ok) {
          setConversations(chatData.conversations || []);
          setCommunities(chatData.communities || []);
        }

        // Load public communities
        const pubRes = await fetch('/api/chat/communities/?type=public');
        const pubData = await pubRes.json();
        if (pubData.ok) {
          setPublicCommunities(pubData.communities || []);
        }
      } catch (error) {
        console.error('Failed to load chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleSelectConversation = (conversation) => {
    setActiveChat({ type: 'direct', id: conversation.id, name: 'Direct Message' });
  };

  const handleSelectCommunity = (community) => {
    setActiveChat({ type: 'community', id: community.id, name: community.name });
  };

  const handleJoinCommunity = async (communityId) => {
    try {
      setJoinError('');
      const res = await fetch('/api/chat/communities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          communityId,
          joinCode,
        }),
      });
      const data = await res.json();
      
      if (!data.ok) {
        setJoinError(data.message || 'Failed to join');
        return;
      }

      // Reload communities
      const chatRes = await fetch('/api/chat/conversations/');
      const chatData = await chatRes.json();
      if (chatData.ok) {
        setCommunities(chatData.communities || []);
      }

      setShowJoinModal(false);
      setJoinCode('');
      setActiveChat({ type: 'community', id: communityId, name: 'Community' });
    } catch (error) {
      setJoinError('Failed to join community');
    }
  };

  return (
    <>
      <AuthGate title="Messages are members only" description="Sign in to chat with communities and other users.">
        <div style={{ padding: '0', flex: 1, display: 'flex', height: '100vh', background: '#fff' }}>
          {/* Left Sidebar */}
          <div style={{
            width: '320px',
            borderRight: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'var(--PD)', color: 'var(--ink)' }}>
                Messages
              </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0',
              padding: '12px',
              borderBottom: '1px solid var(--line)',
            }}>
              <button
                onClick={() => setActiveTab('direct')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid transparent',
                  background: '#fff',
                  color: 'var(--ink)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'direct' ? 700 : 600,
                  fontSize: '13px',
                  borderColor: activeTab === 'direct' ? 'var(--line)' : 'transparent',
                }}
              >
                Chats
              </button>
              <button
                onClick={() => setActiveTab('communities')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid transparent',
                  background: '#fff',
                  color: 'var(--ink)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: activeTab === 'communities' ? 700 : 600,
                  fontSize: '13px',
                  borderColor: activeTab === 'communities' ? 'var(--line)' : 'transparent',
                }}
              >
                Communities
              </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, overflow: 'auto' }}>
              {loading ? (
                <div style={{ padding: '16px', fontSize: '13px', color: 'var(--muted)' }}>Loading...</div>
              ) : activeTab === 'direct' ? (
                <ConversationList
                  conversations={conversations}
                  activeChat={activeChat}
                  onSelect={handleSelectConversation}
                />
              ) : (
                <CommunityList
                  communities={communities}
                  publicCommunities={publicCommunities}
                  activeChat={activeChat}
                  onSelectCommunity={handleSelectCommunity}
                  onJoinClick={() => setShowJoinModal(true)}
                  onCreateClick={() => setShowCreateModal(true)}
                />
              )}
            </div>
          </div>

          {/* Right Chat Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#fff',
          }}>
            {activeChat ? (
              <ChatScreen
                chat={activeChat}
                user={user}
                onBack={() => setActiveChat(null)}
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--muted)',
                textAlign: 'center',
                padding: '40px',
              }}>
                <div>
                  <div style={{ fontSize: '56px', marginBottom: '16px' }}>✉️</div>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                    Get started
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', maxWidth: '300px' }}>
                    {activeTab === 'direct' 
                      ? 'Select a conversation or start a new direct message' 
                      : 'Select a community to chat with members'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Join Community Modal */}
          {showJoinModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <Card style={{ maxWidth: '400px', padding: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'var(--ink)' }}>
                  Join a Community
                </div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
                  {publicCommunities.length > 0 ? (
                    <div>
                      {publicCommunities.map(com => (
                        <div
                          key={com.id}
                          style={{
                            padding: '10px',
                            margin: '6px 0',
                            border: '1px solid var(--line)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: '#f9f9fa',
                          }}
                          onClick={() => handleJoinCommunity(com.id)}
                        >
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{com.name}</div>
                          <div style={{ fontSize: '12px', marginTop: '4px' }}>{com.description}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>No public communities available.</div>
                  )}
                </div>

                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: 'var(--ink)' }}>
                    Join with Code
                  </div>
                  <input
                    type="text"
                    placeholder="Enter join code"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--line)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      marginBottom: '8px',
                      boxSizing: 'border-box',
                    }}
                  />
                  {joinError && (
                    <div style={{ fontSize: '12px', color: 'var(--red)', marginBottom: '8px' }}>
                      {joinError}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      onClick={() => setShowJoinModal(false)}
                      variant="ghost"
                      style={{ flex: 1 }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Create Community Modal */}
          {showCreateModal && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <Card style={{ maxWidth: '400px', padding: '24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--ink)' }}>
                  Create Community
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px', display: 'block' }}>
                    Community Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter community name"
                    value={createCommunityName}
                    onChange={(e) => setCreateCommunityName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--line)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)', marginBottom: '6px', display: 'block' }}>
                    Community Type
                  </label>
                  <select
                    value={createCommunityType}
                    onChange={(e) => setCreateCommunityType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid var(--line)',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="public">Public</option>
                    <option value="invite-only">Invite Only</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    onClick={() => setShowCreateModal(false)}
                    variant="ghost"
                    style={{ flex: 1, color: '#000' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateModal(false);
                      setCreateCommunityName('');
                    }}
                    variant="primary"
                    style={{ flex: 1, color: '#000', background: '#fff', border: '1px solid var(--line)' }}
                  >
                    Create
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </AuthGate>
    </>
  );
}
