export type UserRole = "admin" | "vendor" | "logistics" | "finance" | "customer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  email: string
  name: string
  phone?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  totalOrders: number
  totalSpent: number
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  costPrice: number // For profit calculation
  category: string
  sku: string
  image?: string
  images?: string[]
  status: "pending" | "approved" | "rejected" | "inactive"
  vendorId: string
  inventory: {
    quantity: number
    lowStockThreshold: number
    reserved: number // Items in pending orders
  }
  dimensions?: {
    weight: number
    length: number
    width: number
    height: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface Dispute {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "resolved"
  vendorId: string
  createdAt: Date
  updatedAt: Date
  messages: DisputeMessage[]
}

export interface DisputeMessage {
  id: string
  disputeId: string
  userId: string
  message: string
  createdAt: Date
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shippingCost: number
  platformFee: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: "stripe" | "paypal" | "bank_transfer"
  paymentIntentId?: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  logisticsPartnerId?: string
  trackingNumber?: string
  estimatedDelivery?: Date
  actualDelivery?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  vendorId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  commissionRate: number // Platform commission percentage
  commissionAmount: number
  vendorEarnings: number
}

export interface VendorEarnings {
  vendorId: string
  totalSales: number
  totalCommission: number
  totalEarnings: number
  pendingPayouts: number
  paidPayouts: number
  currentBalance: number
  lastPayoutDate?: Date
}

export interface Payout {
  id: string
  vendorId: string
  amount: number
  status: "pending" | "processing" | "completed" | "failed"
  method: "stripe" | "bank_transfer" | "paypal"
  stripeTransferId?: string
  processedAt?: Date
  failureReason?: string
  createdAt: Date
  updatedAt: Date
}

export interface PlatformSettings {
  defaultCommissionRate: number
  categoryCommissionRates: Record<string, number>
  vendorCommissionRates: Record<string, number>
  minimumPayoutAmount: number
  payoutSchedule: "weekly" | "biweekly" | "monthly"
  taxRate: number
  shippingRates: {
    standard: number
    express: number
    overnight: number
  }
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}
