import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, DollarSign, Package, Truck, ArrowUpRight, ArrowDownRight } from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Analytics Dashboard</h1>
              <p className="text-xl text-muted-foreground">Comprehensive insights into your platform performance</p>
            </div>
            <Button asChild className="glow-primary">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$2,847,392</div>
              <div className="flex items-center text-xs text-success">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12,847</div>
              <div className="flex items-center text-xs text-success">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">45,231</div>
              <div className="flex items-center text-xs text-destructive">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <Truck className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">98.7%</div>
              <div className="flex items-center text-xs text-success">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.3% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Revenue Trends
              </CardTitle>
              <CardDescription>Monthly revenue over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization would be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                User Growth
              </CardTitle>
              <CardDescription>User acquisition and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Growth chart would be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Insights */}
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key performance indicators and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20">
                <div>
                  <h4 className="font-semibold text-success">High Conversion Rate</h4>
                  <p className="text-sm text-muted-foreground">
                    Your platform is converting 23% better than industry average
                  </p>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  +23%
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div>
                  <h4 className="font-semibold text-warning">Shipping Delays</h4>
                  <p className="text-sm text-muted-foreground">Some logistics partners are experiencing delays</p>
                </div>
                <Badge variant="secondary" className="bg-warning/20 text-warning">
                  Action Needed
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div>
                  <h4 className="font-semibold text-primary">Revenue Growth</h4>
                  <p className="text-sm text-muted-foreground">Monthly recurring revenue is trending upward</p>
                </div>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Excellent
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
