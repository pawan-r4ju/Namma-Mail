import { useState } from "react"
import { Search, Plus, Building, ArrowUp, ArrowDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { useNavigate } from "react-router-dom"

const CUSTOMER_DATA = [
  {
    id: 1,
    companyName: "Acme Corporation",
    contact: "John Smith",
    email: "john@acme.com",
    address: "123 Business Ave, New York, NY 10001",
    industry: "Technology",
    employees: 500,
    yearFounded: 1990
  },
  {
    id: 2,
    companyName: "Blue Ocean Industries",
    contact: "Sarah Johnson",
    email: "sarah@blueocean.com",
    address: "456 Marina Drive, Miami, FL 33101",
    industry: "Manufacturing",
    employees: 1200,
    yearFounded: 1985
  },
  {
    id: 3,
    companyName: "Green Earth Foods",
    contact: "Michael Brown",
    email: "michael@greenearth.com",
    address: "789 Organic Lane, Portland, OR 97201",
    industry: "Food & Beverage",
    employees: 300,
    yearFounded: 2005
  },
  {
    id: 4,
    companyName: "Digital Dynamics",
    contact: "Emma Wilson",
    email: "emma@digitaldynamics.com",
    address: "321 Tech Park, San Francisco, CA 94105",
    industry: "Software",
    employees: 750,
    yearFounded: 2010
  },
  {
    id: 5,
    companyName: "Global Logistics Co",
    contact: "David Chen",
    email: "david@globallogistics.com",
    address: "567 Harbor Blvd, Seattle, WA 98101",
    industry: "Transportation",
    employees: 2000,
    yearFounded: 1975
  },
  {
    id: 6,
    companyName: "Innovative Healthcare",
    contact: "Lisa Anderson",
    email: "lisa@innovhealth.com",
    address: "890 Medical Center Dr, Boston, MA 02115",
    industry: "Healthcare",
    employees: 1500,
    yearFounded: 1995
  },
  {
    id: 7,
    companyName: "Summit Financial",
    contact: "Robert Taylor",
    email: "robert@summitfin.com",
    address: "432 Wall Street, New York, NY 10005",
    industry: "Finance",
    employees: 800,
    yearFounded: 1988
  },
  {
    id: 8,
    companyName: "Creative Studios",
    contact: "Jessica Lee",
    email: "jessica@creativestudios.com",
    address: "765 Arts District, Los Angeles, CA 90012",
    industry: "Entertainment",
    employees: 250,
    yearFounded: 2015
  },
  {
    id: 9,
    companyName: "EcoBuilders Construction",
    contact: "James Wilson",
    email: "james@ecobuilders.com",
    address: "543 Green Building Way, Denver, CO 80202",
    industry: "Construction",
    employees: 450,
    yearFounded: 2000
  },
  {
    id: 10,
    companyName: "Smart Energy Solutions",
    contact: "Maria Garcia",
    email: "maria@smartenergy.com",
    address: "876 Solar Road, Phoenix, AZ 85001",
    industry: "Energy",
    employees: 600,
    yearFounded: 2008
  }
]

export function CustomerAddressList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [customers, setCustomers] = useState(CUSTOMER_DATA)

  const sortCustomers = () => {
    const sorted = [...customers].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.companyName.localeCompare(b.companyName)
      } else {
        return b.companyName.localeCompare(a.companyName)
      }
    })
    setCustomers(sorted)
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const filteredCustomers = customers.filter(customer =>
    customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Customer Address List</h1>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10 w-[300px]"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={sortCustomers}>
            Sort by Company
            {sortOrder === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Card>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Founded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.companyName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>{customer.industry}</TableCell>
                  <TableCell>{customer.employees.toLocaleString()}</TableCell>
                  <TableCell>{customer.yearFounded}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  )
}