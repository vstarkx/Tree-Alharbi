# Deployment Guide

## Your Application is Now Deployed! 🎉

Your Family Tree website has been successfully deployed to GitHub Pages.

### 🔗 Access Your Application

Your app is live at: **https://vstarkx.github.io/Tree-Alharbi/**

> Note: It may take a few minutes for GitHub Pages to build and publish your site after the first deployment.

## Deployment Configuration

### What's Been Set Up

1. **GitHub Repository**: Public repository at `https://github.com/vstarkx/Tree-Alharbi`
2. **GitHub Pages**: Configured to deploy from the `gh-pages` branch
3. **Automatic Deployment**: GitHub Actions workflow for automatic deployment on push to main
4. **Manual Deployment**: `npm run deploy` command for manual deployments

### Repository Configuration

- **Base URL**: `/Tree-Alharbi/`
- **Branch**: `main` for source code, `gh-pages` for deployed site
- **Build Tool**: Vite
- **Package Manager**: npm

## Manual Deployment

If you need to manually deploy changes:

```bash
# 1. Make your changes
# 2. Commit them
git add .
git commit -m "Your commit message"
git push origin main

# 3. Deploy (optional, GitHub Actions will do this automatically)
npm run deploy
```

## GitHub Actions Automatic Deployment

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Install dependencies
2. Build the project
3. Deploy to GitHub Pages

You can view the deployment status in the "Actions" tab of your repository:
`https://github.com/vstarkx/Tree-Alharbi/actions`

## Troubleshooting

### Site Not Loading

1. **Check GitHub Pages Settings**:
   - Go to `https://github.com/vstarkx/Tree-Alharbi/settings/pages`
   - Ensure "Source" is set to "gh-pages" branch and "/ (root)" folder
   - Wait a few minutes after the first deployment

2. **Check Build Status**:
   - Visit `https://github.com/vstarkx/Tree-Alharbi/actions`
   - Ensure the latest workflow run completed successfully

3. **Clear Browser Cache**:
   - Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)

### 404 Errors

If you get 404 errors when navigating:
- This is normal for React Router with GitHub Pages
- Users should use the navigation menu rather than refreshing on sub-routes
- For a production app, consider using HashRouter or implementing a 404.html redirect

### Build Failures

1. Check the GitHub Actions logs
2. Ensure all dependencies are in `package.json`
3. Test the build locally: `npm run build`

## Local Development

To run the app locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

## Updating the Application

To make changes:

```bash
# 1. Pull latest changes
git pull origin main

# 2. Make your changes to the code

# 3. Test locally
npm run dev

# 4. Build and test production build
npm run build
npm run preview

# 5. Commit and push
git add .
git commit -m "Description of changes"
git push origin main

# GitHub Actions will automatically deploy the changes
```

## Custom Domain (Optional)

To use a custom domain:

1. Buy a domain from a registrar (e.g., Namecheap, GoDaddy)
2. Configure DNS settings:
   - Add a CNAME record pointing to `vstarkx.github.io`
3. Add a `CNAME` file to the `public` folder:
   ```
   your-domain.com
   ```
4. Update GitHub Pages settings with your custom domain
5. Rebuild and deploy

## Environment Variables

This app uses local storage, so no environment variables are needed. If you add backend integration:

1. Never commit API keys or secrets
2. Use GitHub Secrets for sensitive data in Actions
3. Use environment variables in Vite: `import.meta.env.VITE_API_KEY`

## Performance Optimization

The current build is optimized for production:
- Minified JavaScript and CSS
- Tree-shaking to remove unused code
- Code splitting for faster load times

To further optimize:
- Add image optimization
- Implement lazy loading for routes
- Enable Gzip compression (automatic on GitHub Pages)

## Monitoring

To monitor your application:
1. Check GitHub Actions for deployment status
2. Use browser DevTools for performance analysis
3. Monitor GitHub Pages uptime (generally 99.9%+)

## Support

For issues with:
- **The application**: Check the README.md
- **Deployment**: Check GitHub Actions logs
- **GitHub Pages**: See [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Next Steps

1. ✅ Application is deployed
2. ✅ GitHub Actions is configured
3. ✅ Share the link: `https://vstarkx.github.io/Tree-Alharbi/`
4. 🎯 Start adding family members!
5. 🎯 Customize the design if needed
6. 🎯 Consider adding backend integration for multi-user support

---

**Deployment Date**: October 10, 2025  
**Deployed By**: vstarkx  
**Repository**: https://github.com/vstarkx/Tree-Alharbi

