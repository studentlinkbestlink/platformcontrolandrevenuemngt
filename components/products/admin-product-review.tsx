"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockProducts, mockNotifications } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Check, X, MessageSquare, Clock } from "lucide-react"

export function AdminProductReview() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const pendingProducts = mockProducts.filter((product) => product.status === "pending")

  const handleApprove = async (productId: string) => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update product status
    const productIndex = mockProducts.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
      mockProducts[productIndex].status = "approved"
      mockProducts[productIndex].updatedAt = new Date()

      // Add notification
      mockNotifications.unshift({
        id: Date.now().toString(),
        userId: mockProducts[productIndex].vendorId,
        title: "Product Approved",
        message: `Your product "${mockProducts[productIndex].name}" has been approved and is now live.`,
        type: "success",
        read: false,
        createdAt: new Date(),
      })
    }

    setSelectedProduct(null)
    setFeedback("")
    setIsProcessing(false)
  }

  const handleReject = async (productId: string) => {
    if (!feedback.trim()) {
      alert("Please provide feedback for rejection")
      return
    }

    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update product status
    const productIndex = mockProducts.findIndex((p) => p.id === productId)
    if (productIndex !== -1) {
      mockProducts[productIndex].status = "rejected"
      mockProducts[productIndex].updatedAt = new Date()

      // Add notification
      mockNotifications.unshift({
        id: Date.now().toString(),
        userId: mockProducts[productIndex].vendorId,
        title: "Product Rejected",
        message: `Your product "${mockProducts[productIndex].name}" was rejected. Feedback: ${feedback}`,
        type: "error",
        read: false,
        createdAt: new Date(),
      })
    }

    setSelectedProduct(null)
    setFeedback("")
    setIsProcessing(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Product Reviews
          </CardTitle>
          <CardDescription>Review and approve or reject vendor product submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products pending review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingProducts.map((product) => (
                <Card key={product.id} className="border-l-4 border-l-warning">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-2xl font-bold text-primary">{formatPrice(product.price)}</p>
                          </div>
                          <Badge variant="default" className="capitalize">
                            {product.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-xs text-muted-foreground">Submitted: {formatDate(product.createdAt)}</p>
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" onClick={() => setSelectedProduct(product)} disabled={isProcessing}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(product.id)}
                            disabled={isProcessing}
                            className="text-success border-success hover:bg-success hover:text-success-foreground"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Quick Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedProduct && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Review Product: {selectedProduct.name}</CardTitle>
            <CardDescription>Provide feedback and approve or reject this product submission</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                  <p className="text-2xl font-bold text-primary">{formatPrice(selectedProduct.price)}</p>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-muted-foreground mt-1">{selectedProduct.description}</p>
                </div>
                <div>
                  <Label>Submission Date</Label>
                  <p className="text-sm text-muted-foreground mt-1">{formatDate(selectedProduct.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (required for rejection)</Label>
              <Textarea
                id="feedback"
                placeholder="Provide feedback about this product..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={() => handleApprove(selectedProduct.id)} disabled={isProcessing} className="flex-1">
                <Check className="mr-2 h-4 w-4" />
                Approve Product
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(selectedProduct.id)}
                disabled={isProcessing}
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                Reject Product
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedProduct(null)
                  setFeedback("")
                }}
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
