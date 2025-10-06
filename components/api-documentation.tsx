"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Copy, Menu, X, Code, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CampoCaracteristica {
  field: string
  type: string
  description: string[]
  required?: boolean
  characterJsonBodySend?: CampoCaracteristica[]
  characterJsonParamsSend?: CampoCaracteristica[]
}

interface EjemploValido {
  title: string
  description: string
  bodySend: any
  bodyResponse: any
}

interface EjemploInvalido {
  title: string
  description: string
  bodySend: any
  bodyResponse: any
}

interface ApiConfig {
  title: string
  description: string
  method: string
  urlDefinition: string
  headers?: { [key: string]: string }
  requirements: { description: string }[]
  validExamples: EjemploValido[]
  invalidExamples: EjemploInvalido[]
  characterJsonBodySend: CampoCaracteristica[],
  characterJsonParamsSend: CampoCaracteristica[],
}

interface ContentItem {
  type: "paragraph" | "table" | "list" | "code"
  content: any
}

interface DescriptiveConfig {
  title: string
  description: string
  content: ContentItem[]
}

interface ApiSection {
  id: string
  title: string
  type?: string
  config?: ApiConfig
  descriptiveConfig?: DescriptiveConfig
  children?: ApiSection[]
}

interface ApiDocumentationProps {
  sections: ApiSection[]
}

