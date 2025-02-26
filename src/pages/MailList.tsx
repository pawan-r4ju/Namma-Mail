import { useState } from "react"
import { Mail, Search, Star, Trash2, AlertCircle, Inbox, Archive, Tag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Email, EmailFilter } from "@/lib/types"
import { cn } from "@/lib/utils"

const LABELS = ["Work", "Personal", "Important", "Project", "Client", "Follow-up", "Urgent", "Archive"]

const DUMMY_EMAILS: Email[] = [
  {
    id: 1,
    sender: "Sarah Johnson",
    email: "sarah.j@acmecorp.com",
    subject: "Q2 Marketing Strategy Review",
    preview: "I've reviewed the proposed marketing strategy for Q2 and have some suggestions for improvement...",
    time: "10m ago",
    starred: true,
    read: false,
    labels: ["Work", "Important"],
    important: true,
    attachments: [
      { name: "Q2_Strategy.pdf", size: 2500000, type: "application/pdf" },
      { name: "Budget_Overview.xlsx", size: 1800000, type: "application/xlsx" }
    ],
    folder: "inbox",
    recipients: { to: ["team@acmecorp.com"], cc: ["management@acmecorp.com"], bcc: [] }
  },
  {
    id: 2,
    sender: "David Chen",
    email: "david.chen@techstart.io",
    subject: "New Project Proposal: AI Integration",
    preview: "Based on our discussion last week, I've put together a comprehensive proposal for integrating AI into our platform...",
    time: "45m ago",
    starred: false,
    read: true,
    labels: ["Project", "Client"],
    important: true,
    attachments: [
      { name: "AI_Proposal.pdf", size: 3200000, type: "application/pdf" }
    ],
    folder: "inbox",
    recipients: { to: ["product@techstart.io"], cc: [], bcc: [] }
  },
  {
    id: 3,
    sender: "Emma Wilson",
    email: "emma@designco.com",
    subject: "Updated Website Mockups",
    preview: "Here are the latest mockups incorporating the feedback from yesterday's meeting. I've made adjustments to the color scheme and typography...",
    time: "2h ago",
    starred: true,
    read: false,
    labels: ["Work", "Client"],
    important: false,
    attachments: [
      { name: "Homepage_v2.fig", size: 4500000, type: "application/figma" },
      { name: "Style_Guide.pdf", size: 1200000, type: "application/pdf" }
    ],
    folder: "inbox",
    recipients: { to: ["design@company.com"], cc: ["client@client.com"], bcc: [] }
  },
  {
    id: 4,
    sender: "Michael Brown",
    email: "m.brown@finance.com",
    subject: "Monthly Financial Report - March 2024",
    preview: "Please find attached the financial report for March 2024. Key highlights include a 15% increase in revenue and cost optimization...",
    time: "3h ago",
    starred: false,
    read: true,
    labels: ["Work", "Important"],
    important: true,
    attachments: [
      { name: "March_2024_Finance.pdf", size: 2800000, type: "application/pdf" },
      { name: "Revenue_Analysis.xlsx", size: 1500000, type: "application/xlsx" }
    ],
    folder: "inbox",
    recipients: { to: ["finance@company.com"], cc: ["executives@company.com"], bcc: [] }
  },
  {
    id: 5,
    sender: "Lisa Anderson",
    email: "l.anderson@support.com",
    subject: "Customer Feedback Summary",
    preview: "Here's a compilation of customer feedback from the past week. Several users have reported issues with the new feature...",
    time: "5h ago",
    starred: false,
    read: false,
    labels: ["Work", "Urgent"],
    important: true,
    attachments: [],
    folder: "inbox",
    recipients: { to: ["product@company.com"], cc: [], bcc: [] }
  },
  {
    id: 6,
    sender: "James Wilson",
    email: "james@consulting.com",
    subject: "Project Timeline Update",
    preview: "After reviewing the current progress, I've updated the project timeline. We might need to adjust some deadlines...",
    time: "Yesterday",
    starred: true,
    read: true,
    labels: ["Project", "Follow-up"],
    important: false,
    attachments: [
      { name: "Updated_Timeline.pdf", size: 1900000, type: "application/pdf" }
    ],
    folder: "inbox",
    recipients: { to: ["team@company.com"], cc: ["management@company.com"], bcc: [] }
  },
  {
    id: 7,
    sender: "Alex Martinez",
    email: "alex.m@tech.com",
    subject: "API Documentation Updates",
    preview: "I've updated the API documentation with the new endpoints we discussed. Please review and let me know if any changes are needed...",
    time: "Yesterday",
    starred: false,
    read: true,
    labels: ["Work", "Technical"],
    important: false,
    attachments: [],
    folder: "inbox",
    recipients: { to: ["dev@company.com"], cc: [], bcc: [] }
  },
  {
    id: 8,
    sender: "Rachel Green",
    email: "rachel@marketing.com",
    subject: "Social Media Campaign Results",
    preview: "The results from our recent social media campaign are in. We've seen a significant increase in engagement across all platforms...",
    time: "2 days ago",
    starred: true,
    read: true,
    labels: ["Work", "Marketing"],
    important: true,
    attachments: [
      { name: "Campaign_Results.pdf", size: 3500000, type: "application/pdf" },
      { name: "Social_Analytics.xlsx", size: 2100000, type: "application/xlsx" }
    ],
    folder: "inbox",
    recipients: { to: ["marketing@company.com"], cc: ["executives@company.com"], bcc: [] }
  }
]

