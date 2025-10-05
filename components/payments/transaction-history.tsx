"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTransactions } from "@/lib/stripe"
import { useAuth } from "@/lib/auth"

export function TransactionHistory() {
  const { user } = useAuth()

  // Filter transactions for current vendor
  const userTransactions = mockTransactions.filter((t) => t.vendorId === user?.id)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent sales and commission earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions yet</p>
          ) : (
            userTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Product Sale</p>
                  <p className="text-sm text-muted-foreground">{transaction.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <p className="text-sm text-green-600">
                    Commission: ${transaction.commission.toFixed(2)} ({transaction.commissionRate}%)
                  </p>
                </div>
                <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
