import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Package, User } from "lucide-react"
import { mockOrders, mockCustomers, mockProducts } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === params.id)
  if (!order) notFound()

  const customer = mockCustomers.find((c) => c.id === order.customerId)

  return (
    <ProtectedRoute allowedRoles={["admin", "vendor", "finance", "logistics"]}>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
          <p className="text-muted-foreground">Order details and fulfillment tracking</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge>{order.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>{order.paymentStatus}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{order.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span>Tracking:</span>
                  <span className="font-mono">{order.trackingNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">{customer?.name}</p>
                <p className="text-sm text-muted-foreground">{customer?.email}</p>
                {customer?.phone && <p className="text-sm text-muted-foreground">{customer.phone}</p>}
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Shipping Address:</p>
                <p className="text-sm text-muted-foreground">
                  {order.shippingAddress.name}
                  <br />
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = mockProducts.find((p) => p.id === item.productId)
                  return (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{product?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Commission: ${item.commissionAmount.toFixed(2)} | Vendor Earnings: $
                          {item.vendorEarnings.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee:</span>
                  <span>${order.platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}
