import type { Product, Order, Customer, VendorEarnings, Payout } from "./types"

export const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    email: "john.doe@email.com",
    name: "John Doe",
    phone: "+1-555-0123",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    totalOrders: 5,
    totalSpent: 487.45,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "CUST-002",
    email: "jane.smith@email.com",
    name: "Jane Smith",
    phone: "+1-555-0124",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    totalOrders: 3,
    totalSpent: 299.97,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2024-01-10"),
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    costPrice: 45.0,
    category: "Electronics",
    sku: "WBH-001",
    image: "/wireless-headphones.png",
    status: "approved",
    vendorId: "2",
    inventory: {
      quantity: 150,
      lowStockThreshold: 20,
      reserved: 5,
    },
    dimensions: {
      weight: 0.5,
      length: 20,
      width: 15,
      height: 8,
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.",
    price: 199.99,
    costPrice: 89.99,
    category: "Wearables",
    sku: "SFW-002",
    image: "/smart-fitness-watch.png",
    status: "approved",
    vendorId: "2",
    inventory: {
      quantity: 75,
      lowStockThreshold: 10,
      reserved: 2,
    },
    dimensions: {
      weight: 0.3,
      length: 15,
      width: 10,
      height: 5,
    },
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Premium Phone Case",
    description: "Durable phone case with military-grade protection and wireless charging compatibility.",
    price: 24.99,
    image: "/phone-case-protection.jpg",
    status: "rejected",
    vendorId: "2",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-09"),
  },
  {
    id: "4",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound and 12-hour battery life.",
    price: 79.99,
    image: "/bluetooth-speaker-portable.jpg",
    status: "approved",
    vendorId: "2",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-06"),
  },
  {
    id: "5",
    name: "USB-C Fast Charger",
    description: "65W fast charging adapter with multiple ports and universal compatibility.",
    price: 34.99,
    image: "/usb-c-fast-charger.jpg",
    status: "pending",
    vendorId: "2",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "ORD-2024-001",
    customerId: "CUST-001",
    items: [
      {
        id: "ITEM-001",
        productId: "1",
        vendorId: "2",
        quantity: 1,
        unitPrice: 99.99,
        totalPrice: 99.99,
        commissionRate: 15,
        commissionAmount: 15.0,
        vendorEarnings: 84.99,
      },
    ],
    subtotal: 99.99,
    tax: 8.0,
    shippingCost: 12.5,
    platformFee: 15.0,
    total: 120.49,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "stripe",
    paymentIntentId: "pi_1234567890",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    logisticsPartnerId: "LP-001",
    trackingNumber: "TRK123456789",
    estimatedDelivery: new Date("2024-01-18"),
    actualDelivery: new Date("2024-01-17"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "ORD-002",
    orderNumber: "ORD-2024-002",
    customerId: "CUST-002",
    items: [
      {
        id: "ITEM-002",
        productId: "2",
        vendorId: "2",
        quantity: 1,
        unitPrice: 199.99,
        totalPrice: 199.99,
        commissionRate: 12,
        commissionAmount: 24.0,
        vendorEarnings: 175.99,
      },
    ],
    subtotal: 199.99,
    tax: 16.0,
    shippingCost: 15.0,
    platformFee: 24.0,
    total: 230.99,
    status: "shipped",
    paymentStatus: "paid",
    paymentMethod: "stripe",
    paymentIntentId: "pi_0987654321",
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    billingAddress: {
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    logisticsPartnerId: "LP-002",
    trackingNumber: "TRK987654321",
    estimatedDelivery: new Date("2024-01-20"),
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-19"),
  },
]

export const mockVendorEarnings: VendorEarnings[] = [
  {
    vendorId: "2",
    totalSales: 2450.75,
    totalCommission: 367.61,
    totalEarnings: 2083.14,
    pendingPayouts: 260.98,
    paidPayouts: 1822.16,
    currentBalance: 260.98,
    lastPayoutDate: new Date("2024-01-01"),
  },
]

export const mockPayouts: Payout[] = [
  {
    id: "PAYOUT-001",
    vendorId: "2",
    amount: 1822.16,
    status: "completed",
    method: "stripe",
    stripeTransferId: "tr_1234567890",
    processedAt: new Date("2024-01-01"),
    createdAt: new Date("2023-12-31"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "PAYOUT-002",
    vendorId: "2",
    amount: 260.98,
    status: "pending",
    method: "stripe",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
]

// Mock notifications
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "success" | "warning" | "error" | "info"
  read: boolean
  createdAt: Date
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "2",
    title: "Product Approved",
    message: 'Your product "Wireless Bluetooth Headphones" has been approved and is now live.',
    type: "success",
    read: false,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "2",
    userId: "2",
    title: "Product Rejected",
    message: 'Your product "Premium Phone Case" was rejected. Please review the feedback and resubmit.',
    type: "error",
    read: false,
    createdAt: new Date("2024-01-09"),
  },
  {
    id: "3",
    userId: "1",
    title: "New Product Submission",
    message: 'A new product "Smart Fitness Watch" is pending your review.',
    type: "info",
    read: true,
    createdAt: new Date("2024-01-14"),
  },
]

export interface Dispute {
  id: string
  orderId: string
  productId: string
  customerId: string
  vendorId: string
  title: string
  description: string
  category: "product_quality" | "shipping" | "refund" | "billing" | "other"
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  amount: number
  createdAt: Date
  updatedAt: Date
  resolvedAt?: Date
  resolution?: string
  adminNotes?: string
}

export interface DisputeMessage {
  id: string
  disputeId: string
  senderId: string
  senderRole: "customer" | "vendor" | "admin"
  message: string
  attachments?: string[]
  createdAt: Date
}

export const mockDisputes: Dispute[] = [
  {
    id: "1",
    orderId: "ORD-001",
    productId: "1",
    customerId: "CUST-001",
    vendorId: "2",
    title: "Product not as described",
    description:
      "The wireless headphones I received don't match the description. The noise cancellation feature doesn't work properly.",
    category: "product_quality",
    status: "open",
    priority: "medium",
    amount: 99.99,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "2",
    orderId: "ORD-002",
    productId: "4",
    customerId: "CUST-002",
    vendorId: "2",
    title: "Item never arrived",
    description:
      "I ordered a Bluetooth speaker 2 weeks ago but it never arrived. Tracking shows it was delivered but I never received it.",
    category: "shipping",
    status: "in_progress",
    priority: "high",
    amount: 79.99,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    orderId: "ORD-003",
    productId: "1",
    customerId: "CUST-003",
    vendorId: "2",
    title: "Refund request",
    description:
      "I want to return this item as it doesn't meet my expectations. It's been less than 30 days since purchase.",
    category: "refund",
    status: "resolved",
    priority: "low",
    amount: 99.99,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    resolvedAt: new Date("2024-01-12"),
    resolution: "Full refund processed. Customer satisfied with resolution.",
  },
]

export const mockDisputeMessages: DisputeMessage[] = [
  {
    id: "1",
    disputeId: "1",
    senderId: "CUST-001",
    senderRole: "customer",
    message: "The noise cancellation feature advertised doesn't work at all. I'm very disappointed with this purchase.",
    createdAt: new Date("2024-01-16T10:00:00"),
  },
  {
    id: "2",
    disputeId: "2",
    senderId: "2",
    senderRole: "vendor",
    message:
      "I apologize for the inconvenience. Let me check with our shipping partner and get back to you within 24 hours.",
    createdAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "3",
    disputeId: "2",
    senderId: "1",
    senderRole: "admin",
    message: "We've contacted the shipping company and they're investigating. We'll provide an update soon.",
    createdAt: new Date("2024-01-15T16:45:00"),
  },
]

export interface Shipment {
  id: string
  orderId: string
  productId: string
  vendorId: string
  customerId: string
  logisticsPartnerId: string
  trackingNumber: string
  status: "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed" | "returned"
  priority: "standard" | "express" | "overnight"
  weight: number // in kg
  dimensions: {
    length: number
    width: number
    height: number
  }
  origin: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  destination: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  estimatedDelivery: Date
  actualDelivery?: Date
  cost: number
  createdAt: Date
  updatedAt: Date
  notes?: string
}

export interface ShipmentUpdate {
  id: string
  shipmentId: string
  status: string
  location: string
  timestamp: Date
  description: string
  updatedBy: string
}

export interface LogisticsPartner {
  id: string
  name: string
  email: string
  phone: string
  company: string
  serviceAreas: string[]
  rating: number
  totalDeliveries: number
  onTimeRate: number
  isActive: boolean
  createdAt: Date
}

export const mockLogisticsPartners: LogisticsPartner[] = [
  {
    id: "LP-001",
    name: "John Smith",
    email: "john@fastdelivery.com",
    phone: "+1-555-0101",
    company: "Fast Delivery Co.",
    serviceAreas: ["New York", "New Jersey", "Connecticut"],
    rating: 4.8,
    totalDeliveries: 1250,
    onTimeRate: 96.5,
    isActive: true,
    createdAt: new Date("2023-06-01"),
  },
  {
    id: "LP-002",
    name: "Sarah Johnson",
    email: "sarah@quickship.com",
    phone: "+1-555-0102",
    company: "QuickShip Logistics",
    serviceAreas: ["California", "Nevada", "Arizona"],
    rating: 4.6,
    totalDeliveries: 890,
    onTimeRate: 94.2,
    isActive: true,
    createdAt: new Date("2023-08-15"),
  },
  {
    id: "LP-003",
    name: "Mike Wilson",
    email: "mike@reliablelogistics.com",
    phone: "+1-555-0103",
    company: "Reliable Logistics",
    serviceAreas: ["Texas", "Oklahoma", "Louisiana"],
    rating: 4.9,
    totalDeliveries: 2100,
    onTimeRate: 98.1,
    isActive: true,
    createdAt: new Date("2023-03-20"),
  },
]

export const mockShipments: Shipment[] = [
  {
    id: "SHP-001",
    orderId: "ORD-001",
    productId: "1",
    vendorId: "2",
    customerId: "CUST-001",
    logisticsPartnerId: "LP-001",
    trackingNumber: "TRK123456789",
    status: "in_transit",
    priority: "standard",
    weight: 0.5,
    dimensions: { length: 20, width: 15, height: 8 },
    origin: {
      address: "123 Warehouse St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    destination: {
      address: "456 Customer Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA",
    },
    estimatedDelivery: new Date("2024-01-18"),
    cost: 12.5,
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-17"),
    notes: "Handle with care - electronics",
  },
  {
    id: "SHP-002",
    orderId: "ORD-002",
    productId: "4",
    vendorId: "2",
    customerId: "CUST-002",
    logisticsPartnerId: "LP-002",
    trackingNumber: "TRK987654321",
    status: "delivered",
    priority: "express",
    weight: 1.2,
    dimensions: { length: 25, width: 20, height: 12 },
    origin: {
      address: "789 Distribution Center",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    destination: {
      address: "321 Buyer Blvd",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "USA",
    },
    estimatedDelivery: new Date("2024-01-15"),
    actualDelivery: new Date("2024-01-15"),
    cost: 18.75,
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "SHP-003",
    orderId: "ORD-004",
    productId: "2",
    vendorId: "2",
    customerId: "CUST-004",
    logisticsPartnerId: "LP-003",
    trackingNumber: "TRK456789123",
    status: "pending",
    priority: "overnight",
    weight: 0.3,
    dimensions: { length: 15, width: 10, height: 5 },
    origin: {
      address: "555 Vendor Plaza",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA",
    },
    destination: {
      address: "777 Customer Court",
      city: "Dallas",
      state: "TX",
      zipCode: "75201",
      country: "USA",
    },
    estimatedDelivery: new Date("2024-01-19"),
    cost: 25.0,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
    notes: "Urgent delivery requested",
  },
]

export const mockShipmentUpdates: ShipmentUpdate[] = [
  {
    id: "1",
    shipmentId: "SHP-001",
    status: "picked_up",
    location: "New York, NY",
    timestamp: new Date("2024-01-16T10:00:00"),
    description: "Package picked up from warehouse",
    updatedBy: "LP-001",
  },
  {
    id: "2",
    shipmentId: "SHP-001",
    status: "in_transit",
    location: "Newark, NJ",
    timestamp: new Date("2024-01-17T08:30:00"),
    description: "Package in transit to destination",
    updatedBy: "LP-001",
  },
  {
    id: "3",
    shipmentId: "SHP-002",
    status: "delivered",
    location: "San Francisco, CA",
    timestamp: new Date("2024-01-15T14:22:00"),
    description: "Package delivered successfully",
    updatedBy: "LP-002",
  },
]
