export const ExamplePaginationAPI = {
    title: "Advanced Pagination",
    description: "Comprehensive pagination example showing different pagination styles, sorting options, and result metadata. Demonstrates cursor-based and offset-based pagination patterns with advanced filtering.",
    method: "GET",
    urlDefinition: "https://api.example.com/v1/products",
    headers: {
        "Authorization": "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token required" },
        { description: "Page size cannot exceed 100 items" },
        { description: "Sort fields must be valid product properties" },
    ],
    validExamples: [
        {
            title: "Basic offset pagination",
            description: "Standard pagination with page numbers and limits",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    products: [
                        {
                            id: "prod_123",
                            name: "Premium Wireless Headphones",
                            price: 299.99,
                            category: "electronics",
                            inStock: true,
                            rating: 4.5,
                            createdAt: "2024-01-10T10:30:00Z"
                        },
                        {
                            id: "prod_124",
                            name: "Bluetooth Speaker",
                            price: 79.99,
                            category: "electronics",
                            inStock: true,
                            rating: 4.2,
                            createdAt: "2024-01-11T14:20:00Z"
                        },
                        {
                            id: "prod_125",
                            name: "Smart Watch",
                            price: 399.99,
                            category: "electronics",
                            inStock: false,
                            rating: 4.7,
                            createdAt: "2024-01-12T09:15:00Z"
                        }
                    ],
                    pagination: {
                        currentPage: 1,
                        pageSize: 20,
                        totalPages: 12,
                        totalItems: 235,
                        hasNextPage: true,
                        hasPreviousPage: false,
                        nextPage: 2,
                        previousPage: null
                    }
                },
                message: "Products retrieved successfully"
            }
        },
        {
            title: "Cursor-based pagination with filtering",
            description: "Cursor pagination with category filter and custom sorting",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    products: [
                        {
                            id: "prod_201",
                            name: "Gaming Laptop Pro",
                            price: 1299.99,
                            category: "computers",
                            inStock: true,
                            rating: 4.8,
                            createdAt: "2024-01-15T11:30:00Z"
                        },
                        {
                            id: "prod_202",
                            name: "Ultrabook Air",
                            price: 899.99,
                            category: "computers",
                            inStock: true,
                            rating: 4.6,
                            createdAt: "2024-01-14T16:45:00Z"
                        }
                    ],
                    pagination: {
                        cursor: {
                            current: "prod_202_2024-01-14T16:45:00Z",
                            next: "prod_203_2024-01-13T12:30:00Z",
                            previous: "prod_200_2024-01-16T08:15:00Z"
                        },
                        hasNext: true,
                        hasPrevious: true,
                        pageSize: 20,
                        totalItems: 47
                    },
                    filters: {
                        applied: {
                            category: "computers",
                            inStock: true,
                            priceRange: {
                                min: 500,
                                max: 2000
                            }
                        },
                        available: {
                            categories: [
                                { name: "electronics", count: 156 },
                                { name: "computers", count: 47 },
                                { name: "accessories", count: 32 }
                            ],
                            priceRanges: [
                                { range: "0-100", count: 89 },
                                { range: "100-500", count: 92 },
                                { range: "500-1000", count: 38 },
                                { range: "1000+", count: 16 }
                            ]
                        }
                    },
                    sorting: {
                        field: "createdAt",
                        direction: "desc",
                        available: [
                            "name", "price", "rating", "createdAt", "popularity"
                        ]
                    }
                },
                message: "Filtered products retrieved with cursor pagination"
            }
        },
        {
            title: "Search with pagination and facets",
            description: "Search results with pagination and aggregated facets",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    products: [
                        {
                            id: "prod_301",
                            name: "Wireless Gaming Mouse",
                            price: 89.99,
                            category: "accessories",
                            brand: "TechPro",
                            inStock: true,
                            rating: 4.4,
                            searchScore: 0.95,
                            highlights: {
                                name: "<mark>Wireless</mark> Gaming Mouse",
                                description: "High-precision <mark>wireless</mark> mouse for gaming"
                            }
                        }
                    ],
                    pagination: {
                        currentPage: 1,
                        pageSize: 10,
                        totalPages: 3,
                        totalItems: 28,
                        hasNextPage: true,
                        hasPreviousPage: false
                    },
                    searchMetadata: {
                        query: "wireless",
                        searchTime: 0.034,
                        totalMatches: 28,
                        suggestions: [
                            "wireless headphones",
                            "wireless speakers",
                            "wireless charger"
                        ]
                    },
                    facets: {
                        categories: [
                            { name: "accessories", count: 12 },
                            { name: "electronics", count: 10 },
                            { name: "computers", count: 6 }
                        ],
                        brands: [
                            { name: "TechPro", count: 8 },
                            { name: "AudioMax", count: 7 },
                            { name: "GameGear", count: 6 }
                        ],
                        priceRanges: [
                            { range: "0-50", count: 8 },
                            { range: "50-100", count: 12 },
                            { range: "100-200", count: 6 },
                            { range: "200+", count: 2 }
                        ],
                        ratings: [
                            { rating: 5, count: 5 },
                            { rating: 4, count: 15 },
                            { rating: 3, count: 6 },
                            { rating: 2, count: 2 }
                        ]
                    }
                },
                message: "Search results with faceted navigation"
            }
        }
    ],
    invalidExamples: [
        {
            title: "Invalid page size",
            description: "Error when page size exceeds maximum limit",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_PAGE_SIZE",
                    message: "Page size cannot exceed 100 items",
                    details: {
                        requestedSize: 150,
                        maxSize: 100,
                        suggestion: "Use multiple requests or reduce page size"
                    },
                    statusCode: 400
                }
            }
        },
        {
            title: "Invalid sort field",
            description: "Error when trying to sort by non-existent field",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_SORT_FIELD",
                    message: "Sort field 'invalidField' is not supported",
                    details: {
                        requestedField: "invalidField",
                        availableFields: ["name", "price", "rating", "createdAt", "popularity"]
                    },
                    statusCode: 400
                }
            }
        },
        {
            title: "Invalid cursor",
            description: "Error when cursor is malformed or expired",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_CURSOR",
                    message: "Pagination cursor is invalid or expired",
                    details: {
                        cursor: "invalid_cursor_string",
                        reason: "Cursor format is malformed",
                        suggestion: "Start pagination from the beginning or use a valid cursor"
                    },
                    statusCode: 400
                }
            }
        }
    ],
    characterJsonBodySend: [],
    characterJsonParamsSend: [
        {
            field: "page",
            type: "number",
            required: false,
            description: ["Page number for offset-based pagination", "Default: 1", "Minimum: 1"]
        },
        {
            field: "limit",
            type: "number",
            required: false,
            description: ["Number of items per page", "Default: 20", "Range: 1-100"]
        },
        {
            field: "cursor",
            type: "string",
            required: false,
            description: ["Cursor for cursor-based pagination", "Alternative to offset pagination", "Provides more stable pagination"]
        },
        {
            field: "sort_by",
            type: "string",
            required: false,
            description: ["Field to sort by", "Options: name, price, rating, createdAt, popularity", "Default: createdAt"]
        },
        {
            field: "sort_direction",
            type: "string",
            required: false,
            description: ["Sort direction", "Options: asc, desc", "Default: desc"]
        },
        {
            field: "category",
            type: "string",
            required: false,
            description: ["Filter by product category", "Options: electronics, computers, accessories"]
        },
        {
            field: "brand",
            type: "string",
            required: false,
            description: ["Filter by brand name", "Exact match"]
        },
        {
            field: "in_stock",
            type: "boolean",
            required: false,
            description: ["Filter by stock availability", "true: only in-stock items"]
        },
        {
            field: "min_price",
            type: "number",
            required: false,
            description: ["Minimum price filter", "Must be less than max_price"]
        },
        {
            field: "max_price",
            type: "number",
            required: false,
            description: ["Maximum price filter", "Must be greater than min_price"]
        },
        {
            field: "min_rating",
            type: "number",
            required: false,
            description: ["Minimum rating filter", "Range: 1-5"]
        },
        {
            field: "search",
            type: "string",
            required: false,
            description: ["Search query for product name and description", "Supports partial matching"]
        },
        {
            field: "include_facets",
            type: "boolean",
            required: false,
            description: ["Include facet counts in response", "Default: false", "Adds aggregated filter counts"]
        },
        {
            field: "highlight_search",
            type: "boolean",
            required: false,
            description: ["Enable search term highlighting", "Default: false", "Only works with search parameter"]
        }
    ]
}