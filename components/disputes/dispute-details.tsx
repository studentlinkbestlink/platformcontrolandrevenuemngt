"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockDisputes, mockDisputeMessages, mockProducts } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth"
import { toast } from "@/hooks/use-toast"
import { Send, User, Shield, Store, Clock, DollarSign } from "lucide-react"

interface DisputeDetailsProps {
  disputeId: string
}

export function DisputeDetails({ disputeId }: DisputeDetailsProps) {
  const { user } = useAuth()
  const [newMessage, setNewMessage] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [resolution, setResolution] = useState("")

  const dispute = mockDisputes.find((d) => d.id === disputeId)
  const messages = mockDisputeMessages.filter((m) => m.disputeId === disputeId)
  const product = mockProducts.find((p) => p.id === dispute?.productId)

  if (!dispute) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Dispute not found.</p>
        </CardContent>
      </Card>
    )
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    toast({
      title: "Message sent",
      description: "Your message has been added to the dispute.",
    })
    setNewMessage("")
  }

  const handleUpdateStatus = () => {
    if (!newStatus) return

    toast({
      title: "Status updated",
      description: `Dispute status changed to ${newStatus.replace("_", " ")}.`,
    })
    setNewStatus("")
  }

  const handleResolveDispute = () => {
    if (!resolution.trim()) return

    toast({
      title: "Dispute resolved",
      description: "The dispute has been marked as resolved.",
    })
    setResolution("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getSenderIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />
      case "vendor":
        return <Store className="h-4 w-4" />
      case "customer":
        return <User className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Dispute Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{dispute.title}</CardTitle>
              <CardDescription>
                Dispute #{dispute.id} • Order #{dispute.orderId}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
              <Badge className={getStatusColor(dispute.status)}>{dispute.status.replace("_", " ")}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Product Details</h4>
              <p className="text-sm text-muted-foreground">{product?.name}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />${dispute.amount.toFixed(2)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {dispute.createdAt.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{dispute.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation</CardTitle>
          <CardDescription>Messages between customer, vendor, and admin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-6">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No messages yet.</p>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {getSenderIcon(message.senderRole)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm capitalize">{message.senderRole}</span>
                      <span className="text-xs text-muted-foreground">{message.createdAt.toLocaleString()}</span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Message */}
          <div className="space-y-4">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      {user?.role === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
            <CardDescription>Update dispute status or resolve the issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleUpdateStatus} disabled={!newStatus}>
                Update Status
              </Button>
            </div>

            {dispute.status !== "resolved" && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Resolution details..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleResolveDispute} disabled={!resolution.trim()}>
                  Resolve Dispute
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
