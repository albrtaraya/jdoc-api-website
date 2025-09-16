export const ConfigurationFiles = {
    title: "Configuration Guide",
    description: "Comprehensive guide to configure your API documentation with JDoc-API. Learn how to create powerful, interactive API documentation using JSON-based configurations.",
    content: [
        // Introduction
        {
            type: "paragraph",
            content:
                "JDoc-API uses a simple but powerful configuration system that allows you to create beautiful API documentation through TypeScript configuration files. This guide will walk you through every aspect of configuration, from basic API endpoints to advanced features.",
        },
        {
            type: "paragraph",
            content:
                "All configuration files are located in the `/config` directory and follow a consistent schema that makes it easy to document REST APIs, authentication flows, and descriptive content pages.",
        },

        // Project Structure
        {
            type: "paragraph",
            content:
                "## Project Configuration Structure\n\nUnderstanding the project structure is essential for effective configuration:",
        },
        {
            type: "code",
            content: {
                title: "Configuration File Structure",
                description: "Overview of how configuration files are organized:",
                label: "Project Structure",
                code: `config/
├── 📄 configuration-files.ts    # This guide (configuration documentation)
├── 📄 documentation-guide.ts    # General documentation guide
├── 📄 get-started.ts           # Getting started content
├── 📄 slidebar.ts              # Navigation menu configuration
├── 📄 header.ts                # Header configuration
├── 📁 examples/                # API endpoint examples
│   ├── 📄 example-auth.ts      # Authentication example
│   ├── 📄 example-get-users.ts # GET endpoint example
│   ├── 📄 example-post-users.ts# POST endpoint example
│   ├── 📄 example-put-users.ts # PUT endpoint example
│   ├── 📄 example-patch-users.ts# PATCH endpoint example
│   └── 📄 example-delete-users.ts# DELETE endpoint example
└── 📁 your-apis/               # Your custom API configurations
    ├── 📄 my-api-endpoint.ts   # Your API endpoints
    └── 📄 my-content-page.ts   # Your content pages`
            }
        },

        // Configuration Types
        {
            type: "paragraph",
            content:
                "## Configuration Types\n\nJDoc-API supports two main types of configurations:",
        },
        {
            type: "table",
            content: {
                headers: ["Configuration Type", "Purpose", "Use Cases", "Key Features"],
                rows: [
                    [
                        "API Configuration",
                        "Document REST API endpoints",
                        "GET, POST, PUT, PATCH, DELETE endpoints",
                        "Interactive testing, code examples, validation"
                    ],
                    [
                        "Descriptive Configuration",
                        "Create content pages",
                        "Guides, tutorials, installation instructions",
                        "Rich content types, code blocks, tables"
                    ],
                ],
            },
        },

        // API Configuration Schema
        {
            type: "paragraph",
            content:
                "## API Configuration Schema\n\nAPI configurations follow a specific schema for documenting REST endpoints:",
        },
        {
            type: "table",
            content: {
                headers: ["Property", "Type", "Required", "Description"],
                rows: [
                    ["title", "string", "✅", "Descriptive name for the API endpoint"],
                    ["description", "string", "✅", "Detailed explanation of what the endpoint does"],
                    ["method", "string", "✅", "HTTP method (GET, POST, PUT, PATCH, DELETE)"],
                    ["urlDefinition", "string", "✅", "Complete endpoint URL with domain"],
                    ["headers", "object", "❌", "Required headers (Authorization, Content-Type, etc.)"],
                    ["requirements", "array", "❌", "Prerequisites and validation rules"],
                    ["validExamples", "array", "✅", "Examples of successful requests"],
                    ["invalidExamples", "array", "❌", "Examples of error responses"],
                    ["characterJsonBodySend", "array", "❌", "Request body parameter definitions"],
                    ["characterJsonParamsSend", "array", "❌", "URL/Query parameter definitions"],
                ],
            },
        },

        // Complete API Configuration Example
        {
            type: "code",
            content: {
                title: "Complete API Configuration Template",
                description: "A comprehensive template showing all available configuration options:",
                label: "TypeScript Configuration",
                code: `export const YourAPIEndpoint = {
  // Basic Information (Required)
  title: "Your API Endpoint Title",
  description: "Detailed description of what this endpoint does and its purpose in your system",
  method: "POST", // GET, POST, PUT, PATCH, DELETE
  urlDefinition: "https://api.yourdomin.com/v1/endpoint",

  // Optional Headers
  headers: {
    "Authorization": "Bearer your-api-token",
    "Content-Type": "application/json",
    "X-API-Version": "v1",
    "X-Custom-Header": "custom-value"
  },

  // Requirements and Validation Rules
  requirements: [
    { description: "Valid authentication token with appropriate permissions" },
    { description: "Request body must include all required fields" },
    { description: "Data must pass validation rules" }
  ],

  // Valid Examples (Required)
  validExamples: [
    {
      title: "Successful Request Example",
      description: "Example of a successful request with all required fields",
      bodySend: {
        field1: "example value",
        field2: 12345,
        field3: true
      },
      bodyResponse: {
        success: true,
        data: {
          id: "generated_id_123",
          field1: "example value",
          field2: 12345,
          field3: true,
          createdAt: "2024-01-15T10:30:00Z"
        },
        message: "Resource created successfully"
      }
    },
    {
      title: "Alternative Success Case",
      description: "Another valid scenario with optional parameters",
      bodySend: {
        field1: "alternative value",
        field2: 67890,
        optionalField: "optional data"
      },
      bodyResponse: {
        success: true,
        data: {
          id: "generated_id_456",
          field1: "alternative value",
          field2: 67890,
          optionalField: "optional data",
          createdAt: "2024-01-15T11:45:00Z"
        },
        message: "Resource created with optional data"
      }
    }
  ],

  // Error Examples (Optional but Recommended)
  invalidExamples: [
    {
      title: "Validation Error",
      description: "Error when required fields are missing or invalid",
      bodySend: {
        field1: "", // Invalid: empty string
        field2: "invalid", // Invalid: should be number
      },
      bodyResponse: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed for required fields",
          details: [
            { field: "field1", error: "Field cannot be empty" },
            { field: "field2", error: "Must be a valid number" }
          ],
          statusCode: 400
        }
      }
    },
    {
      title: "Authentication Error",
      description: "Error when authentication token is invalid or missing",
      bodySend: {
        field1: "valid value",
        field2: 12345
      },
      bodyResponse: {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid or missing authentication token",
          statusCode: 401
        }
      }
    }
  ],

  // Request Body Parameters
  characterJsonBodySend: [
    {
      field: "field1",
      type: "string",
      required: true,
      description: ["Primary identifier field", "Must be unique", "Minimum 3 characters"]
    },
    {
      field: "field2",
      type: "number",
      required: true,
      description: ["Numeric value", "Must be positive integer"]
    },
    {
      field: "field3",
      type: "boolean",
      required: true,
      description: ["Boolean flag for feature toggle"]
    },
    {
      field: "optionalField",
      type: "string",
      required: false,
      description: ["Optional additional data", "Can be empty or null"]
    },
    {
      field: "nestedObject",
      type: "object",
      required: false,
      description: ["Complex nested object"],
      characterJsonBodySend: [
        {
          field: "nestedField1",
          type: "string",
          required: true,
          description: ["Field within nested object"]
        },
        {
          field: "nestedField2",
          type: "array",
          required: false,
          description: ["Array of values within nested object"]
        }
      ]
    }
  ],

  // URL/Query Parameters
  characterJsonParamsSend: [
    {
      field: "id",
      type: "string",
      required: true,
      description: ["Resource ID in URL path"]
    },
    {
      field: "page",
      type: "number",
      required: false,
      description: ["Page number for pagination", "Default: 1"]
    },
    {
      field: "limit",
      type: "number",
      required: false,
      description: ["Items per page", "Default: 10", "Maximum: 100"]
    },
    {
      field: "search",
      type: "string",
      required: false,
      description: ["Search query for filtering results"]
    }
  ]
}`
            }
        },

        // Field Properties Detail
        {
            type: "paragraph",
            content:
                "## Field Properties Reference\n\nUnderstanding field properties is crucial for accurate parameter documentation:",
        },
        {
            type: "table",
            content: {
                headers: ["Property", "Type", "Purpose", "Example Values"],
                rows: [
                    ["field", "string", "Parameter name", "username, email, id"],
                    ["type", "string", "Data type", "string, number, boolean, object, array"],
                    ["required", "boolean", "Is parameter mandatory", "true, false"],
                    ["description", "string[]", "Array of descriptive text", '["User email address", "Must be unique"]'],
                    ["characterJsonBodySend", "array", "Nested fields for objects", "Used for complex object parameters"],
                    ["characterJsonParamsSend", "array", "Nested parameters", "Used for complex query structures"],
                ],
            },
        },

        // Data Types Guide
        {
            type: "paragraph",
            content:
                "## Supported Data Types\n\nJDoc-API supports all standard JSON data types with proper validation:",
        },
        {
            type: "table",
            content: {
                headers: ["Type", "Description", "Example Values", "Validation"],
                rows: [
                    ["string", "Text data", '"John Doe", "user@example.com"', "Length, format, regex patterns"],
                    ["number", "Numeric data", "123, 45.67, -89", "Min/max values, integer constraints"],
                    ["boolean", "True/false values", "true, false", "Strict boolean validation"],
                    ["object", "JSON objects", '{"key": "value"}', "Nested field validation"],
                    ["array", "Arrays of items", '[1, 2, 3], ["a", "b"]', "Item type and length validation"],
                ],
            },
        },

        // HTTP Methods Guide
        {
            type: "paragraph",
            content:
                "## HTTP Methods Configuration\n\nDifferent HTTP methods have different configuration patterns:",
        },
        {
            type: "table",
            content: {
                headers: ["Method", "Purpose", "Body Required", "Parameters", "Common Use Cases"],
                rows: [
                    ["GET", "Retrieve data", "No", "Query params", "Fetch users, search, pagination"],
                    ["POST", "Create resource", "Yes", "None usually", "Create user, submit form"],
                    ["PUT", "Replace resource", "Yes", "ID in URL", "Update entire user profile"],
                    ["PATCH", "Partial update", "Yes", "ID in URL", "Update specific fields"],
                    ["DELETE", "Remove resource", "No", "ID in URL", "Delete user, remove item"],
                ],
            },
        },

        // GET Endpoint Example
        {
            type: "code",
            content: {
                title: "GET Endpoint Configuration",
                description: "Template for GET endpoints with query parameters:",
                label: "GET Configuration",
                code: `export const GetEndpointExample = {
  title: "Get Resource List",
  description: "Retrieve a paginated list of resources with filtering options",
  method: "GET",
  urlDefinition: "https://api.example.com/v1/resources",
  headers: {
    "Authorization": "Bearer token"
  },
  requirements: [
    { description: "Valid authentication required" }
  ],
  validExamples: [
    {
      title: "Get with pagination",
      description: "Retrieve first page of results",
      bodySend: null, // GET requests don't have body
      bodyResponse: {
        success: true,
        data: {
          items: [
            { id: 1, name: "Resource 1" },
            { id: 2, name: "Resource 2" }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 25
          }
        }
      }
    }
  ],
  invalidExamples: [],
  characterJsonBodySend: [], // Empty for GET
  characterJsonParamsSend: [
    {
      field: "page",
      type: "number",
      required: false,
      description: ["Page number", "Default: 1"]
    },
    {
      field: "limit",
      type: "number",
      required: false,
      description: ["Items per page", "Default: 10"]
    }
  ]
}`
            }
        },

        // POST Endpoint Example
        {
            type: "code",
            content: {
                title: "POST Endpoint Configuration",
                description: "Template for POST endpoints with request body:",
                label: "POST Configuration",
                code: `export const PostEndpointExample = {
  title: "Create Resource",
  description: "Create a new resource with provided data",
  method: "POST",
  urlDefinition: "https://api.example.com/v1/resources",
  headers: {
    "Authorization": "Bearer token",
    "Content-Type": "application/json"
  },
  requirements: [
    { description: "All required fields must be provided" },
    { description: "Data must pass validation" }
  ],
  validExamples: [
    {
      title: "Create new resource",
      description: "Successful resource creation",
      bodySend: {
        name: "New Resource",
        description: "Resource description",
        category: "general"
      },
      bodyResponse: {
        success: true,
        data: {
          id: "resource_123",
          name: "New Resource",
          description: "Resource description",
          category: "general",
          createdAt: "2024-01-15T10:30:00Z"
        }
      }
    }
  ],
  invalidExamples: [
    {
      title: "Missing required field",
      description: "Error when name is missing",
      bodySend: {
        description: "Resource description"
        // name is missing
      },
      bodyResponse: {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Name is required",
          statusCode: 400
        }
      }
    }
  ],
  characterJsonBodySend: [
    {
      field: "name",
      type: "string",
      required: true,
      description: ["Resource name", "Must be unique"]
    },
    {
      field: "description",
      type: "string",
      required: false,
      description: ["Optional description"]
    },
    {
      field: "category",
      type: "string",
      required: true,
      description: ["Resource category", "Must be valid category"]
    }
  ],
  characterJsonParamsSend: []
}`
            }
        },

        // Descriptive Configuration Schema
        {
            type: "paragraph",
            content:
                "## Descriptive Configuration Schema\n\nDescriptive configurations are used for content pages like guides, tutorials, and documentation:",
        },
        {
            type: "table",
            content: {
                headers: ["Property", "Type", "Required", "Description"],
                rows: [
                    ["title", "string", "✅", "Page title displayed in navigation"],
                    ["description", "string", "✅", "Brief description of the page content"],
                    ["content", "array", "✅", "Array of content items with different types"],
                ],
            },
        },

        // Content Types Reference
        {
            type: "paragraph",
            content:
                "## Content Types Reference\n\nDescriptive configurations support multiple content types for rich documentation:",
        },
        {
            type: "table",
            content: {
                headers: ["Content Type", "Purpose", "Properties", "Interactive Features"],
                rows: [
                    ["paragraph", "Text content", "content (string)", "None"],
                    ["table", "Structured data", "headers (array), rows (array)", "None"],
                    ["list", "Bullet points", "items (array)", "None"],
                    ["code", "Code blocks", "title, description, label, code", "Copy to clipboard"],
                ],
            },
        },

        // Descriptive Configuration Example
        {
            type: "code",
            content: {
                title: "Complete Descriptive Configuration",
                description: "Template for creating rich content pages:",
                label: "Descriptive Configuration",
                code: `export const YourContentPage = {
  title: "Your Content Page Title",
  description: "Brief description of what this page covers",
  content: [
    // Paragraph Content
    {
      type: "paragraph",
      content: "This is a paragraph of text that provides information. You can use markdown formatting like **bold**, *italic*, and even code snippets with backticks."
    },

    // Table Content
    {
      type: "table",
      content: {
        headers: ["Column 1", "Column 2", "Column 3"],
        rows: [
          ["Row 1 Data", "Row 1 Data", "Row 1 Data"],
          ["Row 2 Data", "Row 2 Data", "Row 2 Data"],
          ["Row 3 Data", "Row 3 Data", "Row 3 Data"]
        ]
      }
    },

    // List Content
    {
      type: "list",
      content: {
        items: [
          "First list item with important information",
          "Second list item explaining a concept",
          "Third list item with additional details",
          "Fourth list item for completeness"
        ]
      }
    },

    // Code Block Content
    {
      type: "code",
      content: {
        title: "Installation Commands", // Optional
        description: "Run these commands to install dependencies", // Optional
        label: "Terminal Commands", // Optional
        code: \`# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build\`
      }
    },

    // Another paragraph
    {
      type: "paragraph",
      content: "You can mix and match content types to create engaging documentation. Code blocks automatically include a copy-to-clipboard button for user convenience."
    },

    // Code block without optional properties
    {
      type: "code",
      content: {
        code: \`// Simple code block
const example = {
  key: "value",
  number: 123,
  boolean: true
};\`
      }
    }
  ]
}`
            }
        },

        // Navigation Configuration
        {
            type: "paragraph",
            content:
                "## Navigation Configuration (slidebar.ts)\n\nThe slidebar.ts file controls the navigation menu structure:",
        },
        {
            type: "code",
            content: {
                title: "Navigation Configuration",
                description: "How to configure the sidebar navigation menu:",
                label: "slidebar.ts",
                code: `import { YourAPIConfig } from "./your-api-config";
import { YourContentPage } from "./your-content-page";

export const Slidebar = [
  // Descriptive Content Section
  {
    id: "getting-started",
    title: "Getting Started",
    type: "section",
    descriptiveConfig: YourContentPage, // For content pages
  },

  // API Group Section
  {
    id: "api-endpoints",
    title: "API Endpoints",
    type: "group",
    children: [
      {
        id: "your-endpoint",
        title: "Your API Endpoint",
        config: YourAPIConfig, // For API endpoints
      },
      {
        id: "another-endpoint",
        title: "Another Endpoint",
        config: AnotherAPIConfig,
      }
    ],
  }
]`
            }
        },

        // Best Practices
        {
            type: "paragraph",
            content:
                "## Configuration Best Practices\n\nFollow these guidelines for effective API documentation:",
        },
        {
            type: "list",
            content: {
                items: [
                    "Use descriptive titles that clearly explain the endpoint purpose",
                    "Provide comprehensive descriptions that include business context",
                    "Include realistic example data, not placeholder values like 'string' or 123",
                    "Document both success and error scenarios with proper status codes",
                    "Use consistent naming conventions across all configurations",
                    "Include all required headers, especially authentication",
                    "Validate your JSON structure before deployment",
                    "Keep descriptions concise but complete",
                    "Use appropriate data types for all parameters",
                    "Test your endpoints match the documented examples",
                ],
            },
        },

        // Common Patterns
        {
            type: "paragraph",
            content:
                "## Common Configuration Patterns\n\nRecognize and use these common patterns in your configurations:",
        },

        // Authentication Pattern
        {
            type: "code",
            content: {
                title: "Authentication Pattern",
                description: "Standard authentication configuration:",
                label: "Authentication Headers",
                code: `headers: {
  "Authorization": "Bearer your-api-token",
  "Content-Type": "application/json",
  "X-API-Version": "v1"
},
requirements: [
  { description: "Valid authentication token required" },
  { description: "Token must have appropriate permissions" }
]`
            }
        },

        // Pagination Pattern
        {
            type: "code",
            content: {
                title: "Pagination Pattern",
                description: "Standard pagination parameter configuration:",
                label: "Pagination Parameters",
                code: `characterJsonParamsSend: [
  {
    field: "page",
    type: "number",
    required: false,
    description: ["Page number", "Default: 1", "Minimum: 1"]
  },
  {
    field: "limit",
    type: "number",
    required: false,
    description: ["Items per page", "Default: 10", "Maximum: 100"]
  },
  {
    field: "search",
    type: "string",
    required: false,
    description: ["Search query for filtering results"]
  }
]`
            }
        },

        // Error Response Pattern
        {
            type: "code",
            content: {
                title: "Error Response Pattern",
                description: "Standard error response structure:",
                label: "Error Response",
                code: `bodyResponse: {
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable error message",
    details: [ // Optional detailed validation errors
      {
        field: "fieldName",
        error: "Specific field error message"
      }
    ],
    statusCode: 400 // HTTP status code
  }
}`
            }
        },

        // Troubleshooting
        {
            type: "paragraph",
            content:
                "## Troubleshooting Common Issues\n\nSolutions to common configuration problems:",
        },
        {
            type: "table",
            content: {
                headers: ["Issue", "Cause", "Solution"],
                rows: [
                    [
                        "Configuration not showing",
                        "Not imported in slidebar.ts",
                        "Add import and include in navigation array"
                    ],
                    [
                        "Copy button not working",
                        "Invalid code block structure",
                        "Ensure code property exists in content object"
                    ],
                    [
                        "Validation errors",
                        "Incorrect data types or missing required fields",
                        "Check schema requirements and data types"
                    ],
                    [
                        "Examples not displaying",
                        "Invalid JSON in example bodies",
                        "Validate JSON structure in examples"
                    ],
                    [
                        "Parameters not showing",
                        "Empty or incorrect parameter arrays",
                        "Check characterJsonBodySend and characterJsonParamsSend"
                    ],
                ],
            },
        },

        // Development Workflow
        {
            type: "paragraph",
            content:
                "## Development Workflow\n\nRecommended workflow for creating and testing configurations:",
        },
        {
            type: "list",
            content: {
                items: [
                    "Create your configuration file in the /config directory",
                    "Import and add it to the slidebar.ts navigation",
                    "Start the development server with 'npm run dev'",
                    "Test your configuration in the browser",
                    "Verify all examples work correctly",
                    "Test the copy-to-clipboard functionality",
                    "Validate JSON structure and data types",
                    "Build for production with 'npm run build'",
                ],
            },
        },

        // Final Notes
        {
            type: "paragraph",
            content:
                "This configuration guide provides everything you need to create comprehensive API documentation. Start with the examples in the /config directory, modify them to match your API, and gradually add more endpoints. The flexible configuration system allows you to document everything from simple GET requests to complex authentication flows.",
        },
    ],
}