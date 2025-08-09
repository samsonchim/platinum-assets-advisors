"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: string;
  message: string;
  is_admin_reply: boolean;
  created_at: string;
  conversation_id: string;
  user_id: string;
}

interface Conversation {
  id: string;
  user_id: string;
  status: string;
  last_message_at: string;
  created_at: string;
  profiles?: {
    name: string;
    username: string;
  };
  latest_message?: string;
  unread_count?: number;
}

const AdminSupportPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check admin authentication
  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (!adminSession) {
      router.replace("/admin/login");
    } else {
      console.log("Admin authenticated, loading conversations...");
      loadConversations();
      
      // Set up a timer to periodically refresh conversations
      const interval = setInterval(() => {
        console.log("Auto-refreshing conversations...");
        loadConversations();
      }, 10000); // Refresh every 10 seconds
      
      return () => clearInterval(interval);
    }
  }, [router]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Set up real-time subscription for new messages and conversations
  useEffect(() => {
    const messageSubscription = supabase
      .channel('admin_support_messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'support_messages'
        }, 
        (payload) => {
          console.log("Admin received new message:", payload.new);
          const newMessage = payload.new as Message;
          
          // If it's for the selected conversation, add to messages
          if (selectedConversation && newMessage.conversation_id === selectedConversation.id) {
            setMessages(prev => {
              // Check if message already exists to prevent duplicates
              const exists = prev.some(msg => msg.id === newMessage.id);
              if (!exists) {
                return [...prev, newMessage];
              }
              return prev;
            });
          }
          
          // Refresh conversations to update last message
          loadConversations();
        }
      )
      .subscribe((status) => {
        console.log("Admin message subscription status:", status);
      });

    const conversationSubscription = supabase
      .channel('admin_support_conversations')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'support_conversations'
        }, 
        (payload) => {
          console.log("Conversation update:", payload);
          loadConversations();
        }
      )
      .subscribe((status) => {
        console.log("Admin conversation subscription status:", status);
      });

    return () => {
      messageSubscription.unsubscribe();
      conversationSubscription.unsubscribe();
    };
  }, [selectedConversation]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      console.log("🔄 Admin: Loading conversations...");
      
      // First get all conversations WITHOUT the profiles join
      const { data: conversations, error: convError } = await supabase
        .from('support_conversations')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (convError) {
        console.error('❌ Error loading conversations:', convError);
        return;
      }

      console.log("📋 Raw conversations from DB:", conversations);

      if (!conversations || conversations.length === 0) {
        console.log("📭 No conversations found in database");
        setConversations([]);
        setLoading(false);
        return;
      }

      // Get latest message for each conversation
      const conversationsWithDetails = await Promise.all(
        conversations.map(async (conv) => {
          console.log(`🔍 Processing conversation ${conv.id} for user ${conv.user_id}`);
          
          // Get user profile info - try profiles table first, then auth.users as fallback
          let userInfo = { name: "Unknown User", username: "unknown" };
          
          // Try profiles table first
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('name, username')
            .eq('id', conv.user_id)
            .single();
          
          if (profile) {
            userInfo = profile;
            console.log(`👤 Found user profile:`, userInfo);
          } else {
            console.log(`❌ No profile found for user ${conv.user_id}, error:`, profileError);
            
            // Fallback: try to get user info from auth.users (if accessible)
            try {
              const { data: authUser } = await supabase.auth.admin.getUserById(conv.user_id);
              if (authUser?.user) {
                userInfo = {
                  name: authUser.user.user_metadata?.name || authUser.user.email?.split('@')[0] || "Unknown User",
                  username: authUser.user.email?.split('@')[0] || "unknown"
                };
                console.log(`👤 Found auth user info:`, userInfo);
              }
            } catch (authError) {
              console.log(`❌ Auth fallback failed:`, authError);
              // Use user_id as display name as last resort
              userInfo = {
                name: `User ${conv.user_id.slice(0, 8)}`,
                username: conv.user_id.slice(0, 8)
              };
            }
          }
          
          // Get all messages for this conversation
          const { data: messages, error: msgError } = await supabase
            .from('support_messages')
            .select('*')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false });

          if (msgError) {
            console.error(`❌ Error loading messages for conv ${conv.id}:`, msgError);
            return {
              ...conv,
              profiles: userInfo,
              latest_message: "Error loading messages",
              unread_count: 0,
              total_messages: 0
            };
          }

          console.log(`💬 Conversation ${conv.id} has ${messages?.length || 0} messages:`, messages);

          const latestMessage = messages && messages.length > 0 ? messages[0] : null;
          const unreadCount = messages ? messages.filter(msg => !msg.is_admin_reply).length : 0;

          return {
            ...conv,
            profiles: userInfo,
            latest_message: latestMessage?.message || "No messages yet",
            unread_count: unreadCount,
            total_messages: messages?.length || 0
          };
        })
      );

      console.log("✅ Conversations with details:", conversationsWithDetails);
      setConversations(conversationsWithDetails);
    } catch (error) {
      console.error('💥 Error in loadConversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversation: Conversation) => {
    try {
      console.log(`📨 Loading messages for conversation ${conversation.id}`);
      
      const { data, error } = await supabase
        .from('support_messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Error loading messages:', error);
        return;
      }

      console.log(`✅ Loaded ${data?.length || 0} messages for conversation ${conversation.id}:`, data);
      setMessages(data || []);
      setSelectedConversation(conversation);
    } catch (error) {
      console.error('💥 Error in loadMessages:', error);
    }
  };

  const sendReply = async () => {
    if (!replyMessage.trim() || !selectedConversation || sendingReply) return;

    const messageText = replyMessage.trim();
    setReplyMessage(""); // Clear input immediately
    setSendingReply(true);

    // Create temporary message for immediate display
    const tempMessage: Message = {
      id: `temp-admin-${Date.now()}`,
      message: messageText,
      is_admin_reply: true,
      created_at: new Date().toISOString(),
      conversation_id: selectedConversation.id,
      user_id: selectedConversation.user_id
    };

    // Add message to UI immediately
    setMessages(prev => [...prev, tempMessage]);

    try {
      const { data, error } = await supabase
        .from('support_messages')
        .insert({
          user_id: selectedConversation.user_id,
          conversation_id: selectedConversation.id,
          message: messageText,
          is_admin_reply: true
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending reply:', error);
        // Remove temp message and restore input
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        setReplyMessage(messageText);
        alert('Failed to send reply. Please try again.');
        return;
      }

      // Replace temp message with real message
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? data : msg
      ));

      // Update conversation last_message_at
      await supabase
        .from('support_conversations')
        .update({ 
          last_message_at: new Date().toISOString(),
          status: 'open'
        })
        .eq('id', selectedConversation.id);

    } catch (error) {
      console.error('Error in sendReply:', error);
      // Remove temp message and restore input
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      setReplyMessage(messageText);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  const updateConversationStatus = async (status: string) => {
    if (!selectedConversation) return;

    try {
      const { error } = await supabase
        .from('support_conversations')
        .update({ status })
        .eq('id', selectedConversation.id);

      if (error) {
        console.error('Error updating status:', error);
        return;
      }

      setSelectedConversation(prev => prev ? { ...prev, status } : null);
      loadConversations();
    } catch (error) {
      console.error('Error in updateConversationStatus:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("adminLoginTime");
    router.replace("/admin/login");
  };

  const debugDatabase = async () => {
    console.log("=== DEBUG: Checking database ===");
    
    // Check conversations
    const { data: allConversations, error: convError } = await supabase
      .from('support_conversations')
      .select('*');
    
    console.log("All conversations:", allConversations);
    if (convError) console.error("Conversation error:", convError);
    
    // Check messages
    const { data: allMessages, error: msgError } = await supabase
      .from('support_messages')
      .select('*')
      .order('created_at', { ascending: true });
    
    console.log("All messages:", allMessages);
    if (msgError) console.error("Message error:", msgError);
    
    // Check profiles
    const { data: allProfiles, error: profileError } = await supabase
      .from('profiles')
      .select('*');
    
    console.log("All profiles:", allProfiles);
    if (profileError) console.error("Profile error:", profileError);
    
    console.log("=== END DEBUG ===");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Conversations */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Support Dashboard</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={loadConversations}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Refresh
              </button>
              <button
                onClick={debugDatabase}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
              >
                Debug DB
              </button>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            {conversations.length} conversations
          </p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading conversations...</div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No conversations yet</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => loadMessages(conv)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conv.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conv.profiles?.name || conv.profiles?.username || 'Unknown User'}
                      </h3>
                      {(conv.unread_count || 0) > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {conv.unread_count}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm truncate mt-1">
                      {conv.latest_message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        conv.status === 'open' ? 'bg-green-100 text-green-800' :
                        conv.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {conv.status}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatTime(conv.last_message_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {selectedConversation.profiles?.name || selectedConversation.profiles?.username || 'Unknown User'}
                </h2>
                <p className="text-gray-600 text-sm">
                  Conversation started {formatTime(selectedConversation.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedConversation.status}
                  onChange={(e) => updateConversationStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.is_admin_reply ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-xs lg:max-w-md">
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          msg.is_admin_reply
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <p className={`text-xs mt-1 ${
                        msg.is_admin_reply ? 'text-right text-gray-600' : 'text-gray-500'
                      }`}>
                        {msg.is_admin_reply ? 'Admin' : 'User'} • {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={sendingReply}
                />
                <button
                  onClick={sendReply}
                  disabled={sendingReply || !replyMessage.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sendingReply ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24" className="mx-auto mb-4">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p>Choose a conversation from the sidebar to start chatting with users</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportPage;
