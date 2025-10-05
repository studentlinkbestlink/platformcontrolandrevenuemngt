"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPayouts } from "@/lib/stripe"
import { useAuth } from "@/lib/auth"
import { Calendar, DollarSign } from "lucide-react"

export function PayoutManagement() {
  const { user } = useAuth()

  // Filter payouts for current vendor
  const userPayouts = mockPayouts.filter((p) => p.vendorId === user?.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalEarnings = userPayouts.reduce((sum, payout) => sum + payout.amount, 0)
  const pendingPayouts = userPayouts.filter((p) => p.status === "pending")
  const pendingAmount = pendingPayouts.reduce((sum, payout) => sum + payout.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{pendingPayouts.length} pending payouts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Your payout schedule and history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPayouts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No payouts yet</p>
            ) : (
              userPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">${payout.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      Scheduled: {payout.scheduledDate.toLocaleDateString()}
                      {payout.processedDate && <span> • Processed: {payout.processedDate.toLocaleDateString()}</span>}
                    </p>
                  </div>
                  <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
