#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Vercel build...');

// Check if vendor exists - CRITICAL for build because Vite uses it
const vendorExists = fs.existsSync('./vendor');
if (!vendorExists) {
  console.error('❌ ERROR: vendor directory not found!');
  console.error('');
  console.error('Vite build requires vendor directory (for ziggy-js alias).');
  console.error('');
  console.error('📋 SOLUTION:');
  console.error('   1. Run locally: composer install --no-dev --optimize-autoloader');
  console.error('   2. Commit vendor: git add vendor && git commit -m "Add vendor for Vercel"');
  console.error('   3. Push: git push');
  console.error('   4. Redeploy on Vercel');
  console.error('');
  console.error('Note: .gitignore has been updated to allow vendor directory.');
  process.exit(1);
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

