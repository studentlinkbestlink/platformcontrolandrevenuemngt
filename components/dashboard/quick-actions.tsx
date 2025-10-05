import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Download, Settings, Users, Package, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"

interface QuickAction {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: "primary" | "success" | "warning" | "chart-2"
}

interface QuickActionsProps {
  userRole: string
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const getActionsForRole = (role: string): QuickAction[] => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Add New User",
            description: "Invite team members",
            icon: Users,
            href: "/users",
            color: "primary",
          },
          {
            title: "Generate Report",
            description: "Create analytics report",
            icon: FileText,
            href: "/reports",
            color: "success",
          },
          {
            title: "System Settings",
            description: "Configure platform",
            icon: Settings,
            href: "/settings",
            color: "warning",
          },
          {
            title: "View Analytics",
            description: "Platform insights",
            icon: BarChart3,
            href: "/analytics",
            color: "chart-2",
          },
        ]
      case "vendor":
        return [
          {
            title: "Add Product",
            description: "List new product",
            icon: Plus,
            href: "/products/new",
            color: "primary",
          },
          {
            title: "Upload Images",
            description: "Product photos",
            icon: Upload,
            href: "/products",
            color: "success",
          },
          {
            title: "View Earnings",
            description: "Check payments",
            icon: Download,
            href: "/payments",
            color: "warning",
          },
          {
            title: "Analytics",
            description: "Sales insights",
            icon: BarChart3,
            href: "/analytics",
            color: "chart-2",
          },
        ]
      case "logistics":
        return [
          {
            title: "Track Shipment",
            description: "Update delivery status",
            icon: Package,
            href: "/logistics",
            color: "primary",
          },
          {
            title: "Generate Report",
            description: "Delivery analytics",
            icon: FileText,
            href: "/reports",
            color: "success",
          },
          {
            title: "Settings",
            description: "Configure routes",
            icon: Settings,
            href: "/settings",
            color: "warning",
          },
          {
            title: "Analytics",
            description: "Performance data",
            icon: BarChart3,
            href: "/analytics",
            color: "chart-2",
          },
        ]
      case "finance":
        return [
          {
            title: "Process Payout",
            description: "Vendor payments",
            icon: Download,
            href: "/payments",
            color: "primary",
          },
          {
            title: "Financial Report",
            description: "Revenue analysis",
            icon: FileText,
            href: "/reports",
            color: "success",
          },
          {
            title: "Settings",
            description: "Payment config",
            icon: Settings,
            href: "/settings",
            color: "warning",
          },
          {
            title: "Analytics",
            description: "Financial insights",
            icon: BarChart3,
            href: "/analytics",
            color: "chart-2",
          },
        ]
      default:
        return []
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/20 text-primary hover:bg-primary/30"
      case "success":
        return "bg-success/20 text-success hover:bg-success/30"
      case "warning":
        return "bg-warning/20 text-warning hover:bg-warning/30"
      case "chart-2":
        return "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30"
      default:
        return "bg-primary/20 text-primary hover:bg-primary/30"
    }
  }

  const actions = getActionsForRole(userRole)

  return (
    <Card className="card-gradient border-border/50">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions for your role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              asChild
              variant="ghost"
              className="h-auto p-4 justify-start hover:bg-card/50 transition-all duration-200 group"
            >
              <Link href={action.href}>
                <div className="flex items-center gap-4 w-full">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${getColorClasses(action.color)}`}
                  >
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-foreground">{action.title}</h4>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
