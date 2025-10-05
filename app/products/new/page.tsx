"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProductForm } from "@/components/products/product-form"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function NewProductPage() {
  return (
    <ProtectedRoute allowedRoles={["vendor"]}>
      <DashboardLayout title="Add New Product">
        <div className="max-w-4xl mx-auto">
          <ProductForm />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
