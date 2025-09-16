export const ExampleGetUsers = {
    title: "Get All Users",
    description: "Retrieve a paginated list of all users from the database with optional filtering and search capabilities",
    method: "GET",
    urlDefinition: "https://api.example.com/v1/users",
    headers: {
        Authorization: "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token in Authorization header" },
        { description: "User must have 'read:users' permission" },
        { description: "Optional query parameters: page, limit, search" },
    ],
    validExamples: [
        {
            title: "Get users with pagination",
            description: "Retrieve users with pagination and search parameters",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    users: [
                        {
                            id: "user_123",
                            name: "John Doe",
                            email: "john@example.com",
                            role: "user",
                            createdAt: "2024-01-15T10:30:00Z"
                        },
                        {
                            id: "user_456",
                            name: "Jane Smith",
                            email: "jane@example.com",
                            role: "admin",
                            createdAt: "2024-01-16T14:20:00Z"
                        }
                    ],
                    pagination: {
                        currentPage: 1,
                        totalPages: 5,
                        totalUsers: 47,
                        limit: 10
                    }
                },
                message: "Users retrieved successfully",
            },
        },
    ],
    invalidExamples: [
        {
            title: "Invalid authentication token",
            description: "Error when using expired or invalid token",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_TOKEN",
                    message: "Authentication token is invalid or expired",
                    statusCode: 401
                },
            },
        },
    ],
    characterJsonBodySend: [],
    characterJsonParamsSend: [
        {
            field: "limit",
            type: "number",
            required: false,
            description: ["Maximum number of users per page"],
        },
        {
            field: "page",
            type: "number",
            required: false,
            description: ["Page number for pagination"],
        },
    ],
};