#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Vercel build...');

// Check if vendor exists
const vendorExists = fs.existsSync('./vendor');
if (!vendorExists) {
  console.error('❌ vendor directory not found!');
  console.error('\n📋 SOLUTION:');
  console.error('   1. Run locally: composer install --no-dev --optimize-autoloader');
  console.error('   2. Update .gitignore to allow vendor directory (already done)');
  console.error('   3. Commit vendor: git add vendor && git commit -m "Add vendor for Vercel"');
  console.error('   4. Push and redeploy');
  process.exit(1);
}

console.log('✅ vendor directory found');

// Install npm dependencies and build
console.log('📦 Installing npm dependencies...');
try {
  execSync('npm ci', { stdio: 'inherit' });
  console.log('✅ npm dependencies installed');
} catch {
  console.error('❌ Failed to install npm dependencies');
  process.exit(1);
}

console.log('🔨 Building frontend assets...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend build complete');
} catch {
  console.error('❌ Failed to build frontend');
  process.exit(1);
}

console.log('✅ Build complete!');

