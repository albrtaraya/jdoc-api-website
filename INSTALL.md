# JDoc-API Installation Guide 🚀

Comprehensive installation and usage guide for JDoc-API - the modern JSON-based API documentation generator.

## 📋 Prerequisites

Before installing JDoc-API, ensure you have the following installed on your system:

### Required Software

| Software | Minimum Version | Recommended Version | Download Link |
|----------|----------------|-------------------|---------------|
| **Node.js** | 14.0.0 | 18.0.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 6.0.0 | 8.0.0+ | Included with Node.js |
| **Git** | 2.0.0 | Latest | [git-scm.com](https://git-scm.com/) |

### System Requirements

- **Memory**: 512 MB RAM minimum (1 GB+ recommended)
- **Storage**: 200 MB available disk space
- **Browser**: Chrome 80+, Firefox 75+, Safari 13+, or Edge 80+

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🔧 Installation Methods

### Method 1: Clone from Repository (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/jdoc-api.git

# Navigate to project directory
cd jdoc-api

# Install dependencies
npm install

# Start development server
npm run dev
```

### Method 2: Download ZIP

1. Download the ZIP file from GitHub
2. Extract to your desired location
3. Open terminal in the extracted folder
4. Run installation commands:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Method 3: Use Template

```bash
# Create new project using JDoc-API template
npx create-next-app@latest my-api-docs --template jdoc-api

# Navigate to project
cd my-api-docs

# Start development server
npm run dev
```

## 🎯 Quick Setup

After installation, follow these steps to get your documentation running:

### 1. Start Development Server

```bash
npm run dev
```

Your documentation will be available at: `http://localhost:3000`

### 2. Configure Your First API

Edit the file `config/example-get-users.ts` with your API details:

```typescript
export const MyFirstAPI = {
  title: "Get Users",
  description: "Retrieve a list of users from the system",
  method: "GET",
  urlDefinition: "https://your-api.com/api/v1/users",
  // ... rest of configuration
}
```

### 3. Update Sidebar Navigation

Edit `config/slidebar.ts` to include your new API:

```typescript
export const sections = [
  {
    id: "my-first-api",
    title: "My First API",
    config: MyFirstAPI
  },
  // ... other sections
]
```

## 📁 Project Structure

Understanding the project structure will help you customize your documentation:

```
jdoc-api/
├── 📁 app/                    # Next.js App Router
│   ├── 📄 layout.tsx         # Root layout
│   ├── 📄 page.tsx           # Home page
│   └── 📄 globals.css        # Global styles
├── 📁 components/             # React components
│   ├── 📁 ui/                # Reusable UI components
│   └── 📄 api-documentation.tsx # Main doc component
├── 📁 config/ ⭐             # API configurations (Edit these!)
│   ├── 📄 example-auth.ts    # Authentication example
│   ├── 📄 example-get-users.ts # GET endpoint example
│   ├── 📄 example-post-users.ts # POST endpoint example
│   ├── 📄 slidebar.ts        # Navigation configuration
│   └── 📄 get-started.ts     # Getting started content
├── 📁 hooks/                 # Custom React hooks
├── 📁 lib/                   # Utility functions
├── 📁 public/                # Static assets
└── 📁 styles/                # Additional stylesheets
```

## ⚙️ Configuration Guide

### API Configuration Schema

Each API endpoint is configured using this structure:

```typescript
export const YourAPIConfig = {
  // Basic Information
  title: "string",                    // API endpoint name
  description: "string",              // Detailed description
  method: "GET|POST|PUT|PATCH|DELETE", // HTTP method
  urlDefinition: "string",            // Full endpoint URL

  // Optional Headers
  headers: {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },

  // Requirements Array
  requirements: [
    { description: "Authentication required" },
    { description: "Valid email format" }
  ],

  // Valid Examples
  validExamples: [
    {
      title: "Success Case",
      description: "Example of successful request",
      bodySend: { /* request data */ },
      bodyResponse: { /* response data */ }
    }
  ],

  // Error Examples
  invalidExamples: [
    {
      title: "Error Case",
      description: "Example of failed request",
      bodySend: { /* invalid data */ },
      bodyResponse: { /* error response */ }
    }
  ],

  // Body Parameters
  characterJsonBodySend: [
    {
      field: "username",
      type: "string",
      required: true,
      description: ["User's login name"]
    }
  ],

  // URL Parameters
  characterJsonParamsSend: [
    {
      field: "id",
      type: "number",
      required: true,
      description: ["User ID"]
    }
  ]
}
```

### Field Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text data | "John Doe" |
| `number` | Numeric data | 123 |
| `boolean` | True/false | true |
| `object` | JSON object | {"key": "value"} |
| `array` | Array of items | [1, 2, 3] |

## 🎨 Customization

### Changing Colors and Theme

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#your-color',
          500: '#your-color',
          900: '#your-color',
        }
      }
    }
  }
}
```

### Custom Logo and Branding

1. Replace files in `public/` folder:
   - `favicon.ico` - Browser tab icon
   - `logo.svg` - Your company logo

2. Update `app/layout.tsx`:
   ```typescript
   export const metadata = {
     title: 'Your API Documentation',
     description: 'Your custom description',
   }
   ```

### Adding Custom CSS

Add custom styles to `app/globals.css`:

```css
/* Custom styles */
.custom-class {
  /* Your styles */
}
```

## 🚀 Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload `.next` folder to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d .next"

# Deploy
npm run build
npm run deploy
```

### Deploy to Your Server

```bash
# Build project
npm run build

# Copy .next folder to your server
# Configure nginx or apache to serve static files
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔧 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Use different port
npm run dev -- -p 3001
```

**Node version issues:**
```bash
# Use Node Version Manager
nvm install 18
nvm use 18
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Check TypeScript errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

### Performance Optimization

**Slow development server:**
- Close unnecessary browser tabs
- Disable browser extensions
- Increase system memory

**Large bundle size:**
- Remove unused dependencies
- Optimize images in `public/` folder
- Use dynamic imports for large components

## 🆘 Getting Help

### Documentation Resources

- **[Configuration Examples](config/)** - Real-world configuration examples
- **[Component Documentation](components/)** - React component usage
- **[API Reference](README.md)** - Full API documentation

### Community Support

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and share ideas
- **Email Support**: contact@jdoc-api.com

### Development Mode

For active development on JDoc-API itself:

```bash
# Clone repo
git clone https://github.com/yourusername/jdoc-api.git
cd jdoc-api

# Install dependencies
npm install

# Start development with hot reload
npm run dev

# Run tests
npm test

# Build and test production
npm run build
npm start
```

## 📚 Next Steps

1. **Configure your APIs** - Edit files in `config/` folder
2. **Customize appearance** - Modify theme and branding
3. **Add authentication** - Configure API keys and tokens
4. **Deploy to production** - Choose your hosting platform
5. **Share with team** - Send them the documentation URL

---

**Need help?** Check our [FAQ](README.md#faq) or [open an issue](https://github.com/yourusername/jdoc-api/issues).

**Ready to deploy?** See our [deployment guide](#-deployment) above.