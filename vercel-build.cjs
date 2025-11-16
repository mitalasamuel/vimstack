#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Vercel build...');

// Check if vendor exists - warn but don't fail (vite config has fallback)
const vendorExists = fs.existsSync('./vendor');
if (!vendorExists) {
  console.warn('⚠️  WARNING: vendor directory not found!');
  console.warn('   Vite will attempt to build with fallback for ziggy-js alias.');
  console.warn('   For production, you should:');
  console.warn('   1. Run: composer install --no-dev --optimize-autoloader');
  console.warn('   2. Commit vendor directory');
  console.warn('   3. Push and redeploy');
  console.warn('');
  console.warn('   Note: .gitignore has been updated to allow vendor directory.');
} else {
  console.log('✅ vendor directory found');
}

// Vercel automatically runs npm install before buildCommand
// Just build the frontend assets
console.log('🔨 Building frontend assets...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Frontend build complete');
} catch (error) {
  console.error('❌ Failed to build frontend');
  if (error.stdout) console.error('STDOUT:', error.stdout.toString());
  if (error.stderr) console.error('STDERR:', error.stderr.toString());
  console.error('Error:', error.message);
  process.exit(1);
}

console.log('✅ Build complete!');

