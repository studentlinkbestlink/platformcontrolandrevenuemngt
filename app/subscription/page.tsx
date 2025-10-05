import { SubscriptionPlans } from "@/components/payments/subscription-plans"

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground">Select the perfect plan for your business needs</p>
        </div>
        <SubscriptionPlans />
      </div>
    </div>
  )
}
