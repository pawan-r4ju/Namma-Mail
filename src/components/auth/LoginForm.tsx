import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Mail, Lock, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Alert, AlertDescription } from "@/components/ui/alert"

const VALID_CREDENTIALS = {
  admin: {
    email: "admin@nammamail.in",
    password: "admin123"
  },
  "team-lead": {
    email: "lead@nammamail.in",
    password: "lead123"
  },
  user: {
    email: "user@nammamail.in",
    password: "user123"
  }
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check credentials
    if (email === VALID_CREDENTIALS.admin.email && password === VALID_CREDENTIALS.admin.password) {
      login("admin")
    } else if (email === VALID_CREDENTIALS["team-lead"].email && password === VALID_CREDENTIALS["team-lead"].password) {
      login("team-lead")
    } else if (email === VALID_CREDENTIALS.user.email && password === VALID_CREDENTIALS.user.password) {
      login("user")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold">Welcome to Namma Mail</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Lock className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium mb-2">Demo Credentials:</p>
          <div className="space-y-2 text-sm">
            <p><strong>Admin:</strong> admin@nammamail.in / admin123</p>
            <p><strong>Team Lead:</strong> lead@nammamail.in / lead123</p>
            <p><strong>User:</strong> user@nammamail.in / user123</p>
          </div>
        </div>
      </Card>
    </div>
  )
}