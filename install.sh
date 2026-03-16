#!/bin/bash

# DNYF DevStudio Installation Script
# This script automates the setup process

set -e

echo "🚀 DNYF DevStudio Installation"
echo "================================"
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version must be 16 or higher"
    echo "Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. npm run dev        - Start development server"
echo "  2. npm run build      - Build for production"
echo "  3. npm run deploy     - Deploy to GitHub Pages"
echo ""
echo "Happy coding! 💙"
