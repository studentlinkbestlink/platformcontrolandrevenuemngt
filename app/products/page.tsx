"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProductList } from "@/components/products/product-list"
import { AdminProductReview } from "@/components/products/admin-product-review"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const { user } = useAuth()

  const getPageTitle = () => {
    switch (user?.role) {
      case "admin":
        return "Product Management"
      case "vendor":
        return "My Products"
      default:
        return "Products"
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout title={getPageTitle()}>
        {user?.role === "admin" ? (
          <Tabs defaultValue="review" className="space-y-6">
            <TabsList>
              <TabsTrigger value="review">Pending Reviews</TabsTrigger>
              <TabsTrigger value="all">All Products</TabsTrigger>
            </TabsList>
            <TabsContent value="review">
              <AdminProductReview />
            </TabsContent>
            <TabsContent value="all">
              <ProductList showVendorFilter={true} />
            </TabsContent>
          </Tabs>
        ) : (
          <ProductList vendorOnly={user?.role === "vendor"} />
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
