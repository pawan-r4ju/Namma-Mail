import { Users, Calendar, Settings, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

export function TeamLead() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Team Lead Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Tasks and Delegation</h3>
              <p className="text-sm text-muted-foreground">Manage team tasks and assignments</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Team Members</h3>
              <p className="text-sm text-muted-foreground">View and manage team members</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}