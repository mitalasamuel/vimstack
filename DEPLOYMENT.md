# Deployment Guide

## Option 1: Railway (Recommended - Easiest)

Railway is the easiest platform for Laravel deployment.

### Steps:

1. **Sign up at [railway.app](https://railway.app)**

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables:**
   - Go to Variables tab
   - Add all your Laravel `.env` variables:
     ```
     APP_KEY=base64:... (generate with: php artisan key:generate)
     APP_URL=https://your-app.railway.app
     APP_ENV=production
     APP_DEBUG=false
     DB_CONNECTION=mysql
     DB_HOST=...
     DB_DATABASE=...
     DB_USERNAME=...
     DB_PASSWORD=...
     CACHE_STORE=database
     SESSION_DRIVER=database
     FILESYSTEM_DISK=public
     ```

4. **Add Database (Optional):**
   - Click "New" → "Database" → "MySQL" or "PostgreSQL"
   - Railway will automatically set DB_* environment variables

5. **Deploy:**
   - Railway will automatically detect `railway.json` and deploy
   - Or it will use `nixpacks.toml` for configuration

6. **Run Migrations:**
   - Go to your deployment
   - Click "View Logs" → "Open Shell"
   - Run: `php artisan migrate`

**That's it!** Railway handles everything automatically.

---

## Option 2: Render

### Steps:

1. **Sign up at [render.com](https://render.com)**

2. **Create New Web Service:**
   - Connect your GitHub repository
   - Select "Web Service"
   - Choose your repository

3. **Configure:**
   - **Environment:** PHP
   - **Build Command:** `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
   - **Start Command:** `php artisan serve --host=0.0.0.0 --port=$PORT`

4. **Add Environment Variables:**
   - Add all your Laravel `.env` variables in the Environment tab

5. **Add Database (Optional):**
   - Create a PostgreSQL or MySQL database
   - Render will automatically set connection variables

6. **Deploy:**
   - Click "Create Web Service"
   - Render will deploy automatically

---

## Option 3: Docker (Works on Any Platform)

The `Dockerfile` is included and works on:
- Railway
- Render
- Fly.io
- DigitalOcean App Platform
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- Any Docker-compatible platform

### Using Docker:

1. **Build:**
   ```bash
   docker build -t laravel-app .
   ```

2. **Run:**
   ```bash
   docker run -p 80:80 --env-file .env laravel-app
   ```

---

## Option 4: Fly.io

### Steps:

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Launch:**
   ```bash
   fly launch
   ```

4. **Set Environment Variables:**
   ```bash
   fly secrets set APP_KEY=base64:...
   fly secrets set APP_ENV=production
   # ... add all other variables
   ```

5. **Deploy:**
   ```bash
   fly deploy
   ```

---

## Required Environment Variables

All platforms need these:

### Critical:
- `APP_KEY` - Generate with: `php artisan key:generate`
- `APP_URL` - Your deployment URL
- `APP_ENV=production`
- `APP_DEBUG=false`

### Database:
- `DB_CONNECTION` (mysql, pgsql, or sqlite)
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

### Cache & Sessions:
- `CACHE_STORE=database` (or redis)
- `SESSION_DRIVER=database` (or redis)

### Storage:
- `FILESYSTEM_DISK=public` (or s3/wasabi for cloud storage)

---

## Why Not Vercel?

Vercel's PHP runtime (`vercel-php@0.6.0`) uses Node.js 18.x which is deprecated and blocked. There's no newer version available that works. Vercel is primarily designed for Node.js/Next.js applications, not PHP/Laravel.

**Railway and Render are much better choices for Laravel** - they:
- ✅ Support PHP natively
- ✅ Handle Composer automatically
- ✅ Have proper Laravel documentation
- ✅ No runtime version issues
- ✅ Better performance for PHP apps

---

## Quick Start (Railway - Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub
4. Select your repo
5. Add environment variables
6. Deploy!

That's it - Railway handles the rest automatically.

