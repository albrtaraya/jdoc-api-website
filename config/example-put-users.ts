export const ExamplePutUser = {
    title: "Update User (Complete)",
    description: "Completely replace all user information by providing the full updated user object. All existing data will be overwritten with the new values provided",
    method: "PUT",
    urlDefinition: "https://api.example.com/v1/users/{userId}",
    headers: {
        Authorization: "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token" },
        { description: "User must exist in the system" },
        { description: "All required fields must be provided" },
        { description: "User can only update their own profile or admin privileges required" },
    ],
    validExamples: [
        {
            title: "Update complete user profile",
            description: "Replace all user information with new data",
            bodySend: {
                name: "John Doe Updated",
                email: "john.updated@example.com",
                role: "senior_user",
                department: "Engineering",
                phone: "+1-555-0123",
                address: "123 Main St, City, State 12345"
            },
            bodyResponse: {
                success: true,
                data: {
                    user: {
                        id: "user_123",
                        name: "John Doe Updated",
                        email: "john.updated@example.com",
                        role: "senior_user",
                        department: "Engineering",
                        phone: "+1-555-0123",
                        address: "123 Main St, City, State 12345",
                        updatedAt: "2024-01-18T11:45:00Z"
                    }
                },
                message: "User updated successfully",
            },
        },
    ],
    invalidExamples: [
        {
            title: "User not found",
            description: "Error when trying to update non-existent user",
            bodySend: {
                name: "Updated Name",
                email: "updated@example.com",
                role: "user"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "USER_NOT_FOUND",
                    message: "User with specified ID does not exist",
                    statusCode: 404
                },
            },
        },
    ],
    characterJsonBodySend: [
        {
            field: "name",
            type: "string",
            required: true,
            description: ["User's full name"],
        },
        {
            field: "email",
            type: "string",
            required: true,
            description: ["Valid email format"],
        },
        {
            field: "role",
            type: "string",
            required: true,
            description: ["User role in the system"],
        },
        {
            field: "department",
            type: "string",
            required: false,
            description: ["User's department"],
        },
        {
            field: "phone",
            type: "string",
            required: false,
            description: ["Phone number"],
        },
        {
            field: "address",
            type: "string",
            required: false,
            description: ["User's address"],
        },
    ],
    characterJsonParamsSend: [
        {
            field: "userId",
            type: "string",
            required: true,
            description: ["ID of the user to update"],
        },
    ],
};