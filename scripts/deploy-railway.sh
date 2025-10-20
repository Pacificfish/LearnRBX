#!/bin/bash

# Railway Deployment Script for LearnRBX
# This script helps you deploy to Railway

echo "🚀 LearnRBX Railway Deployment Script"
echo "======================================"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Check if user is logged in
if ! railway whoami &> /dev/null; then
    echo "🔐 Please log in to Railway:"
    railway login
fi

echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix errors and try again."
    exit 1
fi

echo "🚀 Deploying to Railway..."
railway up

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌐 Your app should be available at: https://your-app-name.railway.app"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set up your database in Railway dashboard"
    echo "2. Configure environment variables"
    echo "3. Run database migrations"
    echo "4. Set up Stripe webhooks"
    echo ""
    echo "📖 See RAILWAY_DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Deployment failed. Check the logs above."
    exit 1
fi
