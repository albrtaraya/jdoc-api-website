export const ExamplePatchUser = {
    title: "Update User (Partial)",
    description: "Modify only specific user fields without affecting other user data. This endpoint allows selective updates for efficient data management",
    method: "PATCH",
    urlDefinition: "https://api.example.com/v1/users/{userId}",
    headers: {
        Authorization: "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token" },
        { description: "At least one field must be provided for update" },
        { description: "User must exist in the system" },
        { description: "Only updatable fields are allowed" },
    ],
    validExamples: [
        {
            title: "Update user department only",
            description: "Change only the department field, leaving other data unchanged",
            bodySend: {
                department: "Sales"
            },
            bodyResponse: {
                success: true,
                data: {
                    user: {
                        id: "user_123",
                        name: "John Doe",
                        email: "john@example.com",
                        role: "user",
                        department: "Sales",
                        phone: "+1-555-0123",
                        updatedAt: "2024-01-18T15:30:00Z"
                    },
                    updatedFields: ["department"]
                },
                message: "User updated successfully",
            },
        },
    ],
    invalidExamples: [
        {
            title: "No fields provided",
            description: "Error when no fields are provided for update",
            bodySend: {},
            bodyResponse: {
                success: false,
                error: {
                    code: "NO_FIELDS_PROVIDED",
                    message: "At least one field must be provided for update",
                    statusCode: 400
                },
            },
        },
    ],
    characterJsonBodySend: [
        {
            field: "name",
            type: "string",
            required: false,
            description: ["Nombre completo del usuario"],
        },
        {
            field: "email",
            type: "string",
            required: false,
            description: ["formato email válido"],
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
            description: ["Departamento del usuario"],
        },
        {
            field: "phone",
            type: "string",
            required: false,
            description: ["Número de teléfono"],
        },
    ],
    characterJsonParamsSend: [
        {
            field: "userId",
            type: "string",
            required: true,
            description: ["ID del usuario a actualizar"],
        },
    ],
};
