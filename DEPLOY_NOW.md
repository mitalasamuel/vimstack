# 🚀 DEPLOY NOW - Step by Step

## Your app is 100% ready to deploy! Follow these steps:

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### Step 2: Deploy to Railway (5 minutes)

1. **Go to [railway.app](https://railway.app)**
   - Sign up/login with GitHub

2. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your `vimstack` repository
   - Railway will start building automatically

3. **Wait for Build** (2-3 minutes)
   - Railway will:
     - Install PHP 8.2
     - Install Composer dependencies
     - Install Node.js dependencies
     - Build frontend assets
   - Watch the logs to see progress

4. **Add Environment Variables**
   - Click on your service → **"Variables"** tab
   - Add these (Railway will provide the URL):
     ```
     APP_ENV=production
     APP_DEBUG=false
     LOG_CHANNEL=stderr
     ```
   - **APP_KEY** - We'll generate this next
   - **APP_URL** - Railway provides this automatically

5. **Add Database** (Recommended)
   - In your Railway project, click **"New"**
   - Select **"Database"** → **"MySQL"** or **"PostgreSQL"**
   - Railway automatically sets `DB_*` variables!

6. **Generate APP_KEY**
   - After first deploy, click **"View Logs"**
   - Click **"Open Shell"** button
   - Run: `php artisan key:generate`
   - Copy the generated key (starts with `base64:`)
   - Go to **Variables** tab
   - Add: `APP_KEY` = `<paste the key>`
   - Railway will auto-redeploy

7. **Run Migrations**
   - In Railway shell (same as above)
   - Run: `php artisan migrate`
   - If you have seeders: `php artisan db:seed`

8. **Done!** 🎉
   - Your app is live at the Railway URL
   - Check the **"Settings"** tab for your public URL

---

## ✅ What's Already Configured

- ✅ `railway.json` - Railway deployment config
- ✅ `nixpacks.toml` - Build configuration
- ✅ PHP 8.2 specified
- ✅ Node.js 20.x specified
- ✅ Build commands configured
- ✅ Start command configured
- ✅ All dependencies locked (composer.lock, package-lock.json)

---

## 🔍 Verify Deployment

After deployment, check:

1. **Build Logs** - Should show:
   - ✅ Composer install successful
   - ✅ npm install successful
   - ✅ npm run build successful
   - ✅ Server started

2. **Application** - Visit your Railway URL:
   - ✅ Homepage loads
   - ✅ No 500 errors
   - ✅ CSS/JS assets load
   - ✅ Database works (if configured)

---

## 🆘 If Something Goes Wrong

### Build Fails
- Check Railway logs for specific error
- Verify `composer.lock` and `package-lock.json` are committed
- Ensure all files are pushed to GitHub

### App Shows 500 Error
- Check `APP_KEY` is set
- Verify database variables (if using database)
- Check logs: Railway → View Logs
- Run in shell: `php artisan config:clear`

### Database Error
- Verify database service is running
- Check `DB_*` variables are set
- Test in shell: `php artisan tinker` → `DB::connection()->getPdo();`

---

## 📝 Quick Commands (Railway Shell)

```bash
# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Clear cache
php artisan config:clear
php artisan cache:clear

# Create storage link
php artisan storage:link

# Check environment
php artisan env
```

---

## 🎯 That's It!

Your app is configured and ready. Just:
1. Push to GitHub
2. Deploy on Railway
3. Add environment variables
4. Generate APP_KEY
5. Run migrations

**Your app will be live in production!** 🚀

