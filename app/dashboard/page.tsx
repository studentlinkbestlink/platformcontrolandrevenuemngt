"use client"

import { useAuth } from "@/lib/auth"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { VendorDashboard } from "@/components/dashboard/vendor-dashboard"
import { LogisticsDashboard } from "@/components/dashboard/logistics-dashboard"
import { FinanceDashboard } from "@/components/dashboard/finance-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  const { user } = useAuth()

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin Dashboard"
      case "vendor":
        return "Vendor Portal"
      case "logistics":
        return "Logistics Hub"
      case "finance":
        return "Finance Center"
      default:
        return "Dashboard"
    }
  }

  const renderDashboard = (role: string) => {
    switch (role) {
      case "admin":
        return <AdminDashboard />
      case "vendor":
        return <VendorDashboard />
      case "logistics":
        return <LogisticsDashboard />
      case "finance":
        return <FinanceDashboard />
      default:
        return <div>Invalid role</div>
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout title={getDashboardTitle(user?.role || "")}>
        {user && renderDashboard(user.role)}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
