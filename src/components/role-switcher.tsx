import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import { UserCircle } from "lucide-react"

export function RoleSwitcher() {
  const { login, user } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserCircle className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch role</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => login("user")}>
          User {user?.role === "user" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => login("team-lead")}>
          Team Lead {user?.role === "team-lead" && "✓"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => login("admin")}>
          Admin {user?.role === "admin" && "✓"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}