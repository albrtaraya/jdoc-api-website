export const ExampleDeleteUser = {
    title: "Delete User",
    description: "Permanently remove a user account and all associated data from the system. This action creates a backup before deletion and cannot be undone",
    method: "DELETE",
    urlDefinition: "https://api.example.com/v1/users/{userId}",
    headers: {
        Authorization: "Bearer your-api-token",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token with admin privileges" },
        { description: "User must exist in the system" },
        { description: "Cannot delete currently authenticated user" },
        { description: "User should not have active sessions or pending operations" },
    ],
    validExamples: [
        {
            title: "Delete user successfully",
            description: "Remove user and all associated data",
            bodySend: null,
            bodyResponse: {
                success: true,
                data: {
                    deletedUserId: "user_456",
                    deletedAt: "2024-01-18T16:45:00Z",
                    backupCreated: true,
                    backupId: "backup_789"
                },
                message: "User deleted successfully",
            },
        },
    ],
    invalidExamples: [
        {
            title: "Cannot delete own account",
            description: "Error when trying to delete currently authenticated user",
            bodySend: null,
            bodyResponse: {
                success: false,
                error: {
                    code: "CANNOT_DELETE_SELF",
                    message: "Cannot delete your own account",
                    statusCode: 403
                },
            },
        },
    ],
    characterJsonBodySend: [],
    characterJsonParamsSend: [
        {
            field: "userId",
            type: "string",
            required: true,
            description: ["ID of the user to delete", "Cannot be the current authenticated user"],
        },
    ],
};