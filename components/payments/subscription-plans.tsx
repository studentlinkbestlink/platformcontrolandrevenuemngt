"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Loader2 } from "lucide-react"
import { subscriptionPlans, createCheckoutSession } from "@/lib/stripe"
import { useAuth } from "@/lib/auth"
import { toast } from "@/hooks/use-toast"

export function SubscriptionPlans() {
  const { user } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      })
      return
    }

    setLoading(planId)
    try {
      const session = await createCheckoutSession(planId, user.id)
      // In a real implementation, redirect to Stripe Checkout
      toast({
        title: "Redirecting to checkout",
        description: "You will be redirected to Stripe Checkout shortly.",
      })
      // window.location.href = session.url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {subscriptionPlans.map((plan) => (
        <Card key={plan.id} className="relative">
          {plan.id === "pro" && (
            <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary">Most Popular</Badge>
          )}
          <CardHeader>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/{plan.interval}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleSubscribe(plan.id)} disabled={loading === plan.id}>
              {loading === plan.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
