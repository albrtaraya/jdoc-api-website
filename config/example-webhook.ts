export const ExampleWebhook = {
    title: "Webhook Configuration",
    description: "Configure and manage webhooks for real-time event notifications. Register webhook endpoints to receive automatic notifications when specific events occur in your system.",
    method: "POST",
    urlDefinition: "https://api.example.com/v1/webhooks",
    headers: {
        "Authorization": "Bearer your-api-token",
        "Content-Type": "application/json",
        "X-API-Version": "v1",
    },
    requirements: [
        { description: "Valid authentication token with webhook permissions" },
        { description: "Webhook URL must be HTTPS and publicly accessible" },
        { description: "At least one event type must be specified" },
        { description: "Secret key is recommended for signature verification" },
    ],
    validExamples: [
        {
            title: "Create webhook for user events",
            description: "Register a webhook to receive user-related event notifications",
            bodySend: {
                url: "https://your-app.com/api/webhooks/user-events",
                events: ["user.created", "user.updated", "user.deleted"],
                secret: "webhook_secret_key_123",
                description: "User management notifications",
                active: true,
                retryPolicy: {
                    maxRetries: 3,
                    retryDelay: 300
                }
            },
            bodyResponse: {
                success: true,
                data: {
                    webhook: {
                        id: "webhook_abc123",
                        url: "https://your-app.com/api/webhooks/user-events",
                        events: ["user.created", "user.updated", "user.deleted"],
                        description: "User management notifications",
                        active: true,
                        secret: "webhook_secret_key_123",
                        retryPolicy: {
                            maxRetries: 3,
                            retryDelay: 300
                        },
                        createdAt: "2024-01-15T10:30:00Z",
                        lastTriggered: null,
                        totalDeliveries: 0,
                        failedDeliveries: 0
                    }
                },
                message: "Webhook created successfully"
            }
        },
        {
            title: "Create webhook with custom headers",
            description: "Register webhook with custom headers for additional authentication",
            bodySend: {
                url: "https://your-app.com/api/webhooks/payments",
                events: ["payment.completed", "payment.failed", "payment.refunded"],
                secret: "payment_webhook_secret_456",
                description: "Payment status notifications",
                active: true,
                customHeaders: {
                    "X-Custom-Auth": "custom-token-value",
                    "X-App-Version": "v2.1.0"
                },
                retryPolicy: {
                    maxRetries: 5,
                    retryDelay: 600,
                    backoffMultiplier: 2
                }
            },
            bodyResponse: {
                success: true,
                data: {
                    webhook: {
                        id: "webhook_def456",
                        url: "https://your-app.com/api/webhooks/payments",
                        events: ["payment.completed", "payment.failed", "payment.refunded"],
                        description: "Payment status notifications",
                        active: true,
                        customHeaders: {
                            "X-Custom-Auth": "[HIDDEN]",
                            "X-App-Version": "v2.1.0"
                        },
                        retryPolicy: {
                            maxRetries: 5,
                            retryDelay: 600,
                            backoffMultiplier: 2
                        },
                        createdAt: "2024-01-15T11:15:00Z"
                    }
                },
                message: "Webhook with custom headers created successfully"
            }
        }
    ],
    invalidExamples: [
        {
            title: "Invalid webhook URL",
            description: "Error when webhook URL is not HTTPS or unreachable",
            bodySend: {
                url: "http://insecure-site.com/webhook",
                events: ["user.created"],
                secret: "test_secret"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_WEBHOOK_URL",
                    message: "Webhook URL must use HTTPS protocol for security",
                    details: {
                        providedUrl: "http://insecure-site.com/webhook",
                        requiredProtocol: "https",
                        reason: "HTTP URLs are not allowed for webhook endpoints"
                    },
                    statusCode: 400
                }
            }
        },
        {
            title: "Unreachable webhook endpoint",
            description: "Error when webhook URL validation fails",
            bodySend: {
                url: "https://non-existent-domain-12345.com/webhook",
                events: ["user.created"],
                secret: "test_secret"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "WEBHOOK_VALIDATION_FAILED",
                    message: "Unable to reach webhook endpoint for validation",
                    details: {
                        url: "https://non-existent-domain-12345.com/webhook",
                        error: "DNS resolution failed",
                        suggestion: "Ensure the URL is correct and publicly accessible"
                    },
                    statusCode: 400
                }
            }
        },
        {
            title: "Invalid event type",
            description: "Error when specifying unsupported event types",
            bodySend: {
                url: "https://your-app.com/webhook",
                events: ["invalid.event", "user.created"],
                secret: "test_secret"
            },
            bodyResponse: {
                success: false,
                error: {
                    code: "INVALID_EVENT_TYPES",
                    message: "One or more event types are not supported",
                    details: {
                        invalidEvents: ["invalid.event"],
                        supportedEvents: [
                            "user.created", "user.updated", "user.deleted",
                            "payment.completed", "payment.failed", "payment.refunded",
                            "order.created", "order.updated", "order.cancelled"
                        ]
                    },
                    statusCode: 400
                }
            }
        }
    ],
    characterJsonBodySend: [
        {
            field: "url",
            type: "string",
            required: true,
            description: ["HTTPS URL where webhook notifications will be sent", "Must be publicly accessible", "Will be validated during creation"]
        },
        {
            field: "events",
            type: "array",
            required: true,
            description: ["Array of event types to subscribe to", "At least one event type required", "Available events: user.*, payment.*, order.*"]
        },
        {
            field: "secret",
            type: "string",
            required: false,
            description: ["Secret key for webhook signature verification", "Recommended for security", "Used to generate HMAC signature"]
        },
        {
            field: "description",
            type: "string",
            required: false,
            description: ["Human-readable description of the webhook", "Helps identify webhook purpose"]
        },
        {
            field: "active",
            type: "boolean",
            required: false,
            description: ["Whether webhook is active and will receive events", "Default: true"]
        },
        {
            field: "customHeaders",
            type: "object",
            required: false,
            description: ["Custom headers to include in webhook requests", "Useful for additional authentication"],
            characterJsonBodySend: [
                {
                    field: "X-Custom-Auth",
                    type: "string",
                    required: false,
                    description: ["Custom authentication header"]
                },
                {
                    field: "X-App-Version",
                    type: "string",
                    required: false,
                    description: ["Application version identifier"]
                }
            ]
        },
        {
            field: "retryPolicy",
            type: "object",
            required: false,
            description: ["Configuration for failed delivery retries"],
            characterJsonBodySend: [
                {
                    field: "maxRetries",
                    type: "number",
                    required: false,
                    description: ["Maximum number of retry attempts", "Default: 3", "Range: 0-10"]
                },
                {
                    field: "retryDelay",
                    type: "number",
                    required: false,
                    description: ["Initial delay between retries in seconds", "Default: 300 (5 minutes)"]
                },
                {
                    field: "backoffMultiplier",
                    type: "number",
                    required: false,
                    description: ["Multiplier for exponential backoff", "Default: 1 (no backoff)", "Range: 1-5"]
                }
            ]
        }
    ],
    characterJsonParamsSend: []
}