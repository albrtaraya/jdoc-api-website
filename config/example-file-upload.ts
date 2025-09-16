export const ExampleFileUpload = {
    title: "Upload File",
    description: "Upload single or multiple files to the server with validation and metadata. Supports various file types with size and format restrictions.",
    method: "POST",
    urlDefinition: "https://api.example.com/v1/files/upload",
    headers: {
        "Authorization": "Bearer your-api-token",
        "Content-Type": "multipart/form-data",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token required" },
        { description: "File size must not exceed 10MB" },
        { description: "Supported formats: JPG, PNG, PDF, DOCX" },
        { description: "File name must be provided" },
    ],
    validExamples: [
        {
            title: "Single file upload",
            description: "Upload a single file with metadata",
            bodySend: {
                file: "file_binary_data",
                filename: "document.pdf",
                description: "Important document",
                category: "documents",
                public: false
            },
            bodyResponse: {
                success: true,
                data: {
                    file: {
                        id: "file_789abc",
                        filename: "document.pdf",
                        originalName: "document.pdf",
                        size: 2048576,
                        mimeType: "application/pdf",
                        url: "https://cdn.example.com/files/file_789abc.pdf",
                        publicUrl: null,
                        description: "Important document",
                        category: "documents",
                        uploadedAt: "2024-01-15T10:30:00Z",
                        uploadedBy: "user_123"
                    }
                },
                message: "File uploaded successfully"
            }
        },
        {
            title: "Multiple files upload",
            description: "Upload multiple files at once",
            bodySend: {
                files: [
                    {
                        file: "file1_binary_data",
                        filename: "image1.jpg"
                    },
                    {
                        file: "file2_binary_data",
                        filename: "image2.png"
                    }
                ],
                category: "images",
                public: true
            },
            bodyResponse: {
                success: true,
                data: {
                    files: [
                        {
                            id: "file_def456",
                            filename: "image1.jpg",
                            size: 1024768,
                            url: "https://cdn.example.com/files/file_def456.jpg",
                            publicUrl: "https://public.example.com/images/file_def456.jpg"
                        },
                        {
                            id: "file_ghi789",
                            filename: "image2.png",
                            size: 856432,
                            url: "https://cdn.example.com/files/file_ghi789.png",
                            publicUrl: "https://public.example.com/images/file_ghi789.png"
                        }
                    ],
                    totalFiles: 2,
                    totalSize: 1881200
                },
                message: "All files uploaded successfully"
            }
        }
    ],
    invalidExamples: [
        {
            title: "File too large",
            description: "Error when file exceeds size limit",
            bodySend: {
                file: "very_large_file_binary_data",
                filename: "large_video.mp4"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "FILE_TOO_LARGE",
                    message: "File size exceeds maximum limit of 10MB",
                    details: {
                        maxSize: 10485760,
                        actualSize: 15728640,
                        filename: "large_video.mp4"
                    },
                    statusCode: 413
                }
            }
        },
        {
            title: "Unsupported file type",
            description: "Error when file type is not allowed",
            bodySend: {
                file: "executable_binary_data",
                filename: "malicious.exe"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "UNSUPPORTED_FILE_TYPE",
                    message: "File type not supported",
                    details: {
                        filename: "malicious.exe",
                        detectedType: "application/x-executable",
                        supportedTypes: ["image/jpeg", "image/png", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
                    },
                    statusCode: 415
                }
            }
        }
    ],
    characterJsonBodySend: [
        {
            field: "file",
            type: "string",
            required: true,
            description: ["Binary file data", "Base64 encoded or multipart form data"]
        },
        {
            field: "filename",
            type: "string",
            required: true,
            description: ["Name of the file including extension", "Used for storage and display"]
        },
        {
            field: "description",
            type: "string",
            required: false,
            description: ["Optional description of the file", "Displayed in file listings"]
        },
        {
            field: "category",
            type: "string",
            required: false,
            description: ["File category for organization", "Options: documents, images, videos, other"]
        },
        {
            field: "public",
            type: "boolean",
            required: false,
            description: ["Whether file should be publicly accessible", "Default: false (private)"]
        },
        {
            field: "files",
            type: "array",
            required: false,
            description: ["Array of files for multiple upload"],
            characterJsonBodySend: [
                {
                    field: "file",
                    type: "string",
                    required: true,
                    description: ["Binary file data"]
                },
                {
                    field: "filename",
                    type: "string",
                    required: true,
                    description: ["File name with extension"]
                }
            ]
        }
    ],
    characterJsonParamsSend: []
}