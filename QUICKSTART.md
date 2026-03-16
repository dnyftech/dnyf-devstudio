# ⚡ Quick Start Guide - DNYF DevStudio

Get up and running in 5 minutes!

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/DNYFTECH/devstudio.git

# 2. Navigate to directory
cd devstudio

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open http://localhost:5173 in your browser!

## 📝 First Steps

### Create Your First File

1. Click the **+** button in the File Explorer (left sidebar)
2. Name your file: `hello.js`
3. Start coding!

```javascript
console.log('Hello from DNYF DevStudio!');

function greet(name) {
  return `Welcome, ${name}!`;
}

console.log(greet('Developer'));
```

### Try Live Preview

1. Create three files: `index.html`, `style.css`, `script.js`
2. The preview panel (right side) updates automatically
3. See your changes in real-time!

**Example HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <h1>Hello World!</h1>
  <button id="btn">Click Me</button>
</body>
</html>
```

### Test an API

1. Click the **API** icon in the top bar
2. Enter URL: `https://jsonplaceholder.typicode.com/posts/1`
3. Click **Send**
4. See the response!

### Save a Snippet

1. Open **Snippets** panel
2. Click **New**
3. Save your favorite code for later

## 🎯 Pro Tips

- **Ctrl/Cmd + S** to save files
- Files auto-save every few seconds
- Works offline once installed
- Install as PWA for native app experience

## 📱 Install as App

### Desktop
- Click install icon in browser address bar
- Or click browser menu → "Install DNYF DevStudio"

### Mobile
- Tap browser menu → "Add to Home Screen"

## 🔧 Build for Production

```bash
npm run build
```

Files will be in `dist/` folder ready to deploy!

## 🌐 Deploy

### GitHub Pages
```bash
npm run deploy
```

Your app will be live at: `https://[username].github.io/devstudio/`

## ❓ Need Help?

- Check the [full README](README.md)
- See [Deployment Guide](DEPLOYMENT.md)
- Report issues on GitHub

**Happy Coding! 💙**