export function MailList() {
  const [emails, setEmails] = useState<Email[]>(DUMMY_EMAILS)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentFilter, setCurrentFilter] = useState<EmailFilter>("all")
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])

  const toggleStar = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ))
  }

  const toggleImportant = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, important: !email.important } : email
    ))
  }

  const toggleRead = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, read: !email.read } : email
    ))
  }

  const addLabel = (emailId: number, label: string) => {
    setEmails(emails.map(email => 
      email.id === emailId
        ? { ...email, labels: [...new Set([...email.labels, label])] }
        : email
    ))
  }

  const removeLabel = (emailId: number, label: string) => {
    setEmails(emails.map(email => 
      email.id === emailId
        ? { ...email, labels: email.labels.filter(l => l !== label) }
        : email
    ))
  }

  const deleteEmails = (ids: number[]) => {
    setEmails(emails.filter(email => !ids.includes(email.id)))
    setSelectedEmails([])
  }

  const filteredEmails = emails
    .filter(email => {
      const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          email.preview.toLowerCase().includes(searchQuery.toLowerCase())

      switch (currentFilter) {
        case "unread":
          return !email.read && matchesSearch
        case "starred":
          return email.starred && matchesSearch
        case "important":
          return email.important && matchesSearch
        default:
          return matchesSearch
      }
    })

  const stats = {
    all: emails.length,
    unread: emails.filter(e => !e.read).length,
    starred: emails.filter(e => e.starred).length,
    important: emails.filter(e => e.important).length
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Mail List</h1>
          <div className="flex gap-2">
            {Object.entries(stats).map(([key, count]) => (
              <Button
                key={key}
                variant={currentFilter === key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setCurrentFilter(key as EmailFilter)}
                className="text-sm"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} ({count})
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search emails..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Mail className="mr-2 h-4 w-4" /> New Mail
          </Button>
        </div>
      </div>

      <Card>
        <div className="p-2 border-b flex items-center gap-2">
          {selectedEmails.length > 0 ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedEmails([])}
              >
                Deselect All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteEmails(selectedEmails)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Add Label
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {LABELS.map(label => (
                    <DropdownMenuItem
                      key={label}
                      onClick={() => selectedEmails.forEach(id => addLabel(id, label))}
                    >
                      {label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedEmails(emails.map(e => e.id))}
            >
              Select All
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={cn(
                "flex items-center gap-4 p-4 border-b hover:bg-muted/50 cursor-pointer",
                !email.read && "bg-muted/20",
                selectedEmails.includes(email.id) && "bg-muted"
              )}
              onClick={() => {
                if (selectedEmails.length > 0) {
                  setSelectedEmails(prev => 
                    prev.includes(email.id)
                      ? prev.filter(id => id !== email.id)
                      : [...prev, email.id]
                  )
                } else {
                  toggleRead(email.id)
                }
              }}
            >
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleStar(email.id)
                  }}
                >
                  <Star 
                    className={`h-4 w-4 ${
                      email.starred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }`} 
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleImportant(email.id)
                  }}
                >
                  <AlertCircle
                    className={`h-4 w-4 ${
                      email.important ? "fill-red-400 text-red-400" : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <div className="w-48">
                  <p className="font-medium">{email.sender}</p>
                  <p className="text-sm text-muted-foreground">{email.email}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{email.subject}</p>
                  {email.attachments.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Inbox className="h-3 w-3 mr-1" />
                      {email.attachments.length}
                    </Badge>
                  )}
                  {email.labels.map(label => (
                    <Badge 
                      key={label}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeLabel(email.id, label)
                      }}
                    >
                      {label} ×
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {email.preview}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">{email.time}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteEmails([email.id])
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  )
}