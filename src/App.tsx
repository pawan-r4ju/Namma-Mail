import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { RoleSwitcher } from "@/components/role-switcher"
import { MailList } from "@/pages/MailList"
import { IndividualMail } from "@/pages/IndividualMail"
import { CustomerAddressList } from "@/pages/CustomerAddressList"
import { EmailDrafting } from "@/pages/EmailDrafting"
import { AdminSettings } from "@/pages/AdminSettings"
import { TeamLead } from "@/pages/TeamLead"
import { LoginForm } from "@/components/auth/LoginForm"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, Settings, UserCog, LogOut } from "lucide-react"
import { AuthProvider, useAuth } from "@/lib/auth"

type Page = "mail-list" | "individual-mail" | "customer-list" | "email-draft" | "admin" | "team-lead"

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("mail-list")
  const { user, logout } = useAuth()

  if (!user) {
    return <LoginForm />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "mail-list":
        return <MailList />
      case "individual-mail":
        return <IndividualMail />
      case "customer-list":
        return <CustomerAddressList />
      case "email-draft":
        return <EmailDrafting />
      case "admin":
        return <AdminSettings />
      case "team-lead":
        return <TeamLead />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <Mail className="h-6 w-6" />
            <span className="text-lg">Namma Mail</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{user.name}</span>
              <Badge variant="secondary" className="capitalize">{user.role}</Badge>
            </div>
            <RoleSwitcher />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="w-64 border-r bg-card p-6 space-y-6">
          <nav className="space-y-2">
            <Button
              variant={currentPage === "mail-list" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPage("mail-list")}
            >
              <Mail className="h-4 w-4" /> Mail List
            </Button>
            <Button
              variant={currentPage === "individual-mail" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPage("individual-mail")}
            >
              <Mail className="h-4 w-4" /> Individual Mail
            </Button>
            <Button
              variant={currentPage === "customer-list" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPage("customer-list")}
            >
              <Users className="h-4 w-4" /> Customer List
            </Button>
            <Button
              variant={currentPage === "email-draft" ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => setCurrentPage("email-draft")}
            >
              <Mail className="h-4 w-4" /> Email Draft
            </Button>
            {(user?.role === "admin") && (
              <Button
                variant={currentPage === "admin" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setCurrentPage("admin")}
              >
                <Settings className="h-4 w-4" /> Admin Settings
              </Button>
            )}
            {(user?.role === "team-lead" || user?.role === "admin") && (
              <Button
                variant={currentPage === "team-lead" ? "secondary" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => setCurrentPage("team-lead")}
              >
                <UserCog className="h-4 w-4" /> Team Lead
              </Button>
            )}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-background">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="namma-mail-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App