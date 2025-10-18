'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Loader2, Sparkles, ChevronDown, Plus, MessageSquare, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { renderMarkdownContent } from '@/lib/markdownRenderer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatbotProps {
  isProUser: boolean;
  initialSessionId?: string;
}

export default function Chatbot({ isProUser, initialSessionId }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your Roblox scripting assistant. I can help you with Luau programming, Roblox Studio, game development, and more. 

Here's a quick example of what I can help with:

\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    print("Welcome, " .. player.Name .. "!")
end)
\`\`\`

What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(initialSessionId || null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Also scroll to bottom when loading state changes
  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [isLoading]);

  // Handle scroll detection
  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const handleScroll = () => {
      const scrollContainer = scrollArea.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollHint(!isNearBottom && messages.length > 3);
      }
    };

    const scrollContainer = scrollArea.querySelector('[data-radix-scroll-area-viewport]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [messages.length]);

  // Load chat sessions
  const loadSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  };

  // Load messages for a session
  const loadSessionMessages = async (sessionId: string) => {
    setIsLoadingSession(true);
    try {
      const response = await fetch(`/api/chat/sessions/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        const loadedMessages: Message[] = data.messages.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at)
        }));
        setMessages(loadedMessages);
        setCurrentSessionId(sessionId);
      }
    } catch (error) {
      console.error('Failed to load session messages:', error);
    } finally {
      setIsLoadingSession(false);
    }
  };

  // Create a new session
  const createNewSession = async (title: string) => {
    try {
      const response = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentSessionId(data.session.id);
        await loadSessions();
        return data.session.id;
      }
    } catch (error) {
      console.error('Failed to create session:', error);
    }
    return null;
  };

  // Load sessions on component mount
  useEffect(() => {
    if (isProUser) {
      loadSessions();
    }
  }, [isProUser]);

  // Load initial session if provided
  useEffect(() => {
    if (initialSessionId && isProUser) {
      loadSessionMessages(initialSessionId);
    }
  }, [initialSessionId, isProUser]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to use the chatbot');
      }

      // Create a new session if none exists
      let sessionId = currentSessionId;
      if (!sessionId) {
        const firstMessage = userMessage.content.slice(0, 50) + (userMessage.content.length > 50 ? '...' : '');
        sessionId = await createNewSession(firstMessage);
      }

      // Prepare conversation history for the API (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
          conversationHistory: conversationHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to get response');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMessage}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm your Roblox scripting assistant. I can help you with Luau programming, Roblox Studio, game development, and more. 

Here's a quick example of what I can help with:

\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
    print("Welcome, " .. player.Name .. "!")
end)
\`\`\`

What would you like to know?`,
        timestamp: new Date()
      }
    ]);
    setCurrentSessionId(null);
    setError(null);
  };

  const startNewChat = () => {
    clearChat();
  };

  if (!isProUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">AI Chatbot</h3>
          <p className="text-gray-600 max-w-md">
            Get instant help with Roblox scripting from our AI assistant. Ask questions about Luau, Roblox Studio, game development, and more!
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
            <p className="text-yellow-800 font-medium">
              🔒 Pro Feature
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              This feature is available with a Pro subscription. Upgrade to get unlimited access to our AI assistant.
            </p>
          </div>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <a href="/pricing">Upgrade to Pro</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[500px] max-h-[80vh] gap-4">
      {/* Sessions Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Chat History</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={startNewChat}
                className="text-xs h-7 w-7 p-0"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full px-3">
              <div className="space-y-1 pb-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${
                      currentSessionId === session.id
                        ? 'bg-purple-100 border border-purple-200'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => loadSessionMessages(session.id)}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {session.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(session.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {sessions.length === 0 && (
                  <div className="text-center text-gray-500 text-sm py-4">
                    No chat history yet
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="pb-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                AI Scripting Assistant
                {currentSessionId && (
                  <span className="text-xs text-gray-500 font-normal">
                    (Session active)
                  </span>
                )}
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={startNewChat}
                className="text-xs"
              >
                New Chat
              </Button>
            </div>
          </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4 min-h-full">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="text-sm">
                      {message.role === 'assistant' ? (
                        <div className="space-y-2">
                          {renderMarkdownContent(message.content)}
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      )}
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* Scroll to bottom button */}
          {showScrollHint && (
            <Button
              onClick={scrollToBottom}
              size="sm"
              className="absolute bottom-20 right-6 bg-purple-600 hover:bg-purple-700 text-white shadow-lg z-10"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              Scroll to bottom
            </Button>
          )}
          
          <div className="border-t p-4 flex-shrink-0 bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Roblox scripting..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {error && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500">
              💡 Try asking: &quot;How do I create a teleport script?&quot; or &quot;What&apos;s the difference between LocalScript and Script?&quot;
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
