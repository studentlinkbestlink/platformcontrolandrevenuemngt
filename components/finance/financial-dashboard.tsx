"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTransactions, mockPayouts } from "@/lib/stripe"
import { mockShipments } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth"
import { DollarSign, TrendingUp, Truck, AlertTriangle } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function FinancialDashboard() {
  const { user } = useAuth()

  // Calculate financial metrics
  const totalRevenue = mockTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalCommissions = mockTransactions.reduce((sum, t) => sum + t.commission, 0)
  const totalPayouts = mockPayouts.reduce((sum, p) => sum + (p.status === "completed" ? p.amount : 0), 0)
  const pendingPayouts = mockPayouts.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const totalShipments = mockShipments.length
  const deliveredShipments = mockShipments.filter((s) => s.status === "delivered").length
  const deliveryRate = totalShipments > 0 ? (deliveredShipments / totalShipments) * 100 : 0

  // Mock data for charts
  const revenueData = [
    { month: "Jan", revenue: 12500, commissions: 375 },
    { month: "Feb", revenue: 15200, commissions: 456 },
    { month: "Mar", revenue: 18900, commissions: 567 },
    { month: "Apr", revenue: 22100, commissions: 663 },
    { month: "May", revenue: 19800, commissions: 594 },
    { month: "Jun", revenue: 25400, commissions: 762 },
  ]

  const categoryData = [
    { name: "Electronics", value: 45, color: "#3b82f6" },
    { name: "Accessories", value: 30, color: "#10b981" },
    { name: "Home & Garden", value: 15, color: "#f59e0b" },
    { name: "Sports", value: 10, color: "#ef4444" },
  ]

  const payoutData = [
    { month: "Jan", amount: 11250 },
    { month: "Feb", amount: 13680 },
    { month: "Mar", amount: 17010 },
    { month: "Apr", amount: 19890 },
    { month: "May", amount: 17820 },
    { month: "Jun", amount: 22860 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommissions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingPayouts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {mockPayouts.filter((p) => p.status === "pending").length} pending transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {deliveredShipments} of {totalShipments} shipments delivered
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Commissions Trend</CardTitle>
            <CardDescription>Monthly revenue and commission tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="commissions" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Payouts</CardTitle>
          <CardDescription>Vendor payout history and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Transaction #{transaction.id}</p>
                  <p className="text-sm text-muted-foreground">{transaction.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-green-600">Commission: ${transaction.commission.toFixed(2)}</p>
                </div>
                <Badge
                  className={
                    transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {transaction.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
