import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, Package } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: "Monthly Revenue Report",
      description: "Comprehensive revenue analysis for the current month",
      type: "Financial",
      status: "Ready",
      date: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      title: "Vendor Performance Analysis",
      description: "Performance metrics and insights for all active vendors",
      type: "Performance",
      status: "Processing",
      date: "2024-01-14",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Logistics Efficiency Report",
      description: "Delivery times, routes optimization, and carrier performance",
      type: "Operations",
      status: "Ready",
      date: "2024-01-13",
      size: "3.2 MB",
    },
    {
      id: 4,
      title: "Customer Satisfaction Survey",
      description: "User feedback analysis and satisfaction metrics",
      type: "Customer",
      status: "Ready",
      date: "2024-01-12",
      size: "1.1 MB",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                Reports & Analytics
              </h1>
              <p className="text-xl text-muted-foreground">Generate and download comprehensive business reports</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Report
              </Button>
              <Button asChild className="glow-primary">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Processed</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1.2TB</div>
              <p className="text-xs text-muted-foreground">Across all reports</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
              <Calendar className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground">Auto-generated weekly</p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,847</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-gradient border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Financial Reports</CardTitle>
              <CardDescription>Revenue, expenses, and profit analysis</CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-gradient border-border/50 hover:border-success/30 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-success" />
              </div>
              <CardTitle className="text-lg">User Analytics</CardTitle>
              <CardDescription>User behavior and engagement metrics</CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-gradient border-border/50 hover:border-warning/30 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="h-6 w-6 text-warning" />
              </div>
              <CardTitle className="text-lg">Product Reports</CardTitle>
              <CardDescription>Inventory, sales, and product performance</CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-gradient border-border/50 hover:border-chart-2/30 transition-all duration-300 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-chart-2/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
              <CardTitle className="text-lg">Performance Reports</CardTitle>
              <CardDescription>System performance and optimization</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your latest generated reports and analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{report.date}</span>
                        <span className="text-xs text-muted-foreground">{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={report.status === "Ready" ? "default" : "secondary"}
                      className={
                        report.status === "Ready" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                      }
                    >
                      {report.status}
                    </Badge>
                    {report.status === "Ready" && (
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
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
