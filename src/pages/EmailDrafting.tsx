import { useState } from "react"
import { Users, Send, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

const TEMPLATE_CUSTOMERS = [
  {
    id: 1,
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    industry: "Technology",
    lastContact: "2024-03-15",
    status: "Active",
    tags: ["VIP", "Enterprise"]
  },
  {
    id: 2,
    name: "Global Logistics Ltd",
    email: "info@globallogistics.com",
    industry: "Transportation",
    lastContact: "2024-03-10",
    status: "Active",
    tags: ["Enterprise"]
  },
  {
    id: 3,
    name: "Tech Innovators Inc",
    email: "hello@techinnovators.com",
    industry: "Software",
    lastContact: "2024-03-20",
    status: "Active",
    tags: ["Startup", "Growth"]
  },
  {
    id: 4,
    name: "Healthcare Plus",
    email: "contact@healthcareplus.com",
    industry: "Healthcare",
    lastContact: "2024-03-18",
    status: "Active",
    tags: ["Enterprise", "Priority"]
  },
  {
    id: 5,
    name: "Green Energy Solutions",
    email: "info@greenenergy.com",
    industry: "Energy",
    lastContact: "2024-03-12",
    status: "Active",
    tags: ["Sustainability"]
  },
  {
    id: 6,
    name: "Financial Dynamics",
    email: "contact@findynamics.com",
    industry: "Finance",
    lastContact: "2024-03-19",
    status: "Active",
    tags: ["VIP", "Finance"]
  },
  {
    id: 7,
    name: "Creative Design Co",
    email: "hello@creativedesign.com",
    industry: "Design",
    lastContact: "2024-03-17",
    status: "Active",
    tags: ["Creative", "SMB"]
  },
  {
    id: 8,
    name: "Smart Manufacturing",
    email: "info@smartmanuf.com",
    industry: "Manufacturing",
    lastContact: "2024-03-16",
    status: "Active",
    tags: ["Industry"]
  }
]

const EMAIL_TEMPLATES = [
  {
    id: 1,
    name: "Product Update Announcement",
    subject: "Exciting New Features Coming to [Product Name]",
    content: `Dear [Customer Name],

We're excited to announce the latest updates to [Product Name]. Here are the key highlights:

• Feature 1: [Description]
• Feature 2: [Description]
• Feature 3: [Description]

These updates will be available starting [Date].

Best regards,
[Your Name]`
  },
  {
    id: 2,
    name: "Monthly Newsletter",
    subject: "Your Monthly Update from [Company Name]",
    content: `Hello [Customer Name],

Here's what's new this month:

📈 Industry Updates
[Insert key industry news]

🎉 Company Highlights
[Insert company achievements/news]

💡 Tips & Tricks
[Insert useful tips related to your product/service]

Best regards,
The [Company Name] Team`
  },
  {
    id: 3,
    name: "Event Invitation",
    subject: "You're Invited: [Event Name]",
    content: `Dear [Customer Name],

We're pleased to invite you to [Event Name].

📅 Date: [Date]
🕒 Time: [Time]
📍 Location: [Location/Virtual Link]

Please RSVP by [Date].

Looking forward to seeing you!

Best regards,
[Your Name]`
  }
]

export function EmailDrafting() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [emailContent, setEmailContent] = useState("")

  const filteredCustomers = TEMPLATE_CUSTOMERS.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const toggleCustomerSelection = (id: number) => {
    setSelectedCustomers(prev =>
      prev.includes(id)
        ? prev.filter(customerId => customerId !== id)
        : [...prev, id]
    )
  }

  const selectTemplate = (templateId: number) => {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setEmailContent(template.content)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Email Drafting</h1>
        <div className="ml-auto">
          <Button disabled={selectedCustomers.length === 0 || !emailContent}>
            <Send className="mr-2 h-4 w-4" /> Send to Selected ({selectedCustomers.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-4 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Customer List</h2>
              <Badge variant="secondary">
                {selectedCustomers.length} selected
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCustomers.includes(customer.id)
                        ? "bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => toggleCustomerSelection(customer.id)}
                  >
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                      <div className="flex gap-2 mt-1">
                        {customer.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline">{customer.industry}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        <Card className="col-span-8 p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Email Templates</h2>
              <div className="flex gap-2">
                {EMAIL_TEMPLATES.map(template => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "secondary" : "outline"}
                    onClick={() => selectTemplate(template.id)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your email template here..."
                className="min-h-[calc(100vh-25rem)]"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEmailContent("")}>
                  Clear
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}