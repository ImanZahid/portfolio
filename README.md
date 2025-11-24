# Iman Zahid - Portfolio Website

A modern, interactive portfolio website showcasing my software engineering projects, achievements, and professional experience. Built with React, TypeScript, and Tailwind CSS, featuring a stunning space-themed animated background.



## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Animated Space Theme**: Dynamic background with twinkling stars, shooting stars, and galaxy effects
- **Project Showcase**: Interactive swipeable carousel displaying GitHub repositories with README previews
- **Blog & Achievements**: Dedicated section for project highlights, awards, and milestones
- **Interactive Resume**: Embedded PDF resume with downloadable option
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Glass Morphism UI**: Modern glassmorphic navigation and footer
- **Dark Mode Optimized**: Carefully crafted dark theme with purple accents

## 🚀 Tech Stack

### Frontend Framework
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Routing & Navigation
- **React Router DOM** - Client-side routing

### API Integration
- **GitHub REST API** - Fetches repositories and README files

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── assets/          # Images, resume PDF, and static assets
│   └── blog/            # Blog post images
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components (shadcn/ui)
│   │   ├── layout/      # Navigation, Footer
│   │   └── AnimatedBackground.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Resume.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/ImanZahid/portfolio.git
cd portfolio
```

### Install Dependencies
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Optional: GitHub Personal Access Token for higher API rate limits
VITE_GITHUB_TOKEN=your_github_token_here
```

**Note**: Without a token, you'll be limited to 60 API requests per hour. With a token, you get 5,000 requests per hour.

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Customization

### Personal Information
Update personal details in the respective page files:

**Home Page** (`src/pages/Home.tsx`):
- Name, title, description
- Tech stack
- Social links

**Contact Page** (`src/pages/Contact.tsx`):
- Email, LinkedIn, GitHub links
- Contact methods

**Resume Page** (`src/pages/Resume.tsx`):
- Education, experience, skills
- PDF resume path

### Blog Posts
Add new blog posts in `src/pages/BlogPost.tsx`:

```typescript
const posts = {
  "your-post-id": {
    id: "your-post-id",
    title: "Your Post Title",
    date: "2024-01-15",
    category: "project" | "award",
    images: ["/assets/your-image.png"],
    tags: ["Tag1", "Tag2"],
    content: (
      <div className="prose prose-neutral prose-invert max-w-none">
        {/* Your content here */}
      </div>
    ),
  },
};
```

### GitHub Integration
The Projects page automatically fetches your repositories from GitHub. Update the username in `src/pages/Projects.tsx`:

```typescript
const response = await fetch('https://api.github.com/users/YOUR_USERNAME/repos?sort=updated&per_page=100');
```

### Color Scheme
The portfolio uses a purple and slate color scheme. Customize in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: colors.purple,
      // Add your custom colors
    },
  },
}
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (if using GitHub token)
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables in Netlify settings

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Run: `npm run deploy`

## 📝 GitHub API Rate Limiting

### Issue
The GitHub API has rate limits:
- **Without authentication**: 60 requests/hour
- **With authentication**: 5,000 requests/hour

### Solution
Add a GitHub Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `public_repo`
4. Copy the token
5. Add to `.env` file: `VITE_GITHUB_TOKEN=your_token`
6. Update the fetch call in `Projects.tsx`:

```typescript
const response = await fetch('https://api.github.com/users/ImanZahid/repos?sort=updated&per_page=100', {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
```

## 🎯 Key Features Explained

### Animated Background
The space-themed background features:
- 100 distant golden stars with glow effects
- 50 twinkling white stars
- 8 shooting stars
- 3 rotating nebula clouds
- 20 explosion particles
- 5 distant galaxies

All animations use Framer Motion for smooth 60fps performance.

### Swipeable Projects
The Projects page features:
- Drag/swipe gesture support
- 3 projects per page
- Smooth spring animations
- README content preview
- Star/fork counts
- Topic tags

### Blog System
The blog supports:
- Multiple post types (project, award)
- Image galleries
- External links
- Category badges
- Responsive images

## 🐛 Known Issues & Solutions

### No Projects Showing
**Cause**: GitHub API rate limit exceeded

**Solution**:
- Wait for rate limit to reset (1 hour)
- Add a GitHub Personal Access Token (see above)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/ImanZahid/portfolio/issues).

## 👤 Author

**Iman Zahid**
- Website: [imanzahid.com](https://imanzahid.com)
- GitHub: [@ImanZahid](https://github.com/ImanZahid)
- LinkedIn: [iman-zahid](https://www.linkedin.com/in/iman-zahid)
- Email: imanzahidzahid3@gmail.com

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---
