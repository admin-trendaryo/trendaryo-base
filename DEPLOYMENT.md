# Deployment Guide

## Pushing to GitHub

All the fixes made locally will work on GitHub once pushed. Use these commands:

```bash
git add .
git commit -m "Fix: Resolve all loading issues - MagneticButton imports, server exports, env vars, and preload warnings"
git push origin main
```

## Important: Environment Variables for Production

⚠️ **CRITICAL**: The `.env` file is typically in `.gitignore` and won't be pushed to GitHub (for security). You MUST set environment variables on your hosting platform.

### Required Environment Variables

Set these on your hosting platform (Netlify, Vercel, etc.):

```
ADMIN_EMAIL=admin@trendaryo.com
ADMIN_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
STAFF_EMAIL=staff@trendaryo.com
STAFF_PASSWORD_HASH=$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
JWT_SECRET=trendaryo-jwt-secret-key-change-in-production-2024
```

### Platform-Specific Instructions

#### Netlify
1. Go to Site Settings → Environment Variables
2. Add each variable above
3. Redeploy your site

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add each variable above
3. Redeploy

#### GitHub Pages
GitHub Pages only serves static files. For full functionality with backend API, you need:
- Deploy frontend to GitHub Pages
- Deploy backend (server/) to a separate service like:
  - Heroku
  - Railway
  - Render
  - AWS/Azure/GCP

### Alternative: Use GitHub Secrets for Actions

If using GitHub Actions for deployment:

1. Go to Repository → Settings → Secrets and variables → Actions
2. Add each environment variable as a secret
3. Reference them in your workflow file

## Checking .gitignore

Verify `.env` is in `.gitignore`:

```bash
# Check if .env is ignored
cat .gitignore | grep .env
```

If not present, add it:

```bash
echo ".env" >> .gitignore
```

## Build Commands for Hosting

### For Static Hosting (Frontend Only)
```bash
npm run build:client
```
Output: `dist/spa/`

### For Full Stack Hosting
```bash
npm run build
npm start
```

## Post-Deployment Checklist

- [ ] Environment variables set on hosting platform
- [ ] Build completes successfully
- [ ] Site loads without errors
- [ ] Admin login works (test with credentials)
- [ ] API endpoints respond correctly
- [ ] No console errors in browser

## Troubleshooting

### If site doesn't load after deployment:

1. **Check build logs** - Look for errors during build
2. **Verify environment variables** - Ensure all are set correctly
3. **Check API endpoints** - Make sure backend is accessible
4. **Review hosting platform logs** - Check for runtime errors
5. **Test locally first** - Ensure `npm run build && npm start` works

### Common Issues:

**Issue**: "JWT_SECRET environment variable is required"
**Fix**: Set JWT_SECRET in hosting platform environment variables

**Issue**: Admin login fails
**Fix**: Verify ADMIN_EMAIL, ADMIN_PASSWORD_HASH are set correctly

**Issue**: 404 on routes
**Fix**: Configure hosting platform for SPA routing (redirect all to index.html)

## Security Notes

⚠️ **Before going to production:**

1. Generate new strong passwords:
```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_STRONG_PASSWORD', 10))"
```

2. Generate strong JWT secret (32+ characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. Update environment variables with new values
4. Never commit `.env` file to GitHub
5. Use different credentials for production vs development
