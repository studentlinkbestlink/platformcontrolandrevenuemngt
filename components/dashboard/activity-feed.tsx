import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Package, ShoppingCart, Truck, DollarSign, AlertCircle } from "lucide-react"

interface ActivityItem {
  id: string
  type: "order" | "product" | "shipment" | "payment" | "alert"
  title: string
  description: string
  timestamp: string
  user?: string
  status?: "success" | "warning" | "error" | "info"
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    description: "Order #12847 from John Smith - $234.99",
    timestamp: "2 minutes ago",
    user: "John Smith",
    status: "success",
  },
  {
    id: "2",
    type: "product",
    title: "Product Updated",
    description: "iPhone 15 Pro inventory updated by Sarah Johnson",
    timestamp: "15 minutes ago",
    user: "Sarah Johnson",
    status: "info",
  },
  {
    id: "3",
    type: "shipment",
    title: "Shipment Delayed",
    description: "Shipment #SH-4821 delayed due to weather conditions",
    timestamp: "1 hour ago",
    status: "warning",
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Processed",
    description: "Vendor payout of $1,247.50 processed successfully",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    id: "5",
    type: "alert",
    title: "System Alert",
    description: "High server load detected - auto-scaling initiated",
    timestamp: "3 hours ago",
    status: "error",
  },
]

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "order":
        return ShoppingCart
      case "product":
        return Package
      case "shipment":
        return Truck
      case "payment":
        return DollarSign
      case "alert":
        return AlertCircle
      default:
        return Clock
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "bg-success/20 text-success"
      case "warning":
        return "bg-warning/20 text-warning"
      case "error":
        return "bg-destructive/20 text-destructive"
      case "info":
        return "bg-chart-2/20 text-chart-2"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <Card className="card-gradient border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest updates and notifications from your platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{activity.title}</h4>
                    {activity.status && (
                      <Badge variant="secondary" className={`text-xs ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex items-center gap-2">
                    {activity.user && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-xs bg-primary/20 text-primary">
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
