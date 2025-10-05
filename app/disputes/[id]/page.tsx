import { DisputeDetails } from "@/components/disputes/dispute-details"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

interface DisputeDetailPageProps {
  params: {
    id: string
  }
}

export default function DisputeDetailPage({ params }: DisputeDetailPageProps) {
  return (
    <DashboardLayout title="Dispute Details">
      <DisputeDetails disputeId={params.id} />
    </DashboardLayout>
  )
}
