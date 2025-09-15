export const ExamplePostUser = {
    title: "Create New User",
    description: "Create a new user account with personal information and system permissions. The user will be registered in the database with encrypted credentials",
    method: "POST",
    urlDefinition: "https://api.example.com/v1/users",
    headers: {
        Authorization: "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token with admin privileges" },
        { description: "Email must be unique and valid format" },
        { description: "Password must be at least 8 characters" },
        { description: "Name is required and cannot be empty" },
    ],
    validExamples: [
        {
            title: "Create standard user",
            description: "Create a new user with basic information",
            bodySend: {
                name: "Alice Johnson",
                email: "alice@example.com",
                password: "securepassword123",
                role: "user",
                department: "Marketing"
            },
            bodyResponse: {
                success: true,
                data: {
                    user: {
                        id: "user_789",
                        name: "Alice Johnson",
                        email: "alice@example.com",
                        role: "user",
                        department: "Marketing",
                        createdAt: "2024-01-17T09:15:00Z",
                        isActive: true
                    }
                },
                message: "User created successfully",
            },
        },
    ],
    characterJsonBodySend: [
        {
            field: "name",
            type: "string",
            required: true,
            description: ["Nombre completo del usuario"],
        },
        {
            field: "email",
            type: "string",
            required: true,
            description: ["formato email válido", "único en el sistema"],
        },
        {
            field: "password",
            type: "string",
            required: true,
            description: ["mínimo 8 caracteres"],
        },
        {
            field: "role",
            type: "string",
            required: false,
            description: ["Rol del usuario en el sistema"],
        },
        {
            field: "department",
            type: "string",
            required: false,
            description: ["Departamento al que pertenece el usuario"],
        },
    ],
    invalidExamples: [
        {
            title: "Email already exists",
            description: "Error when trying to create user with existing email",
            bodySend: {
                name: "Bob Wilson",
                email: "john@example.com",
                password: "password123",
                role: "user"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "EMAIL_ALREADY_EXISTS",
                    message: "A user with this email already exists",
                    field: "email",
                    statusCode: 409
                },
            },
        },
    ],
    characterJsonParamsSend: [],
};
