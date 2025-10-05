"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockShipments, mockShipmentUpdates, mockProducts, mockLogisticsPartners } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth"
import { toast } from "@/hooks/use-toast"
import { Package, MapPin, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react"

interface ShipmentTrackingProps {
  shipmentId: string
}

export function ShipmentTracking({ shipmentId }: ShipmentTrackingProps) {
  const { user } = useAuth()
  const [newStatus, setNewStatus] = useState("")
  const [updateNote, setUpdateNote] = useState("")

  const shipment = mockShipments.find((s) => s.id === shipmentId)
  const updates = mockShipmentUpdates.filter((u) => u.shipmentId === shipmentId)
  const product = mockProducts.find((p) => p.id === shipment?.productId)
  const logisticsPartner = mockLogisticsPartners.find((p) => p.id === shipment?.logisticsPartnerId)

  if (!shipment) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Shipment not found.</p>
        </CardContent>
      </Card>
    )
  }

  const handleUpdateStatus = () => {
    if (!newStatus || !updateNote.trim()) return

    toast({
      title: "Status updated",
      description: `Shipment status updated to ${newStatus.replace("_", " ")}.`,
    })
    setNewStatus("")
    setUpdateNote("")
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Package className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Shipment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Package className="h-6 w-6" />
                {shipment.trackingNumber}
              </CardTitle>
              <CardDescription>
                Shipment #{shipment.id} • Order #{shipment.orderId}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(shipment.priority)}>{shipment.priority}</Badge>
              <Badge className={getStatusColor(shipment.status)}>{shipment.status.replace("_", " ")}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Product Details</h4>
                <p className="text-sm text-muted-foreground">{product?.name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Weight: {shipment.weight}kg</span>
                  <span>
                    Dimensions: {shipment.dimensions.length}×{shipment.dimensions.width}×{shipment.dimensions.height}cm
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Logistics Partner</h4>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{logisticsPartner?.company}</span>
                </div>
                <p className="text-sm text-muted-foreground">{logisticsPartner?.name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Origin</h4>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{shipment.origin.address}</p>
                    <p>
                      {shipment.origin.city}, {shipment.origin.state} {shipment.origin.zipCode}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Destination</h4>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p>{shipment.destination.address}</p>
                    <p>
                      {shipment.destination.city}, {shipment.destination.state} {shipment.destination.zipCode}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Delivery Timeline</h4>
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
              </div>
            </div>
          </div>
          {shipment.notes && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm">{shipment.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tracking History */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking History</CardTitle>
          <CardDescription>Real-time updates on shipment progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No tracking updates yet.</p>
            ) : (
              updates
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((update, index) => (
                  <div key={update.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {getStatusIcon(update.status)}
                      </div>
                      {index < updates.length - 1 && <div className="w-px h-8 bg-border ml-4 mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm capitalize">{update.status.replace("_", " ")}</span>
                        <span className="text-xs text-muted-foreground">{update.timestamp.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">📍 {update.location}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logistics Partner Actions */}
      {user?.role === "logistics" && shipment.logisticsPartnerId === user.id && (
        <Card>
          <CardHeader>
            <CardTitle>Update Shipment Status</CardTitle>
            <CardDescription>Provide real-time updates on shipment progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="picked_up">Picked Up</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="failed">Failed Delivery</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Add update notes (location, description, etc.)..."
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
              rows={3}
            />
            <Button onClick={handleUpdateStatus} disabled={!newStatus || !updateNote.trim()}>
              Update Status
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
