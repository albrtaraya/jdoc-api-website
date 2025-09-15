export const DocumentationGuide = {
    title: "Documentation Guide",
    description: "Complete guide to creating API documentation and descriptive content with JDoc-API",
    content: [
        // Getting Started Section
        {
            type: "paragraph",
            content:
                "JDoc-API is a powerful, JSON-based API documentation generator that creates beautiful, interactive documentation for your REST APIs. With minimal setup and an intuitive configuration system, you can have professional-looking API docs running in minutes.",
        },
        {
            type: "paragraph",
            content:
                "This comprehensive guide will walk you through installation, configuration, and advanced features. By the end, you'll be able to create both API documentation and rich descriptive content pages with interactive code blocks.",
        },

        // Quick Installation
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

        // Prerequisites
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

        // System Requirements
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

        // Features List
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

        // API Configuration Documentation
        {
            type: "paragraph",
            content:
                "## API Configuration\n\nAPI configurations define individual endpoints with complete documentation including request/response examples, validation rules, and interactive testing capabilities. Each API endpoint follows a specific schema for consistent documentation.",
        },

        {
            type: "table",
            content: {
                headers: ["Field", "Type", "Description", "Required"],
                rows: [
                    ["title", "string", "Descriptive title of the endpoint or API", "Yes"],
                    ["description", "string", "Detailed description of the functionality", "Yes"],
                    ["method", "string", "HTTP method (GET, POST, PUT, DELETE, etc.)", "Yes"],
                    ["urlDefinition", "string", "Complete endpoint URL", "Yes"],
                    ["headers", "object", "Required headers for the request", "No"],
                    ["requirements", "array", "List of requirements and validations", "No"],
                    ["validExamples", "array", "Examples of successful requests", "Yes"],
                    ["invalidExamples", "array", "Examples of requests with errors", "No"],
                    ["characterJsonBodySend", "array", "Field definitions for request body", "No"],
                    ["characterJsonParamsSend", "array", "Field definitions for URL parameters", "No"],
                ],
            },
        },

        // Complete API Example
        {
            type: "code",
            content: {
                title: "Complete API Configuration Example",
                description: "A comprehensive example showing all configuration options:",
                label: "TypeScript Configuration",
                code: `export const CompleteAPIExample = {
  // Basic Information
  title: "Create User Account",
  description: "Create a new user account with validation and authentication",
  method: "POST",
  urlDefinition: "https://api.example.com/v1/users",

  // Optional Headers
  headers: {
    "Authorization": "Bearer your-api-token",
    "Content-Type": "application/json",
    "X-API-Version": "v1"
  },

  // Requirements Array
  requirements: [
    { description: "Valid authentication token with admin privileges" },
    { description: "Email must be unique and valid format" },
    { description: "Password must meet security requirements" }
  ],

  // Valid Examples
  validExamples: [
    {
      title: "Successful User Creation",
      description: "Create a new user with all required fields",
      bodySend: {
        name: "John Doe",
        email: "john@example.com",
        password: "securePassword123",
        role: "user"
      },
      bodyResponse: {
        success: true,
        data: {
          user: {
            id: "user_123",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            createdAt: "2024-01-15T10:30:00Z"
          }
        },
        message: "User created successfully"
      }
    }
  ],

  // Error Examples
  invalidExamples: [
    {
      title: "Validation Error",
      description: "Invalid email format error",
      bodySend: {
        name: "John Doe",
        email: "invalid-email",
        password: "securePassword123"
      },
      bodyResponse: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid email format",
          field: "email",
          statusCode: 400
        }
      }
    }
  ],

  // Body Parameters Definition
  characterJsonBodySend: [
    {
      field: "name",
      type: "string",
      required: true,
      description: ["User's full name", "Must be at least 2 characters"]
    },
    {
      field: "email",
      type: "string",
      required: true,
      description: ["Valid email address", "Must be unique in system"]
    },
    {
      field: "password",
      type: "string",
      required: true,
      description: ["Minimum 8 characters", "Must include letters and numbers"]
    },
    {
      field: "role",
      type: "string",
      required: false,
      description: ["User role in system", "Defaults to 'user'"]
    }
  ],

  // URL Parameters (for endpoints with path params)
  characterJsonParamsSend: []
}`
            }
        },

        // Field Properties Table
        {
            type: "table",
            content: {
                headers: ["Field Property", "Type", "Description", "Default"],
                rows: [
                    ["field", "string", "Name of the field parameter", "Required"],
                    ["type", "string", "Data type (string, number, boolean, object, array)", "Required"],
                    ["required", "boolean", "Whether the field is mandatory", "true"],
                    ["description", "array", "Array of descriptive strings for the field", "Required"],
                    ["characterJsonBodySend", "array", "Nested fields for object types", "Optional"],
                    ["characterJsonParamsSend", "array", "Nested parameters for complex structures", "Optional"],
                ],
            },
        },

        // HTTP Methods Table
        {
            type: "table",
            content: {
                headers: ["HTTP Method", "Use Case", "Body Required", "Parameters"],
                rows: [
                    ["GET", "Retrieve data", "No", "Query parameters for filtering"],
                    ["POST", "Create new resource", "Yes", "Usually none"],
                    ["PUT", "Update entire resource", "Yes", "Resource ID in URL"],
                    ["PATCH", "Partial update", "Yes", "Resource ID in URL"],
                    ["DELETE", "Remove resource", "No", "Resource ID in URL"],
                ],
            },
        },

        // Descriptive Content Documentation
        {
            type: "paragraph",
            content:
                "## Descriptive Content Configuration\n\nDescriptive content configurations are used for non-API documentation pages such as getting started guides, tutorials, installation instructions, and general documentation. These focus on presenting information with rich content types.",
        },

        {
            type: "table",
            content: {
                headers: ["Content Type", "Purpose", "Use Cases", "Interactive"],
                rows: [
                    ["paragraph", "Text content", "Descriptions, explanations, introductions", "No"],
                    ["table", "Structured data", "Requirements, comparisons, specifications", "No"],
                    ["list", "Bullet points", "Features, steps, benefits", "No"],
                    ["code", "Code blocks", "Commands, configurations, examples", "Yes - Copy button"],
                ],
            },
        },

        // Basic Descriptive Structure
        {
            type: "code",
            content: {
                title: "Basic Descriptive Configuration Structure",
                description: "The fundamental structure for creating descriptive content:",
                label: "TypeScript Structure",
                code: `export const MyDocumentationPage = {
  // Page Information
  title: "Page Title",
  description: "Brief description of the page content",

  // Content Array
  content: [
    {
      type: "paragraph",
      content: "Your text content here..."
    },
    {
      type: "table",
      content: {
        headers: ["Column 1", "Column 2", "Column 3"],
        rows: [
          ["Row 1 Data", "Row 1 Data", "Row 1 Data"],
          ["Row 2 Data", "Row 2 Data", "Row 2 Data"]
        ]
      }
    },
    {
      type: "list",
      content: {
        items: [
          "First item",
          "Second item",
          "Third item"
        ]
      }
    },
    {
      type: "code",
      content: {
        title: "Code Block Title",
        description: "Description of the code",
        label: "Language/Type",
        code: "Your code content here..."
      }
    }
  ]
}`
            }
        },

        // Interactive Code Blocks Documentation
        {
            type: "paragraph",
            content:
                "## Interactive Code Blocks\n\nThe 'code' content type provides interactive code blocks with one-click copying functionality, perfect for installation commands, configuration examples, and code snippets that users need to copy and use.",
        },

        {
            type: "table",
            content: {
                headers: ["Property", "Type", "Required", "Purpose", "Example"],
                rows: [
                    ["title", "string", "No", "Section heading", "Installation Steps"],
                    ["description", "string", "No", "Context explanation", "Follow these commands to..."],
                    ["label", "string", "No", "Code type/language", "Terminal, JavaScript, JSON"],
                    ["code", "string", "Yes", "Actual code content", "npm install package-name"],
                ],
            },
        },

        // Code Block Examples
        {
            type: "code",
            content: {
                title: "Code Block Structure",
                description: "The structure of an interactive code block:",
                label: "TypeScript Structure",
                code: `{
  type: "code",
  content: {
    title?: string,        // Optional heading for the code block
    description?: string,  // Optional explanation of the code
    label?: string,       // Optional label (e.g., "Terminal", "JavaScript")
    code: string          // The actual code content (required)
  }
}`
            }
        },

        // Configuration Examples
        {
            type: "paragraph",
            content:
                "## Configuration Examples\n\nBelow are practical examples that you can copy and modify for your own documentation:",
        },

        // Simple GET API Example
        {
            type: "code",
            content: {
                title: "Simple GET API Example",
                description: "Basic GET endpoint with query parameters:",
                label: "GET API Configuration",
                code: `export const GetUsersAPI = {
  title: "Get Users List",
  description: "Retrieve a paginated list of users with optional filtering",
  method: "GET",
  urlDefinition: "https://api.example.com/v1/users",
  headers: {
    "Authorization": "Bearer your-api-token"
  },
  requirements: [
    { description: "Valid authentication token required" }
  ],
  validExamples: [
    {
      title: "Get users with pagination",
      description: "Retrieve first 10 users",
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

        // Your First API Configuration
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

        // Development Workflow
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

        // Deployment Instructions
        {
            type: "paragraph",
            content:
                "## Production Deployment\n\nFor production deployment, build and deploy your documentation to various hosting platforms:",
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

        // Best Practices
        {
            type: "paragraph",
            content:
                "## Best Practices\n\nFollow these guidelines to create effective documentation:",
        },
        {
            type: "list",
            content: {
                items: [
                    "Keep code blocks focused on a single concept or task",
                    "Use descriptive titles that explain the purpose",
                    "Include helpful comments in complex code examples",
                    "Choose appropriate labels that indicate the code type",
                    "Test all code examples to ensure they work correctly",
                    "Use realistic data in examples, not placeholder text",
                    "Provide both success and error scenarios for API endpoints",
                    "Keep documentation up-to-date with your actual API behavior",
                    "Use clear, descriptive titles and descriptions",
                    "Mix content types to create engaging documentation",
                ],
            },
        },

        // Final Notes
        {
            type: "paragraph",
            content:
                "The /config folder contains several example files to help you get started quickly. Each file demonstrates different aspects of API documentation, from simple GET requests to complex POST operations with authentication. Copy these examples and modify them to match your specific API requirements.",
        },
    ],
}