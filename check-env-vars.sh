#!/bin/bash

# Environment Variable Verification Script
# This shows what you need to set in Vercel

echo "================================================"
echo "  VERCEL ENVIRONMENT VARIABLES TO SET"
echo "================================================"
echo ""
echo "Copy these EXACT values to your Vercel Dashboard:"
echo "Settings → Environment Variables"
echo ""

# Read from .env.local
if [ -f .env.local ]; then
    source .env.local
    
    echo "1. NEXT_PUBLIC_APP_URL"
    echo "   Value: https://www.nutrilabelpro.com"
    echo "   (Current in .env.local: ${NEXT_PUBLIC_APP_URL:-NOT SET})"
    echo ""
    
    echo "2. STRIPE_SECRET_KEY"
    if [ -n "$STRIPE_SECRET_KEY" ]; then
        echo "   Value: ${STRIPE_SECRET_KEY}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
    echo "3. STRIPE_BASIC_PRICE_ID"
    if [ -n "$STRIPE_BASIC_PRICE_ID" ]; then
        echo "   Value: ${STRIPE_BASIC_PRICE_ID}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
    echo "4. STRIPE_PRO_PRICE_ID"
    if [ -n "$STRIPE_PRO_PRICE_ID" ]; then
        echo "   Value: ${STRIPE_PRO_PRICE_ID}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
    echo "5. STRIPE_WEBHOOK_SECRET"
    if [ -n "$STRIPE_WEBHOOK_SECRET" ]; then
        echo "   Value: ${STRIPE_WEBHOOK_SECRET}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
    echo "6. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    if [ -n "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" ]; then
        echo "   Value: ${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
    echo "7. Firebase Variables:"
    echo "   NEXT_PUBLIC_FIREBASE_API_KEY: ${NEXT_PUBLIC_FIREBASE_API_KEY:-NOT SET}"
    echo "   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:-NOT SET}"
    echo "   NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${NEXT_PUBLIC_FIREBASE_PROJECT_ID:-NOT SET}"
    echo "   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:-NOT SET}"
    echo "   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:-NOT SET}"
    echo "   NEXT_PUBLIC_FIREBASE_APP_ID: ${NEXT_PUBLIC_FIREBASE_APP_ID:-NOT SET}"
    echo ""
    
    echo "8. USDA_API_KEY"
    if [ -n "$USDA_API_KEY" ]; then
        echo "   Value: ${USDA_API_KEY}"
    else
        echo "   ⚠️  NOT SET IN .env.local"
    fi
    echo ""
    
else
    echo "⚠️  .env.local file not found!"
fi

echo "================================================"
echo "  IMPORTANT: After setting in Vercel Dashboard"
echo "================================================"
echo "1. Go to Vercel → Deployments tab"
echo "2. Click '...' on latest deployment"
echo "3. Click 'Redeploy'"
echo ""
