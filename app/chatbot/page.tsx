import { createClient } from '@/lib/supabase/server';
import Chatbot from '@/components/Chatbot';

export default async function ChatbotPage() {
  const supabase = createClient();
  
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Check if user has Pro subscription
  let isProUser = false;
  if (user) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();
    
    isProUser = !!subscription;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              AI Scripting Assistant
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant help with Roblox scripting from our AI assistant. Ask questions about Luau, 
              Roblox Studio, game development, and more!
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Knowledge</h3>
              <p className="text-gray-600">
                Trained on Roblox scripting best practices, Luau programming, and game development techniques.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Answers</h3>
              <p className="text-gray-600">
                Get immediate responses to your scripting questions with code examples and explanations.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Help</h3>
              <p className="text-gray-600">
                Context-aware conversations that remember your previous questions and provide tailored guidance.
              </p>
            </div>
          </div>

          {/* Chatbot Component */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <Chatbot isProUser={isProUser} />
          </div>

          {/* Example Questions */}
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Example Questions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Basic Scripting</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• "How do I create a teleport script?"</li>
                  <li>• "What's the difference between LocalScript and Script?"</li>
                  <li>• "How do I make a part change color when clicked?"</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">Advanced Topics</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• "How do I implement a data store system?"</li>
                  <li>• "What's the best way to handle player data?"</li>
                  <li>• "How do I create a custom GUI with animations?"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Tips for Better Results</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Be specific about what you're trying to achieve</li>
              <li>• Include relevant context about your game or script</li>
              <li>• Ask follow-up questions if you need clarification</li>
              <li>• Try different phrasings if you don't get the answer you need</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
