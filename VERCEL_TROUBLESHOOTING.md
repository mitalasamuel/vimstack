# Vercel Deployment Troubleshooting

## Current Configuration Status ✅

- ✅ `vercel.json` configured
- ✅ `api/index.php` exists and is correct
- ✅ Routes configured properly

## Common Issues & Solutions

### 1. Build Fails
**Error:** Build command fails
**Solution:** 
- Check that `composer.json` and `package.json` are committed
- Ensure `composer.lock` exists (it does)
- Verify PHP version in `composer.json` matches Vercel's PHP runtime

### 2. 404 NOT_FOUND Error
**Error:** `404: NOT_FOUND` when visiting the site
**Possible Causes:**
- Environment variables not set
- `APP_KEY` missing
- Database connection failing
- Routes not matching

**Solution:**
1. Set these environment variables in Vercel Dashboard:
   ```
   APP_KEY=base64:... (generate with: php artisan key:generate)
   APP_URL=https://your-app.vercel.app
   APP_ENV=production
   APP_DEBUG=false
   ```

### 3. 500 Internal Server Error
**Error:** White page or 500 error
**Possible Causes:**
- Missing environment variables
- Database connection issue
- Storage permissions (Vercel is read-only)
- Cache/Session driver set to 'file'

**Solution:**
- Set `CACHE_STORE=database` or `redis` (NOT `file`)
- Set `SESSION_DRIVER=database` or `redis` (NOT `file`)
- Set `FILESYSTEM_DISK=s3` or `wasabi` (NOT `local` or `public`)

### 4. Static Assets Not Loading
**Error:** CSS/JS files return 404
**Solution:** Already configured in `vercel.json` routes

### 5. Function Timeout
**Error:** Request times out
**Solution:** Already set `maxDuration: 30` in functions config

## Required Environment Variables Checklist

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

### Critical (Required)
- [ ] `APP_KEY` - Laravel application key
- [ ] `APP_URL` - Your Vercel deployment URL
- [ ] `APP_ENV=production`
- [ ] `APP_DEBUG=false`

### Database (Required)
- [ ] `DB_CONNECTION` (mysql, pgsql, or sqlite)
- [ ] `DB_HOST`
- [ ] `DB_PORT`
- [ ] `DB_DATABASE`
- [ ] `DB_USERNAME`
- [ ] `DB_PASSWORD`

### Cache & Sessions (Required for Vercel)
- [ ] `CACHE_STORE=database` or `redis`
- [ ] `SESSION_DRIVER=database` or `redis`

### Storage (Required for Vercel)
- [ ] `FILESYSTEM_DISK=s3` or `wasabi`
- Configure S3/Wasabi credentials via admin panel after deployment

## Testing Steps

1. **Check Build Logs:**
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Check "Build Logs" for errors

2. **Check Function Logs:**
   - Go to Vercel Dashboard → Deployments
   - Click on latest deployment
   - Check "Function Logs" for runtime errors

3. **Test Health Endpoint:**
   - Visit: `https://your-app.vercel.app/up`
   - Should return 200 OK

4. **Check Environment Variables:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Ensure all required variables are set for "Production"

## Quick Fix Commands

If you need to generate APP_KEY locally:
```bash
php artisan key:generate
# Copy the key from .env file
```

## Still Not Working?

Please provide:
1. **Exact error message** from Vercel dashboard
2. **Build logs** (screenshot or copy/paste)
3. **Function logs** (if available)
4. **What you see** when visiting the URL (404, 500, blank page, etc.)

