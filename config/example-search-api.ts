export const ExampleSearchAPI = {
    title: "Advanced Search",
    description: "Perform advanced search across multiple content types with filters, sorting, and pagination. Supports full-text search, field-specific filters, and result highlighting.",
    method: "GET",
    urlDefinition: "https://api.example.com/v1/search",
    headers: {
        "Authorization": "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token required" },
        { description: "Search query (q) parameter is required" },
        { description: "At least one content type must be specified" },
    ],
    validExamples: [
        {
            title: "Basic text search",
            description: "Simple search across all content types",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    results: [
                        {
                            id: "doc_123",
                            type: "document",
                            title: "Advanced API Documentation",
                            excerpt: "Learn how to create comprehensive API documentation with examples and best practices...",
                            highlights: [
                                "API <mark>documentation</mark> with examples",
                                "best practices for <mark>API</mark> development"
                            ],
                            url: "/documents/doc_123",
                            createdAt: "2024-01-10T08:30:00Z",
                            relevanceScore: 0.95
                        },
                        {
                            id: "user_456",
                            type: "user",
                            title: "API Developer John Doe",
                            excerpt: "Senior API Developer with 5 years experience in REST API design and documentation...",
                            highlights: [
                                "Senior <mark>API</mark> Developer",
                                "REST <mark>API</mark> design"
                            ],
                            url: "/users/user_456",
                            createdAt: "2024-01-05T14:20:00Z",
                            relevanceScore: 0.87
                        }
                    ],
                    pagination: {
                        currentPage: 1,
                        totalPages: 3,
                        totalResults: 28,
                        resultsPerPage: 10
                    },
                    searchMetadata: {
                        query: "API documentation",
                        searchTime: 0.043,
                        filters: {},
                        sortBy: "relevance"
                    }
                },
                message: "Search completed successfully"
            }
        },
        {
            title: "Advanced filtered search",
            description: "Search with multiple filters and sorting",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    results: [
                        {
                            id: "doc_789",
                            type: "document",
                            title: "REST API Best Practices 2024",
                            excerpt: "Updated guide to REST API development in 2024...",
                            highlights: [
                                "<mark>REST API</mark> development",
                                "best practices <mark>2024</mark>"
                            ],
                            url: "/documents/doc_789",
                            createdAt: "2024-01-15T10:00:00Z",
                            relevanceScore: 0.92,
                            category: "tutorial",
                            author: "Jane Smith"
                        }
                    ],
                    pagination: {
                        currentPage: 1,
                        totalPages: 1,
                        totalResults: 1,
                        resultsPerPage: 10
                    },
                    searchMetadata: {
                        query: "REST API",
                        searchTime: 0.028,
                        filters: {
                            type: "document",
                            category: "tutorial",
                            dateRange: {
                                from: "2024-01-01",
                                to: "2024-12-31"
                            }
                        },
                        sortBy: "date_desc"
                    },
                    facets: {
                        types: [
                            { type: "document", count: 15 },
                            { type: "user", count: 8 },
                            { type: "project", count: 5 }
                        ],
                        categories: [
                            { category: "tutorial", count: 12 },
                            { category: "reference", count: 8 },
                            { category: "guide", count: 8 }
                        ]
                    }
                },
                message: "Filtered search completed successfully"
            }
        }
    ],
    invalidExamples: [
        {
            title: "Missing search query",
            description: "Error when required 'q' parameter is not provided",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "MISSING_SEARCH_QUERY",
                    message: "Search query parameter 'q' is required",
                    statusCode: 400
                }
            }
        },
        {
            title: "Invalid date range",
            description: "Error when date_from is after date_to",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_DATE_RANGE",
                    message: "Date range is invalid: 'date_from' cannot be after 'date_to'",
                    details: {
                        dateFrom: "2024-12-01",
                        dateTo: "2024-01-01"
                    },
                    statusCode: 400
                }
            }
        }
    ],
    characterJsonBodySend: [],
    characterJsonParamsSend: [
        {
            field: "q",
            type: "string",
            required: true,
            description: ["Search query text", "Minimum 2 characters", "Supports boolean operators (AND, OR, NOT)"]
        },
        {
            field: "type",
            type: "string",
            required: false,
            description: ["Filter by content type", "Options: document, user, project, all", "Default: all"]
        },
        {
            field: "category",
            type: "string",
            required: false,
            description: ["Filter by category", "Options: tutorial, reference, guide, news"]
        },
        {
            field: "author",
            type: "string",
            required: false,
            description: ["Filter by author name", "Exact match or partial match"]
        },
        {
            field: "date_from",
            type: "string",
            required: false,
            description: ["Start date for date range filter", "Format: YYYY-MM-DD"]
        },
        {
            field: "date_to",
            type: "string",
            required: false,
            description: ["End date for date range filter", "Format: YYYY-MM-DD"]
        },
        {
            field: "sort_by",
            type: "string",
            required: false,
            description: ["Sort results by field", "Options: relevance, date_asc, date_desc, title", "Default: relevance"]
        },
        {
            field: "page",
            type: "number",
            required: false,
            description: ["Page number for pagination", "Default: 1", "Minimum: 1"]
        },
        {
            field: "per_page",
            type: "number",
            required: false,
            description: ["Results per page", "Default: 10", "Range: 1-100"]
        },
        {
            field: "highlight",
            type: "boolean",
            required: false,
            description: ["Enable search term highlighting", "Default: true"]
        },
        {
            field: "facets",
            type: "boolean",
            required: false,
            description: ["Include facet counts in response", "Default: false"]
        }
    ]
}