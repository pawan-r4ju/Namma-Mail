import { useState } from "react"
import { ArrowLeft, Send, Paperclip, X, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DUMMY_CONTACTS = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Wilson", email: "bob@example.com" },
  { name: "Carol Brown", email: "carol@example.com" },
]

interface Recipient {
  email: string;
  type: 'to' | 'cc' | 'bcc';
}

export function IndividualMail() {
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [recipients, setRecipients] = useState<Recipient[]>([])
  const [attachments, setAttachments] = useState<File[]>([])
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)

  const addRecipient = (email: string, type: 'to' | 'cc' | 'bcc') => {
    setRecipients([...recipients, { email, type }])
  }

  const removeRecipient = (email: string, type: 'to' | 'cc' | 'bcc') => {
    setRecipients(recipients.filter(r => !(r.email === email && r.type === type)))
  }

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)])
    }
  }

  const removeAttachment = (name: string) => {
    setAttachments(attachments.filter(file => file.name !== name))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">New Mail</h1>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Select Recipients
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Recipients</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {DUMMY_CONTACTS.map(contact => (
                      <div key={contact.email} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.email}</p>
                        </div>
                        <Select
                          onValueChange={(value) => {
                            if (value === "remove") {
                              removeRecipient(contact.email, "to")
                              removeRecipient(contact.email, "cc")
                              removeRecipient(contact.email, "bcc")
                            } else {
                              addRecipient(contact.email, value as 'to' | 'cc' | 'bcc')
                            }
                          }}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Add to..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="to">To</SelectItem>
                            <SelectItem value="cc">CC</SelectItem>
                            <SelectItem value="bcc">BCC</SelectItem>
                            <SelectItem value="remove">Remove</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              {!showCc && !showBcc && (
                <Button variant="ghost" size="sm" onClick={() => setShowCc(true)}>
                  Add Cc
                </Button>
              )}
              {!showBcc && (
                <Button variant="ghost" size="sm" onClick={() => setShowBcc(true)}>
                  Add Bcc
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {recipients.filter(r => r.type === "to").map(recipient => (
                  <Badge key={recipient.email} variant="secondary">
                    {recipient.email}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => removeRecipient(recipient.email, "to")}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              {showCc && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cc:</p>
                  <div className="flex flex-wrap gap-2">
                    {recipients.filter(r => r.type === "cc").map(recipient => (
                      <Badge key={recipient.email} variant="secondary">
                        {recipient.email}
                        <button
                          className="ml-1 hover:text-destructive"
                          onClick={() => removeRecipient(recipient.email, "cc")}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {showBcc && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bcc:</p>
                  <div className="flex flex-wrap gap-2">
                    {recipients.filter(r => r.type === "bcc").map(recipient => (
                      <Badge key={recipient.email} variant="secondary">
                        {recipient.email}
                        <button
                          className="ml-1 hover:text-destructive"
                          onClick={() => removeRecipient(recipient.email, "bcc")}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <Textarea
            placeholder="Write your message here..."
            className="min-h-[300px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {attachments.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Attachments:</p>
              <div className="flex flex-wrap gap-2">
                {attachments.map(file => (
                  <Badge key={file.name} variant="secondary">
                    {file.name}
                    <button
                      className="ml-1 hover:text-destructive"
                      onClick={() => removeAttachment(file.name)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleAttachment}
            />
            <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
              <Paperclip className="mr-2 h-4 w-4" /> Attach
            </Button>
            <Button variant="ghost" onClick={() => {
              setSubject("")
              setBody("")
              setRecipients([])
              setAttachments([])
            }}>
              Discard
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => {
        
            }}>
              Save as Draft
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}