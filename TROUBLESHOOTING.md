# Troubleshooting Guide

## Common Issues and Solutions

### Issue: Seeing "Vite + TypeScript" instead of Family Tree App

**Problem**: The dev server or deployed site shows the default Vite template with TypeScript logo and counter.

**Cause**: Leftover TypeScript template files from the initial Vite setup.

**Solution**: ✅ **FIXED** - The following files have been removed:
- `src/main.ts`
- `src/counter.ts`
- `src/style.css`
- `src/typescript.svg`

And `index.html` has been updated to point to `src/main.jsx` instead of `src/main.ts`.

**If you encounter this again:**
```bash
# Make sure you're using the React entry point
# Check that index.html has:
<script type="module" src="/src/main.jsx"></script>

# And the root div is:
<div id="root"></div>

# Then rebuild:
npm run build
npm run deploy
```

---

### Issue: "npm run dev" not working

**Problem**: Error says `package.json` not found.

**Solution**: Make sure you're in the correct directory:
```bash
cd c:\Users\Admin\Tree-alharbi-project\Tree-Alharbi
npm run dev
```

---

### Issue: Changes not showing on deployed site

**Problem**: Made changes but GitHub Pages still shows old version.

**Solutions**:

1. **Wait for GitHub Actions**: Check if the workflow is complete
   ```bash
   gh run list --limit 1
   ```

2. **Hard refresh browser**: Clear cache
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Manual deploy**:
   ```bash
   npm run deploy
   ```

4. **Check deployment**:
   - Visit: https://github.com/vstarkx/Tree-Alharbi/actions
   - Ensure latest workflow succeeded

---

### Issue: Build fails with TailwindCSS error

**Problem**: PostCSS plugin error about TailwindCSS.

**Solution**: ✅ **FIXED** - Using `@tailwindcss/postcss` instead of `tailwindcss` in `postcss.config.js`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

### Issue: Family tree not displaying

**Problem**: Tree view is blank or shows "No family members yet".

**Possible Causes & Solutions**:

1. **No data added yet**:
   - Click "Add Member" to add your first family member

2. **Browser storage cleared**:
   - Data is stored in localStorage
   - If you cleared browser data, you'll need to re-add members

3. **JavaScript error**:
   - Open browser DevTools (F12)
   - Check Console tab for errors
   - Report any errors as issues on GitHub

---

### Issue: Photos not displaying

**Problem**: Member photos show broken image or don't appear.

**Solutions**:

1. **Check URL validity**:
   - URL must be a direct link to an image file
   - Must end with `.jpg`, `.png`, `.gif`, etc.
   - URL must be publicly accessible

2. **Use image hosting**:
   - Imgur: https://imgur.com (free, no account)
   - GitHub: Upload to repository's public folder
   - Any CDN or public image host

3. **Test the URL**:
   - Open the image URL in a new browser tab
   - If it doesn't load, the URL won't work in the app

---

### Issue: Can't zoom or pan the tree

**Problem**: Tree view doesn't respond to zoom/pan controls.

**Solutions**:

1. **Use controls**:
   - Zoom buttons in top-right corner
   - Or mouse wheel to zoom
   - Click and drag to pan

2. **Check browser**:
   - Update to latest browser version
   - Try a different browser
   - Disable browser extensions that might interfere

3. **Tree is too small**:
   - Add more family members to see zoom/pan functionality

---

### Issue: Can't delete a member

**Problem**: Delete button doesn't work or shows error.

**Solutions**:

1. **Confirmation dialog**:
   - Make sure you click "OK" on the confirmation dialog
   - Delete will remove the member and ALL descendants

2. **Browser issues**:
   - Refresh the page
   - Check browser console for errors

---

### Issue: 404 Error on GitHub Pages

**Problem**: Getting 404 when accessing the site.

**Solutions**:

1. **Check deployment**:
   ```bash
   gh run list --limit 3
   ```
   Ensure latest run succeeded

2. **Verify GitHub Pages settings**:
   - Go to: https://github.com/vstarkx/Tree-Alharbi/settings/pages
   - Source should be: `gh-pages` branch, `/ (root)` folder

3. **Wait a few minutes**:
   - First deployment can take 5-10 minutes

4. **Check URL**:
   - Correct URL: https://vstarkx.github.io/Tree-Alharbi/
   - Note the capital 'A' in Alharbi

---

### Issue: Local development server won't start

**Problem**: `npm run dev` fails or hangs.

**Solutions**:

1. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check port availability**:
   - Default port is 5173
   - If in use, Vite will try 5174, 5175, etc.

3. **Check Node version**:
   ```bash
   node --version  # Should be v18 or higher
   ```

---

### Issue: React Router shows blank page on refresh

**Problem**: Refreshing on `/tree` route shows blank page.

**Cause**: GitHub Pages doesn't support client-side routing by default.

**Workaround**:
- Use the navigation menu instead of refreshing
- Or implement HashRouter (changes URLs to use `#`)

**Future fix**: Implement 404.html redirect (can be added later)

---

## Getting Help

If your issue isn't listed here:

1. **Check Console**:
   - Open browser DevTools (F12)
   - Look for error messages in Console tab

2. **Check GitHub Actions**:
   - Visit: https://github.com/vstarkx/Tree-Alharbi/actions
   - Check for failed workflows

3. **Review Documentation**:
   - [README.md](README.md) - Technical details
   - [QUICKSTART.md](QUICKSTART.md) - User guide
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment info

4. **Create an Issue**:
   - Visit: https://github.com/vstarkx/Tree-Alharbi/issues
   - Provide:
     - What you were trying to do
     - What happened instead
     - Browser and OS version
     - Any error messages

---

## Recent Fixes

### October 10, 2025
- ✅ Fixed: Removed TypeScript template files
- ✅ Fixed: Updated index.html to use React entry point (main.jsx)
- ✅ Fixed: Corrected PostCSS configuration for TailwindCSS v4
- ✅ Fixed: Added React and React-DOM dependencies

---

## Maintenance Tips

### Keep Dependencies Updated
```bash
npm outdated          # Check for outdated packages
npm update            # Update packages
```

### Clear Build Cache
```bash
rm -rf dist node_modules/.vite
npm run build
```

### Backup Your Data
Since data is stored locally:
- Take screenshots regularly
- Export data manually (feature to be added)
- Don't clear browser data unless you have backups

---

**Last Updated**: October 10, 2025

