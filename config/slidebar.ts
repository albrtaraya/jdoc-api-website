
import { ExampleGetUsers } from "@/config/example-get-users";
import { DocumentationGuide } from "@/config/documentation-guide";
import { ExamplePostAuth } from "./example-auth";
import { ExampleDeleteUser } from "./example-delete-users";
import { ExamplePatchUser } from "./example-patch-uers";
import { ExamplePutUser } from "./example-put-users";
import { ExamplePostUser } from "./example-post-users";
import { GettingStarted } from "./get-started";
import { ConfigurationFiles } from "./configuration-files";
import { ExampleFileUpload } from "./example-file-upload";
import { ExampleSearchAPI } from "./example-search-api";
import { ExampleWebhook } from "./example-webhook";
import { ExamplePaginationAPI } from "./example-pagination-api";

export const Slidebar = [
    {
        id: "getting-started",
        title: "Getting Started",
        type: "section",
        descriptiveConfig: GettingStarted,
    },
    {
        id: "documentation-guide",
        title: "Documentation Guide",
        type: "section",
        descriptiveConfig: DocumentationGuide,
    },
    {
        id: "configuration-files",
        title: "Configurations Files",
        type: "section",
        descriptiveConfig: ConfigurationFiles,
    },
    {
        id: "examples",
        title: "Examples",
        type: "group",
        children: [
            {
                id: "generate-docs",
                title: "Auth",
                config: ExamplePostAuth,
            },
            {
                id: "get-users",
                title: "GET - Users",
                config: ExampleGetUsers,
            },
            {
                id: "post-users",
                title: "POST - Users",
                config: ExamplePostUser,
            },
            {
                id: "put-users",
                title: "PUT - Users",
                config: ExamplePutUser,
            },
            {
                id: "patch-users",
                title: "PATCH - Users",
                config: ExamplePatchUser,
            },
            {
                id: "delete-users",
                title: "DELETE - Users",
                config: ExampleDeleteUser,
            },
            {
                id: "file-upload",
                title: "FILE - UPLOAD",
                config: ExampleFileUpload,
            },
            {
                id: "search-api",
                title: "SEARCH - API",
                config: ExampleSearchAPI,
            },
            {
                id: "webhook",
                title: "WEBHOOKS",
                config: ExampleWebhook,
            },
            {
                id: "pagination-api",
                title: "PAGINATION",
                config: ExamplePaginationAPI,
            },
        ],
    },
]