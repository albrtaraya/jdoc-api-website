export const ExamplePostAuth = {
    title: "User Authentication",
    description: "Validate user credentials against the database and generate secure access tokens for API authentication. Returns both access and refresh tokens for session management",
    method: "POST",
    urlDefinition: "https://api.example.com/v1/auth/login",
    headers: {
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid email and password combination" },
        { description: "User account must be active" },
        { description: "Maximum 5 failed attempts per hour" },
        { description: "Strong password policy enforced" },
    ],
    validExamples: [
        {
            title: "Successful login",
            description: "Authenticate with valid credentials and receive tokens",
            bodySend: {
                email: "john@example.com",
                password: "securepassword123",
                rememberMe: true
            },
            bodyResponse: {
                success: true,
                data: {
                    user: {
                        id: "user_123",
                        name: "John Doe",
                        email: "john@example.com",
                        role: "user"
                    },
                    tokens: {
                        accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        refreshToken: "rt_abc123def456ghi789",
                        expiresIn: 3600,
                        tokenType: "Bearer"
                    },
                    lastLoginAt: "2024-01-18T08:30:00Z"
                },
                message: "Authentication successful",
            },
        },
    ],
    invalidExamples: [
        {
            title: "Invalid credentials",
            description: "Error when email or password is incorrect",
            bodySend: {
                email: "john@example.com",
                password: "wrongpassword"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_CREDENTIALS",
                    message: "Invalid email or password",
                    attemptsRemaining: 4,
                    statusCode: 401
                },
            },
        },
    ],
    characterJsonBodySend: [
        {
            field: "email",
            type: "string",
            required: true,
            description: ["formato email válido"],
        },
        {
            field: "password",
            type: "string",
            required: true,
            description: ["mínimo 8 caracteres"],
        },
        {
            field: "rememberMe",
            type: "boolean",
            required: false,
            description: ["Mantener la sesión activa por más tiempo"],
        },
    ],
    characterJsonParamsSend: [],
};