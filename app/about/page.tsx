import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Building, GraduationCap, Code } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Creator</h1>
          <p className="text-xl text-gray-600">Meet the developer behind this API documentation template</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Code className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Albert Araya</CardTitle>
                  <CardDescription>Full Stack Developer</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Full-stack software developer with over 7 years of experience, passionate about process standardization and creating tools that simplify web development.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="h-4 w-4" />
                <span>aaraya.dev@gmail.com</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>WebStyle Studios</CardTitle>
                  <CardDescription>Agencia de Desarrollo Web</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                A company specializing in website and application development, we are the official sponsor of this API documentation template.
              </p>
              <p className="text-sm text-gray-500">
                Committed to excellence in web development and technological innovation.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to contact me?</h2>
          <p className="text-gray-600 mb-6">
            If you have questions about the template or need custom development, please don't hesitate to contact me.
          </p>
          <Button asChild size="lg">
            <a href="mailto:aaraya.dev@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
