import { FinancialDashboard } from "@/components/finance/financial-dashboard"
import { PayoutManagementAdmin } from "@/components/finance/payout-management-admin"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function FinancePage() {
  return (
    <DashboardLayout title="Financial Management">
      <div className="space-y-8">
        <div>
          <p className="text-muted-foreground">Comprehensive financial reporting, analytics, and payout management</p>
        </div>

        <FinancialDashboard />
        <PayoutManagementAdmin />
      </div>
    </DashboardLayout>
  )
}
