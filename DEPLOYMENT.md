# 🚀 Deployment Guide - DNYF DevStudio

## Table of Contents
- [GitHub Pages Deployment](#github-pages-deployment)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Custom Server Deployment](#custom-server-deployment)

---

## 🌐 GitHub Pages Deployment (Recommended)

### Automatic Deployment with GitHub Actions

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/DNYFTECH/devstudio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Build and deployment**, select:
     - Source: **GitHub Actions**
   
3. **Automatic Deployment**
   - The GitHub Actions workflow will automatically deploy on every push to `main`
   - Check the **Actions** tab to monitor deployment progress
   - Your app will be live at: `https://[your-username].github.io/devstudio/`

### Manual Deployment

```bash
# Install gh-pages package
npm install -D gh-pages

# Build and deploy
npm run build
npx gh-pages -d dist

# Or use the deploy script
npm run deploy
```

---

## ⚡ Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Or Use Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import from GitHub
4. Vercel will auto-detect Vite configuration
5. Click "Deploy"

---

## 🎯 Netlify Deployment

### Using Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

---

## 🖥️ Custom Server Deployment

### Prerequisites
- Node.js server or any static file server
- Web server (nginx, Apache, etc.)

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/devstudio/dist;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### Apache Configuration (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 🔒 Environment Variables

If you need environment variables, create a `.env` file:

```env
VITE_APP_NAME=DNYF DevStudio
VITE_APP_VERSION=1.0.0
```

Access in code:
```javascript
const appName = import.meta.env.VITE_APP_NAME;
```

---

## 📊 Performance Tips

1. **Enable Compression**
   - Most hosting providers enable gzip/brotli by default
   - Verify with browser DevTools Network tab

2. **CDN Configuration**
   - Use a CDN for static assets
   - Configure cache headers properly

3. **Service Worker**
   - PWA service worker is automatically configured
   - Caches assets for offline use

4. **Bundle Analysis**
   ```bash
   npm run build -- --report
   ```

---

## 🐛 Troubleshooting

### Blank page after deployment
- Check browser console for errors
- Verify `base` in `vite.config.js` matches your deployment path
- For subdirectories: `base: '/devstudio/'`

### 404 on page refresh
- Configure your server for SPA routing (see nginx/apache configs above)

### Assets not loading
- Check `base` path in `vite.config.js`
- Verify file paths are correct

### PWA not working
- Ensure HTTPS is enabled
- Check service worker registration in browser DevTools

---

## ✅ Post-Deployment Checklist

- [ ] Test all features in production
- [ ] Verify PWA installation works
- [ ] Check mobile responsiveness
- [ ] Test offline functionality
- [ ] Verify API endpoints work
- [ ] Check browser console for errors
- [ ] Test file upload/download
- [ ] Verify all routes work correctly

---

## 📞 Need Help?

- Check [GitHub Issues](https://github.com/DNYFTECH/devstudio/issues)
- Contact: DNYFTECH team

---

**Happy Deploying! 🚀**
