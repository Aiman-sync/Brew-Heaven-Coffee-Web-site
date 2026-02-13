# 🚀 Deployment Guide - Brew Haven Coffee Shop

This guide will help you deploy the MERN stack application to Vercel (frontend) and Render (backend) for FREE.

## Prerequisites

- GitHub account (your code is already pushed)
- MongoDB Atlas account (free tier)
- Vercel account (free tier)
- Render account (free tier)

---

## Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new cluster (select FREE tier)
4. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Username: `brew-haven`
   - Password: (generate a secure password)
   - Role: `Read and write to any database`
5. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0)
6. Get connection string:
   - Go to **Database** → **Connect**
   - Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password

**Your MongoDB URI will look like:**
```
mongodb+srv://brew-haven:your-password@cluster0.xxxxx.mongodb.net/brew-haven
```

---

## Step 2: Deploy Backend to Render

1. Go to [Render](https://dashboard.render.com/)
2. Click **New** → **Web Service**
3. Connect your GitHub repository:
   - Select `Aiman-sync/Brew-Heaven-Coffee-Web-site`
4. Configure the service:
   - **Name:** `brew-haven-api`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

5. Add Environment Variables:
   - Click **Advanced** → **Add Environment Variable**
   - Add these variables:

   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGODB_URI` | (your MongoDB Atlas connection string) |
   | `FRONTEND_URL` | (leave empty for now, add after Vercel deploy) |

6. Click **Deploy Web Service**
7. Wait for deployment to complete (2-3 minutes)
8. Copy your backend URL (e.g., `https://brew-haven-api.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **Add New** → **Project**
3. Import your GitHub repository:
   - Select `Aiman-sync/Brew-Heaven-Coffee-Web-site`
4. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

5. Add Environment Variables:
   - Click **Environment Variables**
   - Add:

   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |

6. Click **Deploy**
7. Wait for deployment to complete (1-2 minutes)
8. Copy your frontend URL (e.g., `https://brew-heaven.vercel.app`)

---

## Step 4: Update CORS Settings

1. Go back to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Add/update `FRONTEND_URL` with your Vercel URL
5. Click **Save Changes** - Render will automatically redeploy

---

## Step 5: Seed the Database

After your backend is deployed:

1. Go to your backend URL in browser: `https://your-backend.onrender.com/api/health`
2. You should see a success message
3. To seed products, visit: `https://your-backend.onrender.com/api/products`

The products will be automatically seeded when you first access the products endpoint.

---

## Your Live URLs

- **Frontend:** `https://your-app.vercel.app`
- **Backend API:** `https://your-backend.onrender.com`
- **API Health:** `https://your-backend.onrender.com/api/health`

---

## Troubleshooting

### Frontend not loading data?
1. Check if backend is running: visit `/api/health`
2. Check browser console for CORS errors
3. Verify `VITE_API_URL` environment variable in Vercel

### Backend not connecting to MongoDB?
1. Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
2. Verify database user credentials
3. Check `MONGODB_URI` in Render environment variables

### Images not loading?
- Images use Unsplash CDN URLs, they should work automatically
- Check browser console for any blocked requests

---

## Free Tier Limits

| Service | Limit |
|---------|-------|
| MongoDB Atlas | 512 MB storage |
| Render | 750 hours/month, sleeps after 15 min inactivity |
| Vercel | 100 GB bandwidth/month |

---

## Need Help?

- Check the browser console for errors
- Check Render logs for backend errors
- Verify all environment variables are set correctly
