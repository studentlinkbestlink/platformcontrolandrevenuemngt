import { config } from './config';

// Google Analytics integration
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', config.analytics.gaId, {
      page_path: url,
    });
  }
};

// Custom analytics events
export const analyticsEvents = {
  // User events
  userRegistered: (role: string) => {
    trackEvent('user_registered', { role });
  },

  userLoggedIn: (role: string) => {
    trackEvent('user_logged_in', { role });
  },

  // Product events
  productCreated: (vendorId: string, category: string) => {
    trackEvent('product_created', { vendor_id: vendorId, category });
  },

  productViewed: (productId: string, vendorId: string) => {
    trackEvent('product_viewed', { product_id: productId, vendor_id: vendorId });
  },

  // Order events
  orderPlaced: (orderId: string, total: number, itemCount: number) => {
    trackEvent('order_placed', {
      order_id: orderId,
      value: total,
      item_count: itemCount,
    });
  },

  orderCompleted: (orderId: string, total: number) => {
    trackEvent('order_completed', {
      order_id: orderId,
      value: total,
    });
  },

  // Payment events
  paymentInitiated: (amount: number, method: string) => {
    trackEvent('payment_initiated', {
      value: amount,
      payment_method: method,
    });
  },

  paymentCompleted: (amount: number, method: string) => {
    trackEvent('payment_completed', {
      value: amount,
      payment_method: method,
    });
  },

  // Subscription events
  subscriptionCreated: (planId: string, amount: number) => {
    trackEvent('subscription_created', {
      plan_id: planId,
      value: amount,
    });
  },

  subscriptionCancelled: (planId: string) => {
    trackEvent('subscription_cancelled', { plan_id: planId });
  },

  // Error tracking
  errorOccurred: (error: string, context: string) => {
    trackEvent('error_occurred', {
      error_message: error,
      error_context: context,
    });
  },
};

// Analytics dashboard data
export const getAnalyticsData = async (timeframe: 'day' | 'week' | 'month' | 'year' = 'month') => {
  const now = new Date();
  let startDate: Date;

  switch (timeframe) {
    case 'day':
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case 'year':
      startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      break;
  }

  // Mock data - replace with actual database queries
  return {
    totalRevenue: 125000,
    totalOrders: 1250,
    totalUsers: 500,
    totalVendors: 75,
    averageOrderValue: 100,
    conversionRate: 3.2,
    topProducts: [
      { id: '1', name: 'Wireless Headphones', sales: 150, revenue: 15000 },
      { id: '2', name: 'Smart Watch', sales: 120, revenue: 18000 },
      { id: '3', name: 'Bluetooth Speaker', sales: 100, revenue: 8000 },
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 10000 },
      { month: 'Feb', revenue: 15000 },
      { month: 'Mar', revenue: 12000 },
      { month: 'Apr', revenue: 18000 },
      { month: 'May', revenue: 20000 },
      { month: 'Jun', revenue: 25000 },
    ],
    userGrowth: [
      { month: 'Jan', users: 100 },
      { month: 'Feb', users: 150 },
      { month: 'Mar', users: 200 },
      { month: 'Apr', users: 250 },
      { month: 'May', users: 300 },
      { month: 'Jun', users: 350 },
    ],
  };
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number, context?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance_metric', {
      metric_name: metric,
      metric_value: value,
      context: context || 'general',
    });
  }
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

