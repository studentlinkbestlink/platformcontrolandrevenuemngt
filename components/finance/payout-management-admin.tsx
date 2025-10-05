"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockPayouts } from "@/lib/stripe"
import { toast } from "@/hooks/use-toast"
import { Search, DollarSign, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

export function PayoutManagementAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Apply filters
  const filteredPayouts = mockPayouts.filter((payout) => {
    const matchesSearch = payout.vendorId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payout.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleProcessPayout = (payoutId: string) => {
    toast({
      title: "Payout processed",
      description: "The payout has been processed successfully.",
    })
  }

  const handleRejectPayout = (payoutId: string) => {
    toast({
      title: "Payout rejected",
      description: "The payout has been rejected.",
      variant: "destructive",
    })
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  // Calculate summary stats
  const totalPending = filteredPayouts.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)
  const totalProcessing = filteredPayouts.filter((p) => p.status === "processing").reduce((sum, p) => sum + p.amount, 0)
  const totalCompleted = filteredPayouts.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayouts.filter((p) => p.status === "pending").length} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProcessing.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayouts.filter((p) => p.status === "processing").length} processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCompleted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayouts.filter((p) => p.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by vendor ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payout List */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Requests</CardTitle>
          <CardDescription>Manage vendor payout requests and processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayouts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No payouts found matching your criteria.</p>
            ) : (
              filteredPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">{getStatusIcon(payout.status)}</div>
                    <div>
                      <p className="font-medium">Vendor #{payout.vendorId}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Scheduled: {payout.scheduledDate.toLocaleDateString()}
                        </div>
                        {payout.processedDate && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Processed: {payout.processedDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${payout.amount.toFixed(2)}</p>
                      <Badge className={getStatusColor(payout.status)}>{payout.status}</Badge>
                    </div>
                    {payout.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleProcessPayout(payout.id)}>
                          Process
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRejectPayout(payout.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
