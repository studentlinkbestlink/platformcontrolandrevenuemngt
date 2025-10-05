"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockShipments, mockProducts, mockLogisticsPartners } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth"
import { Search, Package, Truck, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export function ShipmentList() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Filter shipments based on user role
  let shipments = mockShipments
  if (user?.role === "vendor") {
    shipments = mockShipments.filter((s) => s.vendorId === user.id)
  } else if (user?.role === "logistics") {
    shipments = mockShipments.filter((s) => s.logisticsPartnerId === user.id)
  }

  // Apply filters
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter
    const matchesPriority = priorityFilter === "all" || shipment.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "picked_up":
        return "bg-blue-100 text-blue-800"
      case "in_transit":
        return "bg-yellow-100 text-yellow-800"
      case "out_for_delivery":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "returned":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "overnight":
        return "bg-red-500 text-white"
      case "express":
        return "bg-orange-500 text-white"
      case "standard":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getProductName = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId)
    return product?.name || "Unknown Product"
  }

  const getLogisticsPartner = (partnerId: string) => {
    const partner = mockLogisticsPartners.find((p) => p.id === partnerId)
    return partner?.company || "Unknown Partner"
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by tracking number or order ID..."
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
            <SelectItem value="picked_up">Picked Up</SelectItem>
            <SelectItem value="in_transit">In Transit</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="overnight">Overnight</SelectItem>
            <SelectItem value="express">Express</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shipment Cards */}
      <div className="space-y-4">
        {filteredShipments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No shipments found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredShipments.map((shipment) => (
            <Card key={shipment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {shipment.trackingNumber}
                    </CardTitle>
                    <CardDescription>
                      Order #{shipment.orderId} • {getProductName(shipment.productId)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(shipment.priority)}>{shipment.priority}</Badge>
                    <Badge className={getStatusColor(shipment.status)}>{shipment.status.replace("_", " ")}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>{getLogisticsPartner(shipment.logisticsPartnerId)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {shipment.origin.city}, {shipment.origin.state} → {shipment.destination.city},{" "}
                        {shipment.destination.state}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Est. Delivery: {shipment.estimatedDelivery.toLocaleDateString()}
                        {shipment.actualDelivery && (
                          <span className="text-green-600 ml-2">
                            (Delivered: {shipment.actualDelivery.toLocaleDateString()})
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Weight: {shipment.weight}kg • Cost: ${shipment.cost.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Link href={`/logistics/${shipment.id}`}>
                    <Button variant="outline" size="sm">
                      Track Shipment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
