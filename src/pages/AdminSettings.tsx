import { useState } from "react"
import {
  Users,
  Settings,
  Bell,
  Database,
  BarChart,
  Lock,
  MessageSquare,
  UserPlus,
  Trash2,
  Search
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Role } from "@/lib/types"

const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: "2024-03-20",
    lastLogin: "2024-03-25"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "team-lead",
    createdAt: "2024-03-15",
    lastLogin: "2024-03-24"
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2024-03-10",
    lastLogin: "2024-03-25"
  }
]

export function AdminSettings() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user" as Role
  })

  const addUser = () => {
    const user: User = {
      id: (users.length + 1).toString(),
      ...newUser,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: "-"
    }
    setUsers([...users, user])
    setNewUser({ name: "", email: "", role: "user" })
  }

  const removeUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Users</h3>
              <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">Configure security settings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">View system analytics and reports</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage notification settings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Storage</h3>
              <p className="text-sm text-muted-foreground">Manage data and storage settings</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Chat</h3>
              <p className="text-sm text-muted-foreground">Configure chat settings</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">User Management</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={newUser.role}
                        onValueChange={(value: Role) => setNewUser({ ...newUser, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="team-lead">Team Lead</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={addUser}>
                      Add User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}