# ToolFlow — Netlify Deployment Guide

## Prerequisites
- A free [Netlify](https://netlify.com) account
- This project folder (`tools_website/`)

---

## Option 1: Deploy via Netlify Drop (Easiest — No Git Required)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. **Drag and drop** the entire `tools_website` folder onto the page
3. Wait for upload to complete (usually 10-30 seconds)
4. Your site is live! Netlify will give you a random URL like `random-name.netlify.app`
5. **Optional:** Click "Site settings" → "Change site name" to set a custom subdomain like `toolflow.netlify.app`

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify
```bash
netlify login
```

### Step 3: Deploy
```bash
cd tools_website
netlify deploy --prod --dir=.
```

Follow the prompts to:
- Create a new site or link to existing
- Confirm the publish directory (`.`)

---

## Option 3: Deploy via Git (GitHub/GitLab)

### Step 1: Push to GitHub
```bash
cd tools_website
git init
git add .
git commit -m "Initial commit — ToolFlow v1"
git remote add origin https://github.com/YOUR_USERNAME/toolflow.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize access
4. Choose your `toolflow` repository
5. Set build settings:
   - **Build command:** (leave empty — it's static HTML)
   - **Publish directory:** `.`
6. Click **"Deploy site"**

### Step 3: Enable Auto-Deploy
Every push to `main` will auto-deploy. No build step needed!

---

## Post-Deployment Setup

### Custom Domain
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `toolflow.com`)
4. Follow DNS instructions to point your domain to Netlify
5. Netlify will auto-provision an SSL certificate

### Site Name
1. Go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Set to `toolflow` for the URL `toolflow.netlify.app`

### Update Canonical URLs
After deployment, update the canonical URLs in all HTML files to match your actual domain:

```bash
# Example: Replace placeholder domain with your actual domain
find . -name "*.html" -exec sed -i 's|toolflow.netlify.app|yourdomain.com|g' {} +
```

Also update `sitemap.xml` and `robots.txt` with your domain.

---

## File Structure

```
tools_website/
├── index.html                          # Homepage
├── about.html                          # About page
├── privacy.html                        # Privacy policy
├── terms.html                          # Terms of service
├── netlify.toml                        # Netlify configuration
├── _redirects                          # Clean URL redirects
├── robots.txt                          # Search engine crawling rules
├── sitemap.xml                         # XML sitemap for SEO
├── DEPLOYMENT.md                       # This file
├── css/
│   └── style.css                       # Global styles
├── js/
│   ├── utils.js                        # Shared utilities (clipboard, toast, etc.)
│   └── components.js                   # Shared components (header, footer)
├── tools/
│   ├── seo/
│   │   ├── slug-generator.html
│   │   └── reading-time-calculator.html
│   ├── text/
│   │   ├── word-counter.html
│   │   └── case-converter.html
│   ├── developer/
│   │   ├── json-formatter.html
│   │   ├── json-minifier.html
│   │   └── email-extractor.html
│   ├── converters/
│   │   ├── timestamp-converter.html
│   │   └── base64-converter.html
│   ├── generators/
│   │   ├── qr-code-generator.html
│   │   └── color-palette-generator.html
│   └── image/
│       └── jpeg-compressor.html
└── categories/
    ├── seo-tools.html
    ├── text-tools.html
    ├── developer-tools.html
    ├── image-tools.html
    ├── generators-tools.html
    └── converter-tools.html
```

---

## Clean URLs

The `_redirects` and `netlify.toml` files configure clean URLs so users can access:
- `toolflow.netlify.app/json-formatter` → JSON Formatter tool
- `toolflow.netlify.app/slug-generator` → Slug Generator tool
- etc.

---

## Troubleshooting

**404 errors?** Make sure the `_redirects` file is in the root directory and the publish directory is set to `.`

**Styles not loading?** Check that CSS/JS paths are relative (e.g., `../../css/style.css` for nested tool pages).

**QR Code not working?** The QR tool requires the CDN library. Make sure you have internet access.

---

## Need Help?

Reach out at hello@toolflow.com
