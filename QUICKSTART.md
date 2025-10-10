# Quick Start Guide

## 🚀 Your Family Tree App is Ready!

### Access Your Live App

Visit: **https://vstarkx.github.io/Tree-Alharbi/**

## First Steps

### 1. Add Your First Family Member

1. Click the "Get Started" button or navigate to "Family Tree"
2. Click "Add Member"
3. Fill in the details:
   - **Name**: Full name of the person
   - **Date of Birth**: Optional
   - **Relation**: e.g., "Grandfather", "Mother", "Self"
   - **Parent**: Leave as "None" for the first member (root of the tree)
   - **Email & Phone**: Optional contact information
   - **Photo URL**: Optional - paste a URL to a photo

4. Click "Add Member"

### 2. Build Your Family Tree

Continue adding family members:

**For a traditional family tree structure:**

1. Start with the oldest generation (grandparents)
2. Add their children (select the grandparent as parent)
3. Continue with grandchildren (select their parent)

**Example:**
```
John Doe (Grandfather) - No parent
├── Jane Doe (Daughter) - Parent: John Doe
│   ├── Emily Smith (Granddaughter) - Parent: Jane Doe
│   └── Michael Smith (Grandson) - Parent: Jane Doe
└── Robert Doe (Son) - Parent: John Doe
```

### 3. Explore the Tree

- **Pan**: Click and drag to move around
- **Zoom**: Use the zoom buttons or mouse wheel
- **View Details**: Click on any person in the tree
- **Edit**: Click a person → Click "Edit" button
- **Delete**: Click a person → Click "Delete" (removes person and all descendants)

## Adding Photos

### Option 1: Use Image Hosting Services

1. **Imgur** (Free, no account needed):
   - Go to https://imgur.com
   - Upload your image
   - Right-click on the image → "Copy image address"
   - Paste in the "Photo URL" field

2. **Google Photos**:
   - Upload to Google Photos
   - Share the photo → Get link
   - Use the direct image link

3. **GitHub** (if you're technical):
   - Upload to your repository's `public` folder
   - Use path: `https://vstarkx.github.io/Tree-Alharbi/your-image.jpg`

### Option 2: Use a Public URL

If you have images hosted elsewhere, just paste the direct URL.

**Note**: The URL must be a direct link to the image file (ending in .jpg, .png, etc.)

## Tips for Best Results

### 📝 Naming Convention
- Use full names for clarity
- Be consistent with naming format (e.g., "First Last")

### 🔗 Linking Relationships
- Always link children to their parents
- Each person can have one parent in this system (expandable in future)
- Start from the top (oldest generation) and work down

### 📱 Mobile Usage
- The app is fully responsive
- Use pinch to zoom on mobile
- Landscape mode recommended for viewing large trees

### 💾 Data Storage
- All data is stored in your browser's local storage
- Data persists between sessions
- Clear browser data = lose your tree
- **Tip**: Take screenshots or export data (feature coming soon)

## Common Questions

### Q: Can I have multiple trees?
Currently, the app supports one tree per browser. To manage multiple trees, use different browsers or browser profiles.

### Q: Can I share my tree with family?
The tree is stored locally in your browser. For now, you can:
- Share screenshots
- Manually share the data
- Future update will include export/import features

### Q: What happens if I clear my browser data?
Your family tree data will be deleted. Always keep backups of important information.

### Q: Can I print my tree?
You can take a screenshot or use browser print (Ctrl+P / Cmd+P). A dedicated print feature may be added in the future.

### Q: How many members can I add?
There's no hard limit, but very large trees (100+ members) may affect performance.

## Example Family Tree

Here's a sample tree to get you started:

```
Grandpa John (b. 1940)
└── Dad Michael (b. 1965)
    ├── Myself Alex (b. 1990)
    │   ├── Son Lucas (b. 2015)
    │   └── Daughter Emma (b. 2018)
    └── Sister Sarah (b. 1992)
        └── Nephew Noah (b. 2020)
```

## Need Help?

- Check the main [README.md](README.md) for technical details
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment information
- Visit the [GitHub repository](https://github.com/vstarkx/Tree-Alharbi) to report issues

## What's Next?

Future features we're considering:
- Export/Import tree data (JSON, CSV)
- Print-friendly view
- Search functionality
- Multiple relationship types (spouse, sibling)
- Collaborative editing
- Photo upload (without external URLs)
- Family statistics and insights

---

**Enjoy building your family tree! 🌳**

