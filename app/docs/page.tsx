import { Header } from "@/components/header"
import { ApiDocumentation } from "@/components/api-documentation"
import { Slidebar } from "@/config/slidebar"



export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <ApiDocumentation sections={Slidebar} />
      </div>
    </div>
  )
}
