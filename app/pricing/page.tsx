import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works best for your documentation needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">Free Template</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">USD</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Complete template source code</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>JSON-based configuration</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Interactive API examples</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Multi-language code samples</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Responsive design</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Basic documentation</span>
                </li>
              </ul>
              <Button className="w-full bg-transparent" variant="outline">
                <a href="https://github.com/JTemplates/JDoc-API/blob/main/INSTALL.md" target="_blank" rel="noopener noreferrer">
                  Download Template
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-2 border-blue-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Coming Soon
              </span>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl">Enterprise Solutions</CardTitle>
              <CardDescription>Custom development and support</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">Próximamente</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Custom template development</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Advanced integrations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Team collaboration features</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Other surprises</span>
                </li>
              </ul>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need something customized? Contact us for business solutions.
          </p>
          <Button variant="outline" asChild>
            <a href="mailto:aaraya.dev@gmail.com">Contact me</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
