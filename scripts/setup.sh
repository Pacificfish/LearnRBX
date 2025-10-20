#!/bin/bash

# LearnRBX Setup Script
echo "🚀 Setting up LearnRBX..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create content directories
echo "📁 Creating content directories..."
mkdir -p content/lessons content/steps content/module-tests

# Generate content from manifest
echo "🌱 Generating lesson content..."
npm run seed

# Generate database data
echo "🗄️ Preparing database data..."
npm run index

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy env.example to .env.local and fill in your credentials"
echo "2. Run the SQL schema in your Supabase project"
echo "3. Start the development server: npm run dev"
echo ""
echo "Happy learning! 🎓"
