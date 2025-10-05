import { EnhancedStatCard } from "./enhanced-stat-card"
import { ActivityFeed } from "./activity-feed"
import { QuickActions } from "./quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Package, ShoppingCart, AlertCircle, Plus, Eye, TrendingUp, BarChart3 } from "lucide-react"
import { mockProducts, mockOrders } from "@/lib/mock-data"
import Link from "next/link"

export function VendorDashboard() {
  const vendorId = "2" // Current vendor ID
  const vendorProducts = mockProducts.filter((p) => p.vendorId === vendorId)
  const vendorOrders = mockOrders.filter((order) => order.items.some((item) => item.vendorId === vendorId))

  const totalEarnings = vendorOrders.reduce(
    (sum, order) =>
      sum +
      order.items
        .filter((item) => item.vendorId === vendorId)
        .reduce((itemSum, item) => itemSum + item.vendorEarnings, 0),
    0,
  )

  const totalSales = vendorOrders.reduce(
    (sum, order) =>
      sum +
      order.items.filter((item) => item.vendorId === vendorId).reduce((itemSum, item) => itemSum + item.quantity, 0),
    0,
  )

  const activeProducts = vendorProducts.filter((p) => p.status === "approved").length
  const pendingProducts = vendorProducts.filter((p) => p.status === "pending").length

  const recentProducts = vendorProducts.slice(0, 5).map((product) => {
    const productOrders = vendorOrders.filter((order) => order.items.some((item) => item.productId === product.id))
    const sales = productOrders.reduce(
      (sum, order) =>
        sum +
        order.items
          .filter((item) => item.productId === product.id)
          .reduce((itemSum, item) => itemSum + item.quantity, 0),
      0,
    )

    return {
      id: product.id,
      name: product.name,
      status: product.status,
      price: `$${product.price?.toFixed(2) || "0.00"}`,
      sales,
      inventory: product.inventory?.quantity || 0,
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success/20 text-success border-success/30"
      case "pending":
        return "bg-warning/20 text-warning border-warning/30"
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Total Earnings"
          value={`$${totalEarnings.toFixed(2)}`}
          description="After platform fees"
          icon={DollarSign}
          trend={{ value: 12.5, label: "from last month", isPositive: true }}
          color="primary"
        />
        <EnhancedStatCard
          title="Active Products"
          value={activeProducts.toString()}
          description="Currently listed"
          icon={Package}
          trend={{ value: 8.1, label: "from last month", isPositive: true }}
          color="success"
        />
        <EnhancedStatCard
          title="Total Sales"
          value={totalSales.toString()}
          description="Units sold"
          icon={ShoppingCart}
          trend={{ value: 23.2, label: "from last month", isPositive: true }}
          color="chart-2"
        />
        <EnhancedStatCard
          title="Pending Reviews"
          value={pendingProducts.toString()}
          description="Awaiting approval"
          icon={AlertCircle}
          color="warning"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Product Performance */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-success" />
                Product Performance
              </CardTitle>
              <CardDescription>Your products and their sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{product.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{product.price}</span>
                        <span>•</span>
                        <span>{product.sales} sold</span>
                        <span>•</span>
                        <span>{product.inventory} in stock</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(product.status)} variant="outline">
                        {product.status}
                      </Badge>
                      <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                        <Link href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Earnings Chart */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Sales & Earnings Overview
              </CardTitle>
              <CardDescription>Your sales performance and earnings over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-chart-2/5 rounded-lg border border-border/50">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-foreground mb-2">Sales Analytics</p>
                  <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <QuickActions userRole="vendor" />
          <ActivityFeed />
        </div>
      </div>

      <Card className="card-gradient border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Management
          </CardTitle>
          <CardDescription>Manage your products and sales efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild className="h-auto p-4 justify-start bg-primary hover:bg-primary/90 glow-primary">
              <Link href="/products/new">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                    <Plus className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-primary-foreground">Add Product</div>
                    <div className="text-sm text-primary-foreground/80">Create new listing</div>
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
                    <div className="font-semibold text-success-foreground">View Products</div>
                    <div className="text-sm text-success-foreground/80">{activeProducts} active</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="h-auto p-4 justify-start bg-chart-2 hover:bg-chart-2/90">
              <Link href="/orders">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white">View Orders</div>
                    <div className="text-sm text-white/80">Track sales</div>
                  </div>
                </div>
              </Link>
            </Button>

            <Button asChild className="h-auto p-4 justify-start bg-warning hover:bg-warning/90">
              <Link href="/disputes">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning-foreground/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-warning-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-warning-foreground">Manage Disputes</div>
                    <div className="text-sm text-warning-foreground/80">Handle issues</div>
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
