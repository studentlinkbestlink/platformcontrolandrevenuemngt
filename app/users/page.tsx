import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Search, UserPlus, Filter, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-12-15",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@vendor.com",
      role: "Vendor",
      status: "Active",
      joinDate: "2023-11-20",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@logistics.com",
      role: "Logistics",
      status: "Active",
      joinDate: "2023-10-05",
      lastActive: "3 hours ago",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@finance.com",
      role: "Finance",
      status: "Inactive",
      joinDate: "2023-09-12",
      lastActive: "1 week ago",
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.r@vendor.com",
      role: "Vendor",
      status: "Pending",
      joinDate: "2024-01-10",
      lastActive: "5 minutes ago",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-primary/20 text-primary"
      case "Vendor":
        return "bg-success/20 text-success"
      case "Logistics":
        return "bg-warning/20 text-warning"
      case "Finance":
        return "bg-chart-2/20 text-chart-2"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/20 text-success"
      case "Inactive":
        return "bg-muted/20 text-muted-foreground"
      case "Pending":
        return "bg-warning/20 text-warning"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                User Management
              </h1>
              <p className="text-xl text-muted-foreground">Manage users, roles, and permissions across your platform</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
              <Button asChild className="glow-primary">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,847</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <div className="w-2 h-2 bg-success rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">2,341</div>
              <p className="text-xs text-muted-foreground">82% of total users</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <div className="w-2 h-2 bg-warning rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">284</div>
              <p className="text-xs text-muted-foreground">+8% growth rate</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <div className="w-2 h-2 bg-chart-2 rounded-full" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="card-gradient border-border/50 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users by name, email, or role..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Manage and monitor user accounts across your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Joined {user.joinDate}</span>
                        <span className="text-xs text-muted-foreground">Active {user.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
