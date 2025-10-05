import { EnhancedStatCard } from "./enhanced-stat-card"
import { ActivityFeed } from "./activity-feed"
import { QuickActions } from "./quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Package, ShoppingCart, TrendingUp, Eye, AlertTriangle, Users, BarChart3 } from "lucide-react"
import { mockOrders, mockProducts, mockDisputes } from "@/lib/mock-data"
import Link from "next/link"

export function AdminDashboard() {
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.platformFee, 0)
  const totalOrders = mockOrders.length
  const totalProducts = mockProducts.filter((p) => p.status === "approved").length
  const pendingProducts = mockProducts.filter((p) => p.status === "pending").length
  const openDisputes = mockDisputes.filter((d) => d.status === "open").length

  const recentOrders = mockOrders.slice(0, 5).map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    total: order.total,
    status: order.status,
    date: order.createdAt.toLocaleDateString(),
  }))

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30"
      case "confirmed":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "processing":
        return "bg-primary/20 text-primary border-primary/30"
      case "shipped":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "delivered":
        return "bg-success/20 text-success border-success/30"
      case "cancelled":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Platform Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          description="Commission earnings"
          icon={DollarSign}
          trend={{ value: 20.1, label: "from last month", isPositive: true }}
          color="primary"
        />
        <EnhancedStatCard
          title="Total Orders"
          value={totalOrders.toString()}
          description="All time orders"
          icon={ShoppingCart}
          trend={{ value: 15.3, label: "from last month", isPositive: true }}
          color="success"
        />
        <EnhancedStatCard
          title="Active Products"
          value={totalProducts.toString()}
          description="Approved & listed"
          icon={Package}
          trend={{ value: 8.2, label: "from last month", isPositive: true }}
          color="chart-2"
        />
        <EnhancedStatCard
          title="Open Disputes"
          value={openDisputes.toString()}
          description="Requiring attention"
          icon={AlertTriangle}
          trend={{ value: 12.5, label: "from last month", isPositive: false }}
          color="warning"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Revenue Overview
              </CardTitle>
              <CardDescription>Platform commission earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-lg border border-border/50">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-foreground mb-2">Revenue Analytics</p>
                  <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-success" />
                Recent Orders
              </CardTitle>
              <CardDescription>Latest customer orders requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        ${order.total.toFixed(2)} • {order.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(order.status)} variant="outline">
                        {order.status}
                      </Badge>
                      <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <QuickActions userRole="admin" />
          <ActivityFeed />
        </div>
      </div>

      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Platform Management
          </CardTitle>
          <CardDescription>Quick access to key administrative functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-auto p-4 justify-start bg-primary hover:bg-primary/90 glow-primary">
              <Link href="/orders">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-primary-foreground">Manage Orders</div>
                    <div className="text-sm text-primary-foreground/80">View all orders</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="h-auto p-4 justify-start bg-success hover:bg-success/90">
              <Link href="/products">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success-foreground/20 rounded-lg flex items-center justify-center">
                    <Package className="h-5 w-5 text-success-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-success-foreground">Review Products</div>
                    <div className="text-sm text-success-foreground/80">{pendingProducts} pending</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="h-auto p-4 justify-start bg-warning hover:bg-warning/90">
              <Link href="/disputes">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning-foreground/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-warning-foreground">Handle Disputes</div>
                    <div className="text-sm text-warning-foreground/80">{openDisputes} open</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="h-auto p-4 justify-start bg-chart-2 hover:bg-chart-2/90">
              <Link href="/analytics">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">View Analytics</div>
                    <div className="text-sm text-white/80">Platform insights</div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
