import { EnhancedStatCard } from "./enhanced-stat-card"
import { ActivityFeed } from "./activity-feed"
import { QuickActions } from "./quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, CreditCard, FileText, Download, Send, BarChart3, Users } from "lucide-react"

export function FinanceDashboard() {
  const recentTransactions = [
    {
      id: "1",
      vendor: "TechCorp",
      amount: "$1,234.56",
      type: "payout",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "2",
      vendor: "GadgetStore",
      amount: "$856.78",
      type: "commission",
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "3",
      vendor: "ElectroShop",
      amount: "$2,145.90",
      type: "payout",
      status: "completed",
      date: "2024-01-14",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success border-success/30"
      case "pending":
        return "bg-warning/20 text-warning border-warning/30"
      case "failed":
        return "bg-destructive/20 text-destructive border-destructive/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payout":
        return "text-success"
      case "commission":
        return "text-primary"
      case "refund":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Total Revenue"
          value="$54,231.89"
          description="This month"
          icon={DollarSign}
          trend={{ value: 18.7, label: "from last month", isPositive: true }}
          color="primary"
        />
        <EnhancedStatCard
          title="Pending Payouts"
          value="$12,456.78"
          description="Awaiting processing"
          icon={CreditCard}
          color="warning"
        />
        <EnhancedStatCard
          title="Commission Earned"
          value="$8,945.23"
          description="Platform commission"
          icon={TrendingUp}
          trend={{ value: 22.1, label: "from last month", isPositive: true }}
          color="success"
        />
        <EnhancedStatCard
          title="Reports Generated"
          value="47"
          description="This month"
          icon={FileText}
          trend={{ value: 12.3, label: "from last month", isPositive: true }}
          color="chart-2"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Financial Overview */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Financial Overview
              </CardTitle>
              <CardDescription>Revenue and expense trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-primary/5 to-success/5 rounded-lg border border-border/50">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-semibold text-foreground mb-2">Financial Analytics</p>
                  <p className="text-sm text-muted-foreground">Interactive charts will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="card-gradient border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-success" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Latest financial transactions and payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold text-foreground">{transaction.vendor}</p>
                        <Badge className={getStatusColor(transaction.status)} variant="outline">
                          {transaction.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className={`font-medium ${getTypeColor(transaction.type)}`}>{transaction.amount}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground capitalize">{transaction.type}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{transaction.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <QuickActions userRole="finance" />
          <ActivityFeed />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Payout Management
            </CardTitle>
            <CardDescription>Process vendor payouts efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-primary hover:bg-primary/90 glow-primary">
              <Send className="mr-2 h-4 w-4" />
              Process Pending Payouts
            </Button>
            <Button variant="outline" className="w-full hover:bg-primary/10 bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              Review Payout Queue
            </Button>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-2" />
              Financial Reports
            </CardTitle>
            <CardDescription>Generate comprehensive financial reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-chart-2 hover:bg-chart-2/90">
              <Download className="mr-2 h-4 w-4" />
              Monthly Report
            </Button>
            <Button variant="outline" className="w-full hover:bg-chart-2/10 bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Vendor Earnings Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
