export const GettingStarted = {
  title: "Getting Started",
  description: "Quick start guide to set up and use JDoc-API for your API documentation",
  content: [
    {
      type: "paragraph",
      content:
        "JDoc-API is a powerful, JSON-based API documentation generator that creates beautiful, interactive documentation for your REST APIs. With minimal setup and an intuitive configuration system, you can have professional-looking API docs running in minutes.",
    },
    {
      type: "paragraph",
      content:
        "This guide will walk you through the installation process, initial setup, and your first API documentation configuration. By the end of this tutorial, you'll have a fully functional documentation site with interactive examples that your developers can use immediately.",
    },
    {
      type: "code",
      content: {
        title: "Quick Installation",
        description: "Follow these commands to get JDoc-API running in minutes:",
        label: "Terminal Commands",
        code: `# Clone the repository
git clone https://github.com/yourusername/jdoc-api.git
cd jdoc-api

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser`
      }
    },
    {
      type: "list",
      content: {
        items: [
          "Zero configuration required - works out of the box",
          "Hot reload development server for instant preview",
          "Interactive API testing directly in the documentation",
          "Responsive design that works on desktop, tablet, and mobile",
          "Support for multiple APIs and endpoint configurations",
          "Automatic code generation for multiple programming languages",
          "Built-in syntax highlighting and JSON validation",
          "Customizable themes and branding options",
        ],
      },
    },
    {
      type: "paragraph",
      content:
        "Prerequisites: Make sure you have Node.js (version 14 or higher) and npm installed on your system. You can verify your installation using the commands below:",
    },
    {
      type: "code",
      content: {
        title: "Verify Prerequisites",
        description: "Check if you have the required software installed:",
        label: "Verification Commands",
        code: `# Check Node.js version (should be 14.0.0 or higher)
node --version

# Check npm version (should be 6.0.0 or higher)
npm --version

# Check Git version
git --version`
      }
    },
    {
      type: "table",
      content: {
        headers: ["Requirement", "Minimum Version", "Recommended Version"],
        rows: [
          ["Node.js", "14.0.0", "18.0.0 or higher"],
          ["npm", "6.0.0", "8.0.0 or higher"],
          ["Browser", "Chrome 80+", "Latest version"],
          ["Memory", "512 MB RAM", "1 GB RAM or more"],
        ],
      },
    },
    {
      type: "paragraph",
      content:
        "After running 'npm run dev', your documentation site will be available at http://localhost:3000. The development server includes hot reload functionality, so any changes you make to your configuration files will be automatically reflected in the browser without requiring a manual refresh.",
    },
    {
      type: "code",
      content: {
        title: "Configure Your First API",
        description: "Create your first API documentation by editing the configuration files:",
        label: "Example Configuration",
        code: `// config/my-first-api.ts
export const MyFirstAPI = {
  title: "Get Users",
  description: "Retrieve a list of users from the system",
  method: "GET",
  urlDefinition: "https://your-api.com/api/v1/users",
  headers: {
    Authorization: "Bearer your-token",
    "Content-Type": "application/json"
  },
  requirements: [
    { description: "Valid authentication token required" }
  ],
  validExamples: [
    {
      title: "Successful Request",
      description: "Get users with pagination",
      bodySend: null,
      bodyResponse: {
        success: true,
        data: {
          users: [
            {
              id: "user_123",
              name: "John Doe",
              email: "john@example.com"
            }
          ],
          pagination: {
            currentPage: 1,
            totalPages: 5,
            totalUsers: 47
          }
        }
      }
    }
  ],
  invalidExamples: [],
  characterJsonBodySend: [],
  characterJsonParamsSend: [
    {
      field: "page",
      type: "number",
      required: false,
      description: ["Page number for pagination"]
    },
    {
      field: "limit",
      type: "number",
      required: false,
      description: ["Number of users per page"]
    }
  ]
}`
      }
    },
    {
      type: "list",
      content: {
        items: [
          "Navigate to the /config folder to find example configurations",
          "Start by modifying the existing API examples to match your endpoints",
          "Use the built-in validation to ensure your JSON configuration is correct",
          "Preview your changes instantly with the development server",
          "Test your API endpoints directly from the documentation interface",
          "Customize the appearance using the theme configuration files",
          "Deploy your documentation using 'npm run build' when ready",
        ],
      },
    },
    {
      type: "paragraph",
      content:
        "The /config folder contains several example files to help you get started quickly. Each file demonstrates different aspects of API documentation, from simple GET requests to complex POST operations with authentication. Copy these examples and modify them to match your specific API requirements.",
    },
    {
      type: "paragraph",
      content:
        "For production deployment, run 'npm run build' to generate optimized static files. Here are the most common deployment commands:",
    },
    {
      type: "code",
      content: {
        title: "Production Deployment",
        description: "Build and deploy your documentation to production:",
        label: "Deployment Commands",
        code: `# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (recommended)
npm i -g vercel
vercel login
vercel

# Deploy to Netlify
# 1. Build: npm run build
# 2. Upload .next folder to Netlify
# 3. Set build command: npm run build
# 4. Set publish directory: .next

# Deploy to GitHub Pages
npm install --save-dev gh-pages
# Add to package.json: "deploy": "gh-pages -d .next"
npm run deploy`
      }
    },
  ],
}