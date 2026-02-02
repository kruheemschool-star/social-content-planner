# Deployment Guide

## 1. Vercel (Recommended for Next.js)

Vercel is the creators of Next.js and provides the easiest deployment experience with zero configuration for most projects.

### Option A: Using Git (Easiest)
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [Vercel.com](https://vercel.com) and sign up/login.
3. Click **"Add New..."** -> **"Project"**.
4. Import your Git repository.
5. Click **"Deploy"**. Vercel detects Next.js automatically.

### Option B: Using CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run deployment command:
   ```bash
   vercel
   ```
3. Follow the prompts (Keep pressing Enter for defaults).
4. For production deployment:
   ```bash
   vercel --prod
   ```

---

## 2. Firebase Hosting

Firebase Hosting with Next.js requires **Cloud Functions** for server-side rendering (SSR) and API routes.

> **⚠️ Important:** You must be on the **Blaze (Pay-as-you-go) Plan** to use Cloud Functions/Cloud Build. The Spark (Free) plan does not support the runtime required for Next.js SSR.

### Steps
1. Install Firebase Tools:
   ```bash
   npm install -g firebase-tools
   ```
2. Login:
   ```bash
   firebase login
   ```
3. Initialize Project:
   ```bash
   firebase init hosting
   ```
   - Select your project.
   - Initializing for **web framework** (experimental) should detect Next.js.
4. Deploy:
   ```bash
   firebase deploy
   ```

### Troubleshooting
- **Error: Project must be on Blaze plan**: Go to the Firebase Console > Usage and Billing, and switch to the Blaze plan.
- **Region**: Ensure your functions region matches your hosting region preference if asked.