export function ApiDocumentation({ sections }: ApiDocumentationProps) {
  const [activeSection, setActiveSection] = useState("getting-started")
  const [customJson, setCustomJson] = useState("")
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeTab, setActiveTab] = useState("HTTP")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showMobileCode, setShowMobileCode] = useState(false)
  const { toast } = useToast()

  const findActiveConfig = (
    sections: ApiSection[],
  ): { apiConfig: ApiConfig | null; descriptiveConfig: DescriptiveConfig | null } => {
    for (const section of sections) {
      if (section.children) {
        for (const child of section.children) {
          if (child.id === activeSection) {
            return {
              apiConfig: child.config || null,
              descriptiveConfig: child.descriptiveConfig || null,
            }
          }
        }
      }
      if (section.id === activeSection) {
        return {
          apiConfig: section.config || null,
          descriptiveConfig: section.descriptiveConfig || null,
        }
      }
    }
    return { apiConfig: null, descriptiveConfig: null }
  }

  const { apiConfig: activeConfig, descriptiveConfig: activeDescriptiveConfig } = findActiveConfig(sections)


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado",
      description: "Texto copiado al portapapeles",
    })
  }

  const simulateApiCall = async () => {
    setIsSimulating(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const jsonData = JSON.parse(customJson)

      const hasRequiredFields = jsonData.nombre && jsonData.email && jsonData.edad

      if (!hasRequiredFields) {
        setSimulationResult({
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "Faltan campos requeridos",
            fields: [],
          },
        })
      } else {
        setSimulationResult({
          success: true,
          data: {
            id: Math.floor(Math.random() * 1000),
            ...jsonData,
            fechaCreacion: new Date().toISOString(),
          },
          message: "Usuario creado exitosamente (simulación)",
        })
      }
    } catch (error) {
      setSimulationResult({
        success: false,
        error: {
          code: "INVALID_JSON",
          message: "JSON inválido",
        },
      })
    }

    setIsSimulating(false)
  }

  const renderFieldsTable = (fields: CampoCaracteristica[], level = 0) => {
    const rows: JSX.Element[] = []

    fields.forEach((field, index) => {
      rows.push(
        <TableRow key={index}>
          <TableCell className={`font-mono text-sm ${level > 0 ? "pl-8" : ""}`}>
            {"  ".repeat(level)}
            <span className="font-semibold">{field.field}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm text-gray-600">{field.type}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm font-medium">
              {field.required !== false ? "Yes" : "No"}
            </span>
          </TableCell>
          <TableCell>
            <div className="text-sm text-gray-600">
              {field.description.filter((v) => v !== "REQUIRED").join(", ")}
            </div>
          </TableCell>
        </TableRow>
      )

      if (field.characterJsonBodySend && field.characterJsonBodySend.length > 0) {
        rows.push(...renderFieldsTable(field.characterJsonBodySend, level + 1))
      }
      if (field.characterJsonParamsSend && field.characterJsonParamsSend.length > 0) {
        rows.push(...renderFieldsTable(field.characterJsonParamsSend, level + 1))
      }
    })

    return rows
  }

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "get":
        return "bg-green-500"
      case "post":
        return "bg-blue-500"
      case "put":
        return "bg-yellow-500"
      case "delete":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderSidebar = () => (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-100 border-r border-gray-200 h-screen overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Documentation</h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <div key={section.id}>
                {section.type === "group" ? (
                  <div>
                    <div className="text-sm font-medium text-gray-900 py-2 px-3 bg-gray-200 rounded">{section.title}</div>
                    {section.children?.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => setActiveSection(child.id)}
                        className={`w-full text-left text-sm py-2 px-6 hover:bg-gray-200 rounded ${activeSection === child.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                          }`}
                      >
                        {child.title}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left text-sm py-2 px-3 hover:bg-gray-200 rounded ${activeSection === section.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                      }`}
                  >
                    {section.title}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-full bg-gray-100 transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">API Documentation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id}>
                  {section.type === "group" ? (
                    <div>
                      <div className="text-sm font-medium text-gray-900 py-2 px-3 bg-gray-200 rounded">{section.title}</div>
                      {section.children?.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => {
                            setActiveSection(child.id)
                            setIsMobileMenuOpen(false)
                          }}
                          className={`w-full text-left text-sm py-3 px-6 hover:bg-gray-200 rounded ${activeSection === child.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                            }`}
                        >
                          {child.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full text-left text-sm py-3 px-3 hover:bg-gray-200 rounded ${activeSection === section.id ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                        }`}
                    >
                      {section.title}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  )

  const renderContentItem = (item: ContentItem, index: number) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p key={index} className="text-gray-600 mb-4 leading-relaxed">
            {item.content}
          </p>
        )

      case "table":
        return (
          <div key={index} className="mb-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    {item.content.headers?.map((header: string, headerIndex: number) => (
                      <TableHead key={headerIndex} className="font-semibold">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {item.content.rows?.map((row: string[], rowIndex: number) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell: string, cellIndex: number) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )

      case "list":
        return (
          <div key={index} className="mb-6">
            <ul className="space-y-2">
              {item.content.items?.map((listItem: string, listIndex: number) => (
                <li key={listIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{listItem}</span>
                </li>
              ))}
            </ul>
          </div>
        )

      case "code":
        return (
          <div key={index} className="mb-6">
            {item.content.title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.content.title}</h3>
            )}
            {item.content.description && (
              <p className="text-gray-600 mb-4">{item.content.description}</p>
            )}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                <Label className="font-medium text-sm text-gray-700">
                  {item.content.label || "Code"}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                  onClick={() => copyToClipboard(item.content.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre className="bg-gray-50 p-4 text-sm overflow-x-auto text-gray-800 font-mono">
                {item.content.code}
              </pre>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const generateCodeExample = (config: ApiConfig, language: string) => {
    const exampleData = config.validExamples[0]?.bodySend || {}
    const url = config.urlDefinition
    const method = config.method.toUpperCase()
    const headers = config.headers || {}

    switch (language) {
      case "HTTP":
        const headerLines = Object.entries(headers)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
        return `${method} ${url}
Content-Type: application/json${headerLines ? "\n" + headerLines : ""}

${JSON.stringify(exampleData, null, 2)}`

      case "JavaScript":
        const jsHeaders = {
          "Content-Type": "application/json",
          ...headers,
        }
        return `const response = await fetch('${url}', {
  method: '${method}',
  headers: ${JSON.stringify(jsHeaders, null, 4)},
  body: JSON.stringify(${JSON.stringify(exampleData, null, 2)})
});

const data = await response.json();
console.log(data);`

      case "PHP":
        const phpHeaders = Object.entries({
          "Content-Type": "application/json",
          ...headers,
        })
          .map(([key, value]) => `"${key}: ${value}\\\\r\\\\n"`)
          .join(" . ")

        return `<?php
$url = '${url}';
$data = ${JSON.stringify(exampleData, null, 2).replace(/"/g, "'")}

$options = [
    'http' => [
        'header' => ${phpHeaders},
        'method' => '${method}',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

print_r($response);
?>`

      case "Python":
        const pythonHeaders = {
          "Content-Type": "application/json",
          ...headers,
        }
        return `import requests
import json

url = '${url}'
headers = ${JSON.stringify(pythonHeaders, null, 4)}
data = ${JSON.stringify(exampleData, null, 2)}

response = requests.${method.toLowerCase()}(url, 
    headers=headers,
    json=data
)

print(response.json())`

      case "Go":
        const goHeaders = Object.entries({
          "Content-Type": "application/json",
          ...headers,
        })
          .map(([key, value]) => `    req.Header.Set("${key}", "${value}")`)
          .join("\n")

        return `package main

import (
    "bytes"
    "encoding/json"
    "fmt"
    "net/http"
)

func main() {
    url := "${url}"
    data := ${JSON.stringify(exampleData, null, 2)}
    
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("${method}", url, bytes.NewBuffer(jsonData))
${goHeaders}
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    fmt.Println("Response Status:", resp.Status)
}`

      default:
        return ""
    }
  }

  const renderCodePanel = () => {
    if (!activeConfig) return null

    return (
      <div className="hidden lg:block w-[400px] bg-gray-900 text-white h-screen overflow-y-auto flex-shrink-0">
        <div className="border-b border-gray-700">
          <div className="flex">
            {["HTTP", "JavaScript", "PHP", "Python", "Go"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2 py-3 text-xs font-medium flex-1 ${activeTab === tab
                  ? "bg-gray-800 text-white border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Definition</h3>
            <div className="bg-gray-800 rounded p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-blue-600 text-white text-xs">{activeConfig.method}</Badge>
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-sm font-mono truncate" title={activeConfig.urlDefinition}>
                    {activeConfig.urlDefinition}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-white flex-shrink-0"
                    onClick={() => copyToClipboard(activeConfig.urlDefinition)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Example Request</h3>
            <div className="bg-gray-800 rounded p-3 overflow-x-auto">
              <pre className="text-xs text-green-400 whitespace-pre-wrap">
                {generateCodeExample(activeConfig, activeTab)}
              </pre>
            </div>
          </div>

          {activeConfig.validExamples[0] && (
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-3">Example Response</h3>
              <div className="bg-gray-800 rounded p-3 overflow-x-auto">
                <pre className="text-xs text-blue-400">
                  {JSON.stringify(activeConfig.validExamples[0].bodyResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderMainContent = () => {
    if (activeDescriptiveConfig) {
      return (
        <div className="w-full overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
            <h1 className="text-lg font-semibold text-gray-900">API Documentation</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 md:p-8">
            <div className="w-full">
              <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{activeDescriptiveConfig.title}</h1>
                <p className="text-base md:text-lg text-gray-600 mb-6">{activeDescriptiveConfig.description}</p>
              </div>

              <div className="space-y-6">
                {activeDescriptiveConfig.content.map((item, index) => renderContentItem(item, index))}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (!activeConfig) {
      return (
        <div className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
            <h1 className="text-lg font-semibold text-gray-900">API Documentation</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 md:p-8">
            <div className="max-w-4xl">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
              <p className="text-gray-600">Select an endpoint from the sidebar to view its documentation.</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-gray-900">API Documentation</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileCode(!showMobileCode)}
              className="p-2"
            >
              {showMobileCode ? (
                <FileText className="h-5 w-5" />
              ) : (
                <Code className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="max-w-4xl">
            {!showMobileCode ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{activeConfig.title.replace("API de ", "")}</h1>
                  <p className="text-base md:text-lg text-gray-600 mb-4">{activeConfig.description}</p>

                  <div className="text-sm text-gray-500 mb-6">
                    GoSquared events are a versatile way of tracking anything that is happening on your site or app. User
                    actions, application errors, state transitions, and activity of all kinds can be tracked as an event.
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    Event names are searchable and displayed in{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      People Analytics
                    </a>
                    . Top events are aggregated by name in{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Trends
                    </a>
                    .
                  </div>

                  <div className="text-sm text-gray-500 mb-8">
                    Events are automatically associated with a user if given a{" "}
                    <code className="bg-gray-100 px-1 rounded">person_id</code>.
                  </div>
                </div>
                {
                  activeConfig.characterJsonParamsSend.length > 0 ?
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Params</h2>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-semibold">Parameter</TableHead>
                              <TableHead className="font-semibold">Type</TableHead>
                              <TableHead className="font-semibold">Required</TableHead>
                              <TableHead className="font-semibold">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {renderFieldsTable(activeConfig.characterJsonParamsSend)}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    : <></>
                }

                {
                  activeConfig.characterJsonBodySend.length > 0 ?
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Body</h2>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50">
                              <TableHead className="font-semibold">Parameter</TableHead>
                              <TableHead className="font-semibold">Type</TableHead>
                              <TableHead className="font-semibold">Required</TableHead>
                              <TableHead className="font-semibold">Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {renderFieldsTable(activeConfig.characterJsonBodySend)}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    : <></>}

                {activeConfig.requirements.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <ul className="space-y-2">
                        {activeConfig.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-blue-800">{req.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Valid Examples</h2>
                    <div className="space-y-6">
                      {activeConfig.validExamples.map((ejemplo, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                          <h3 className="font-semibold text-lg mb-2">{ejemplo.title}</h3>
                          <p className="text-gray-600 mb-4">{ejemplo.description}</p>

                          <div className={"grid md:grid-cols-2 gap-4" + ejemplo.bodySend && "md:grid-cols-1"}>
                            {
                              ejemplo.bodySend &&
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <Label className="font-medium text-sm">Request</Label>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(JSON.stringify(ejemplo.bodySend, null, 2))}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                                <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto border">
                                  {JSON.stringify(ejemplo.bodySend, null, 2)}
                                </pre>
                              </div>
                            }

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="font-medium text-sm">Response</Label>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(JSON.stringify(ejemplo.bodyResponse, null, 2))}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <pre className="bg-green-50 p-3 rounded text-sm overflow-x-auto border border-green-200">
                                {JSON.stringify(ejemplo.bodyResponse, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Error Examples</h2>
                    <div className="space-y-6">
                      {activeConfig.invalidExamples.map((ejemplo, index) => (
                        <div key={index} className="bg-white border border-red-200 rounded-lg p-6">
                          <h3 className="font-semibold text-lg mb-2 text-red-800">{ejemplo.title}</h3>
                          <p className="text-gray-600 mb-4">{ejemplo.description}</p>

                          <div className={"grid md:grid-cols-2 gap-4" + ejemplo.bodySend && "md:grid-cols-1"}>
                            {
                              ejemplo.bodySend &&
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <Label className="font-medium text-sm">Request</Label>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(JSON.stringify(ejemplo.bodySend, null, 2))}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                                <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto border">
                                  {JSON.stringify(ejemplo.bodySend, null, 2)}
                                </pre>
                              </div>
                            }

                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <Label className="font-medium text-sm">Error Response</Label>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(JSON.stringify(ejemplo.bodyResponse, null, 2))}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <pre className="bg-red-50 p-3 rounded text-sm overflow-x-auto border border-red-200">
                                {JSON.stringify(ejemplo.bodyResponse, null, 2)}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Mobile Code Examples - Replace content */
              <div className="lg:hidden">
                <div className="mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Code Examples</h1>
                  <p className="text-base md:text-lg text-gray-600 mb-4">
                    {activeConfig.title.replace("API de ", "")} - Implementation examples
                  </p>
                </div>

                <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
                  <div className="border-b border-gray-700">
                    <div className="flex overflow-x-auto">
                      {["HTTP", "JavaScript", "PHP", "Python", "Go"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === tab
                            ? "bg-gray-800 text-white border-b-2 border-blue-400"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Definition</h3>
                      <div className="bg-gray-800 rounded p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-600 text-white text-xs">{activeConfig.method}</Badge>
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <span className="text-sm font-mono truncate" title={activeConfig.urlDefinition}>
                              {activeConfig.urlDefinition}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-white flex-shrink-0"
                              onClick={() => copyToClipboard(activeConfig.urlDefinition)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">Example Request</h3>
                      <div className="bg-gray-800 rounded p-3 overflow-x-auto">
                        <pre className="text-xs text-green-400 whitespace-pre-wrap">
                          {generateCodeExample(activeConfig, activeTab)}
                        </pre>
                      </div>
                    </div>

                    {activeConfig.validExamples[0] && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-300 mb-3">Example Response</h3>
                        <div className="bg-gray-800 rounded p-3 overflow-x-auto">
                          <pre className="text-xs text-blue-400">
                            {JSON.stringify(activeConfig.validExamples[0].bodyResponse, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="flex h-full">
        {renderSidebar()}
        {renderMainContent()}
        {activeConfig && renderCodePanel()}
      </div>
    </div>
  )
}
