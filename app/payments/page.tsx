import { TransactionHistory } from "@/components/payments/transaction-history"
import { PayoutManagement } from "@/components/payments/payout-management"

export default function PaymentsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payments & Payouts</h1>
          <p className="text-muted-foreground">Manage your earnings, transactions, and payout schedule</p>
        </div>

        <PayoutManagement />
        <TransactionHistory />
      </div>
    </div>
  )
}
