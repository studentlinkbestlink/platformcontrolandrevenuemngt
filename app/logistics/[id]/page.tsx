import { ShipmentTracking } from "@/components/logistics/shipment-tracking"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

interface ShipmentTrackingPageProps {
  params: {
    id: string
  }
}

export default function ShipmentTrackingPage({ params }: ShipmentTrackingPageProps) {
  return (
    <DashboardLayout title="Shipment Tracking">
      <ShipmentTracking shipmentId={params.id} />
    </DashboardLayout>
  )
}
