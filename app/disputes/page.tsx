import { DisputeList } from "@/components/disputes/dispute-list"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DisputesPage() {
  return (
    <DashboardLayout title="Dispute Management">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Manage customer disputes and resolution processes</p>
        </div>
        <DisputeList />
      </div>
    </DashboardLayout>
  )
}
