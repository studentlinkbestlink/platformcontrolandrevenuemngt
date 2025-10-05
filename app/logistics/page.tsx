import { ShipmentList } from "@/components/logistics/shipment-list"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function LogisticsPage() {
  return (
    <DashboardLayout title="Logistics Management">
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground">Manage shipments and coordinate deliveries</p>
        </div>
        <ShipmentList />
      </div>
    </DashboardLayout>
  )
}
