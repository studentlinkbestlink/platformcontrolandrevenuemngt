import { EnhancedStatCard } from "./enhanced-stat-card"
import { ActivityFeed } from "./activity-feed"
import { QuickActions } from "./quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Truck, Package, MapPin, Clock, Navigation, Camera, Route, AlertTriangle } from "lucide-react"
import { mockShipments, mockLogisticsPartners } from "@/lib/mock-data"

export function LogisticsDashboard() {
  const partnerId = "LP-001" // Current logistics partner ID
  const partner = mockLogisticsPartners.find((p) => p.id === partnerId)
  const assignedShipments = mockShipments.filter((s) => s.logisticsPartnerId === partnerId)

  const activeDeliveries = assignedShipments.filter((s) =>
    ["pending", "picked_up", "in_transit", "out_for_delivery"].includes(s.status),
  ).length
  const completedToday = assignedShipments.filter(
    (s) =>
      s.status === "delivered" &&
      s.actualDelivery &&
      new Date(s.actualDelivery).toDateString() === new Date().toDateString(),
  ).length
  const avgDeliveryTime = "2.4 hrs" // Mock calculation
  const successRate = partner?.onTimeRate || 98.5

  const assignedDeliveries = assignedShipments.slice(0, 5).map((shipment) => ({
    id: shipment.id,
    orderId: shipment.orderId,
    customer: "Customer Name", // Would come from customer data
    address: `${shipment.destination.address}, ${shipment.destination.city}`,
    status: shipment.status,
    estimatedDelivery: shipment.estimatedDelivery.toLocaleDateString(),
    trackingNumber: shipment.trackingNumber,
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30"
      case "picked_up":
      case "in_transit":
        return "bg-primary/20 text-primary border-primary/30"
      case "out_for_delivery":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "delivered":
        return "bg-success/20 text-success border-success/30"
      case "failed":
      case "returned":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Active Deliveries"
          value={activeDeliveries.toString()}
          description="Currently assigned"
          icon={Truck}
          color="primary"
        />
        <EnhancedStatCard
          title="Completed Today"
          value={completedToday.toString()}
          description="Deliveries completed"
          icon={Package}
          trend={{ value: 15.2, label: "from yesterday", isPositive: true }}
          color="success"
        />
        <EnhancedStatCard
          title="Average Delivery Time"
          value={avgDeliveryTime}
          description="This week"
          icon={Clock}
          trend={{ value: 8.1, label: "improvement", isPositive: true }}
          color="chart-2"
        />
        <EnhancedStatCard
          title="Success Rate"
          value={`${successRate}%`}
          description="On-time deliveries"
          icon={MapPin}
          trend={{ value: 2.1, label: "from last month", isPositive: true }}
          color="chart-3"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Assigned Deliveries */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Assigned Deliveries
              </CardTitle>
              <CardDescription>Your current delivery assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-foreground">{delivery.orderId}</p>
                        <Badge className={getStatusColor(delivery.status)} variant="outline">
                          {delivery.status.replace(/[_-]/g, " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                      <p className="text-xs text-muted-foreground">{delivery.address}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Est. delivery: {delivery.estimatedDelivery}</span>
                        <span>•</span>
                        <span>Tracking: {delivery.trackingNumber}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="hover:bg-primary/10 bg-transparent">
                        <Navigation className="h-4 w-4 mr-1" />
                        Navigate
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-success/10 bg-transparent">
                        <Camera className="h-4 w-4 mr-1" />
                        Photo
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Map */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="h-5 w-5 text-chart-2" />
                Delivery Routes
              </CardTitle>
              <CardDescription>Optimized routes for today's deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-chart-2/5 to-primary/5 rounded-lg border border-border/50">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-chart-2 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-foreground mb-2">Route Optimization</p>
                  <p className="text-sm text-muted-foreground">Interactive delivery map will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <QuickActions userRole="logistics" />
          <ActivityFeed />
        </div>
      </div>

      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Delivery Management
          </CardTitle>
          <CardDescription>Update delivery status and manage routes efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto p-4 justify-start bg-primary hover:bg-primary/90 glow-primary">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-primary-foreground">Update Status</div>
                  <div className="text-sm text-primary-foreground/80">Track progress</div>
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start bg-success hover:bg-success/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success-foreground/20 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5 text-success-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-success-foreground">Upload Proof</div>
                  <div className="text-sm text-success-foreground/80">Delivery photos</div>
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start bg-chart-2 hover:bg-chart-2/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Contact Customer</div>
                  <div className="text-sm text-white/80">Communication</div>
                </div>
              </div>
            </Button>

            <Button className="h-auto p-4 justify-start bg-warning hover:bg-warning/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning-foreground/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-warning-foreground">Report Issue</div>
                  <div className="text-sm text-warning-foreground/80">Handle problems</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
