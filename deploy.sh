#!/bin/bash

# Professional CV Website Deployment Script
# Automates deployment to GitHub Pages

set -e

echo "🚀 Deploying CV Website to GitHub Pages..."
echo "==========================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ This is not a git repository. Please initialize git first:"
    echo "   git init"
    echo "   git remote add origin https://github.com/yourusername/your-repo.git"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing them..."
    git add .
    git commit -m "Update CV content - automated deployment $(date '+%Y-%m-%d %H:%M:%S')"
else
    echo "✅ No uncommitted changes found"
fi

# Generate fresh PDF before deployment
echo "📄 Generating fresh PDF..."
npm run generate-pdf

# Add PDF to git if it exists
if [ -f "Muhammad-Ahsan-Amin-CV.pdf" ]; then
    git add Muhammad-Ahsan-Amin-CV.pdf
    git commit -m "Update PDF version - $(date '+%Y-%m-%d')" || echo "No PDF changes to commit"
fi

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin main

# Check if GitHub Pages is enabled
echo "🔍 Checking GitHub Pages status..."
echo "Please ensure GitHub Pages is enabled in your repository settings:"
echo "1. Go to your repository on GitHub"
echo "2. Settings → Pages"
echo "3. Source: Deploy from a branch"
echo "4. Branch: main"
echo "5. Folder: / (root)"

echo ""
echo "🎉 Deployment completed!"
echo "======================="
echo ""
echo "Your CV should be available at:"
echo "https://yourusername.github.io/your-repo-name"
echo ""
echo "Note: It may take 5-10 minutes for changes to appear on GitHub Pages"
echo ""
echo "📊 Don't forget to:"
echo "- Check your live site"
echo "- Test PDF download"
echo "- Verify Google Analytics (if configured)"
echo "- Share your new CV URL!"