import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get the user from Supabase
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has Pro subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (subError || !subscription) {
      return NextResponse.json({ 
        error: 'Pro subscription required',
        message: 'You need a Pro subscription to access the AI chatbot.' 
      }, { status: 403 });
    }

    // Get the message from the request body
    const { message, conversationHistory = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey || openaiApiKey === 'sk-placeholder') {
      return NextResponse.json({ 
        error: 'AI service not configured',
        message: 'The AI chatbot is not yet configured. Please try again later.' 
      }, { status: 503 });
    }

    // Prepare the conversation for GPT
    const systemPrompt = `You are a helpful AI assistant specialized in Roblox scripting and game development. You have extensive knowledge of:

- Luau programming language
- Roblox Studio and its features
- Roblox services and APIs
- Game development best practices
- Performance optimization
- Client-server architecture
- Data management and security
- UI/UX design in Roblox
- Animation and tweening
- Networking and multiplayer systems

Guidelines:
- Provide clear, accurate, and helpful answers
- Include code examples when relevant
- Explain concepts in a beginner-friendly way when appropriate
- Focus on Roblox-specific solutions
- Suggest best practices and common pitfalls
- If asked about non-Roblox topics, politely redirect to Roblox-related questions
- Keep responses concise but comprehensive
- Use proper Luau syntax and Roblox conventions

Always be encouraging and supportive of the user's learning journey.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      console.error('OpenAI API error:', errorData);
      return NextResponse.json({ 
        error: 'AI service error',
        message: 'Sorry, I encountered an error while processing your request. Please try again.' 
      }, { status: 500 });
    }

    const aiData = await openaiResponse.json();
    const aiResponse = aiData.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json({ 
        error: 'No response from AI',
        message: 'Sorry, I couldn\'t generate a response. Please try again.' 
      }, { status: 500 });
    }

    // Log the conversation for analytics (optional)
    try {
      await supabase
        .from('chatbot_conversations')
        .insert({
          user_id: user.id,
          user_message: message,
          ai_response: aiResponse,
          created_at: new Date().toISOString()
        });
    } catch (logError) {
      // Don't fail the request if logging fails
      console.error('Failed to log conversation:', logError);
    }

    return NextResponse.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again.' 
    }, { status: 500 });
  }
}
