# Family Tree Website

A modern, responsive web application for visualizing and managing family connections. Built with React, TailwindCSS, and react-d3-tree.

## 🚀 Live Demo

**Visit the live application:** [https://vstarkx.github.io/Tree-Alharbi/](https://vstarkx.github.io/Tree-Alharbi/)

## 📖 Quick Links

- [Quick Start Guide](QUICKSTART.md) - Get started in 5 minutes
- [Deployment Guide](DEPLOYMENT.md) - Deployment details and troubleshooting
- [GitHub Repository](https://github.com/vstarkx/Tree-Alharbi)

## Features

- 🌳 **Interactive Tree Visualization** - View your family tree with an interactive, zoomable interface
- 👥 **Easy Member Management** - Add, edit, and delete family members with a simple form
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop devices
- 🎨 **Modern UI** - Clean and intuitive interface designed for all ages
- 💾 **Local Storage** - Data persists in your browser's local storage
- 🖼️ **Photo Support** - Add profile photos for each family member
- 🔗 **Relationship Linking** - Automatically connect family members through parent-child relationships

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Visualization:** react-d3-tree
- **Routing:** React Router
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vstarkx/Tree-Alharbi.git
cd Tree-Alharbi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploy to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
```json
"homepage": "https://yourusername.github.io/your-repo-name"
```

2. Update the `base` in `vite.config.js`:
```javascript
base: '/your-repo-name/'
```

3. Update the `basename` in `src/App.jsx`:
```javascript
<Router basename="/your-repo-name">
```

4. Deploy:
```bash
npm run deploy
```

Your app will be available at `https://yourusername.github.io/your-repo-name`

## Usage

### Adding a Family Member

1. Click the "Add Member" button
2. Fill in the member's details:
   - Name (required)
   - Date of Birth
   - Relation (e.g., Father, Mother, Son, Daughter)
   - Parent (to link them in the tree)
   - Email
   - Phone
   - Photo URL
3. Click "Add Member" to save

### Viewing Member Details

- Click on any member in the tree view
- A modal will appear showing all their information
- From here you can edit or delete the member

### Editing a Member

1. Click on a member to view their details
2. Click the "Edit" button
3. Update the information
4. Click "Update Member" to save changes

### Deleting a Member

1. Click on a member to view their details
2. Click the "Delete" button
3. Confirm the deletion
4. **Note:** Deleting a member will also delete all their descendants

### Tree Navigation

- **Pan:** Click and drag to move around the tree
- **Zoom In/Out:** Use the zoom buttons or mouse wheel
- **Reset View:** Click the maximize button to reset zoom and position

## Project Structure

```
Tree-Alharbi/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── MemberForm.jsx      # Add/Edit member form
│   │   └── MemberModal.jsx     # Member details modal
│   ├── pages/
│   │   ├── Home.jsx            # Homepage
│   │   └── FamilyTreePage.jsx  # Family tree view
│   ├── utils/
│   │   └── familyTreeUtils.js  # Data management utilities
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── tailwind.config.js          # TailwindCSS configuration
```

## Data Storage

The application uses browser's `localStorage` to persist family tree data. This means:
- Data is stored locally in your browser
- Data persists across sessions
- Data is private to your browser
- Clearing browser data will delete your family tree

For production use with multiple users, consider integrating a backend API and database.

## Future Enhancements

- [ ] Backend integration with database
- [ ] User authentication
- [ ] Export/Import family tree data (JSON, CSV)
- [ ] Print family tree
- [ ] Search functionality
- [ ] Multiple family tree support
- [ ] Share family tree with others
- [ ] Add more relationship types
- [ ] Timeline view
- [ ] Family statistics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by vstarkx

## Acknowledgments

- [react-d3-tree](https://github.com/bkrem/react-d3-tree) for the tree visualization
- [Lucide](https://lucide.dev/) for the beautiful icons
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

