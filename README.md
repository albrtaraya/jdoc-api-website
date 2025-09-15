# JDoc-API Documentation Template 

**Professional JSON-based API Documentation Generator**

JDoc-API is a modern, interactive API documentation platform that transforms your JSON configurations into beautiful, functional documentation websites. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and developer experience.

## ✨ Features

- **🚀 Zero Configuration** - Works out of the box with sensible defaults
- **⚡ Hot Reload** - Instant preview of documentation changes
- **🎯 Interactive Testing** - Test API endpoints directly from the docs
- **📱 Responsive Design** - Perfect on desktop, tablet, and mobile
- **🎨 Beautiful UI** - Clean, modern interface with syntax highlighting
- **🔄 Multi-language Support** - Code examples in HTTP, JavaScript, PHP, Python, Go
- **📋 Copy-to-Clipboard** - One-click copying for all code examples
- **🔧 Customizable** - Easy theming and branding options
- **⚡ Fast Performance** - Optimized build with Next.js

## 🖥️ Live Demo

Check out the [live demo](https://github.com/JTemplates/JDoc-API) to see JDoc-API in action.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/JTemplates/JDoc-API.git
cd jdoc-api

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📖 Documentation

- **[Installation Guide](INSTALL.md)** - Complete setup and configuration instructions
- **[Configuration Guide](config/configuration-files.ts)** - Learn how to configure your API documentation
- **[Examples](config/)** - Ready-to-use examples for different API types

## 🏗️ Project Structure

```
jdoc-api/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── api-documentation.tsx # Main documentation component
├── config/             # API documentation configurations
│   ├── example-auth.ts         # Authentication endpoint
│   ├── example-get-users.ts    # GET users endpoint
│   ├── example-post-users.ts   # POST users endpoint
│   ├── example-put-users.ts    # PUT users endpoint
│   ├── example-patch-users.ts  # PATCH users endpoint
│   ├── example-delete-users.ts # DELETE users endpoint
│   ├── get-started.ts          # Getting started content
│   └── configuration-files.ts  # Configuration documentation
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles
```

## ⚙️ Configuration

JDoc-API uses a simple JSON-based configuration system. Each API endpoint is defined in a TypeScript file with the following structure:

```typescript
export const ExampleAPI = {
  title: "API Endpoint Name",
  description: "Detailed description of what this endpoint does",
  method: "POST",
  urlDefinition: "https://api.example.com/v1/endpoint",
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
      description: "Example of a valid request",
      bodySend: { name: "John Doe" },
      bodyResponse: { success: true, id: 123 }
    }
  ],
  invalidExamples: [
    {
      title: "Invalid Request",
      description: "Example of an invalid request",
      bodySend: { invalid: "data" },
      bodyResponse: { error: "Validation failed" }
    }
  ],
  characterJsonBodySend: [
    {
      field: "name",
      type: "string",
      required: true,
      description: ["User's full name"]
    }
  ],
  characterJsonParamsSend: []
}
```

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Shadcn/ui](https://ui.shadcn.com/)** - High-quality components

## 📋 Requirements

- **Node.js** 14.0.0 or higher (18.0.0+ recommended)
- **npm** 6.0.0 or higher (8.0.0+ recommended)
- **Modern web browser** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy the .next folder to Netlify
```

### Deploy to GitHub Pages

```bash
# Build static export
npm run build
npm run export

# Deploy the out/ folder to GitHub Pages
```

## 🎨 Customization

### Themes

JDoc-API supports custom themes through Tailwind CSS. Modify the theme configuration in `tailwind.config.js` to match your brand colors and styling preferences.

### Branding

Update the following files to customize branding:
- `app/layout.tsx` - Page title and metadata
- `components/api-documentation.tsx` - Header and navigation
- `public/` - Add your logo and favicon

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/JTemplates/JDoc-API/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JTemplates/JDoc-API/discussions)
- **Documentation**: [Full Documentation](https://github.com/JTemplates/JDoc-API)

## 🙏 Acknowledgments

- [Shadcn](https://twitter.com/shadcn) for the amazing UI components
- [Vercel](https://vercel.com) for hosting and deployment platform
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- The open-source community for inspiration and feedback

---

**Built with ❤️ by [Albert Araya](https://github.com/darthstack)**

*Star ⭐ this repo if you find it helpful!*