import { OrderList } from "@/components/orders/order-list"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function OrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "vendor", "finance"]}>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Manage customer orders, track fulfillment, and monitor revenue</p>
        </div>
        <OrderList />
      </div>
    </ProtectedRoute>
  )
}
