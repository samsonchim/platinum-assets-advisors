"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Message {
  id: string;
  message: string;
  is_admin_reply: boolean;
  created_at: string;
  conversation_id: string;
}

interface SupportChatProps {
  user: any;
}

const SupportChat: React.FC<SupportChatProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load existing conversation when chat opens
  useEffect(() => {
    if (isOpen && user?.id) {
      loadConversation();
    }
  }, [isOpen, user?.id]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (conversationId) {
      console.log("Setting up real-time subscription for conversation:", conversationId);
      
      const subscription = supabase
        .channel(`support_messages_${conversationId}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'support_messages',
            filter: `conversation_id=eq.${conversationId}`
          }, 
          (payload) => {
            console.log("New message received:", payload.new);
            const newMessage = payload.new as Message;
            setMessages(prev => {
              // Check if message already exists to prevent duplicates
              const exists = prev.some(msg => msg.id === newMessage.id);
              if (!exists) {
                return [...prev, newMessage];
              }
              return prev;
            });
          }
        )
        .subscribe((status) => {
          console.log("Subscription status:", status);
        });

      return () => {
        console.log("Unsubscribing from real-time updates");
        subscription.unsubscribe();
      };
    }
  }, [conversationId]);

  const loadConversation = async () => {
    try {
      console.log("Loading conversation for user:", user.id);
      
      // Get or create conversation
      let { data: conversation, error: convError } = await supabase
        .from('support_conversations')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'open')
        .single();

      if (convError && convError.code === 'PGRST116') {
        // No open conversation exists, create a new one
        console.log("Creating new conversation");
        const { data: newConv, error: createError } = await supabase
          .from('support_conversations')
          .insert({
            user_id: user.id,
            status: 'open'
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating conversation:', createError);
          return;
        }
        conversation = newConv;
        console.log("New conversation created:", conversation);
      } else if (convError) {
        console.error('Error loading conversation:', convError);
        return;
      }

      setConversationId(conversation.id);
      console.log("Conversation loaded:", conversation);

      // Load ALL messages for this conversation (not just recent ones)
      const { data: messagesData, error: messagesError } = await supabase
        .from('support_messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error loading messages:', messagesError);
        return;
      }

      console.log("Messages loaded:", messagesData);
      setMessages(messagesData || []);
    } catch (error) {
      console.error('Error in loadConversation:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !conversationId || loading) {
      console.log("Cannot send message:", { message: message.trim(), conversationId, loading });
      return;
    }

    const messageText = message.trim();
    console.log("Sending message:", messageText, "to conversation:", conversationId);
    
    setMessage(""); // Clear input immediately
    setLoading(true);

    // Create temporary message for immediate display
    const tempMessage: Message = {
      id: `temp-${Date.now()}`,
      message: messageText,
      is_admin_reply: false,
      created_at: new Date().toISOString(),
      conversation_id: conversationId
    };

    // Add message to UI immediately
    setMessages(prev => [...prev, tempMessage]);

    try {
      const { data, error } = await supabase
        .from('support_messages')
        .insert({
          user_id: user.id,
          conversation_id: conversationId,
          message: messageText,
          is_admin_reply: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending message:', error);
        // Remove temp message and restore input
        setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
        setMessage(messageText);
        alert('Failed to send message. Please try again.');
        return;
      }

      console.log("Message sent successfully:", data);

      // Replace temp message with real message
      setMessages(prev => prev.map(msg => 
        msg.id === tempMessage.id ? data : msg
      ));

      // Update conversation last_message_at
      const { error: updateError } = await supabase
        .from('support_conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (updateError) {
        console.error('Error updating conversation timestamp:', updateError);
      }

    } catch (error) {
      console.error('Error in sendMessage:', error);
      // Remove temp message and restore input
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      setMessage(messageText);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        title="Contact Support"
      >
        {isOpen ? (
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        ) : (
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <h3 className="font-semibold">Support Chat</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>👋 Hi! How can we help you today?</p>
                <p className="text-sm mt-2">Send us a message and we'll get back to you soon!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.is_admin_reply ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.is_admin_reply
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.is_admin_reply ? 'text-gray-500' : 'text-blue-200'
                    }`}>
                      {formatTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="animate-spin">
                    <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/>
                    <path d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;
