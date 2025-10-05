// Environment configuration with validation
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || "postgresql://username:password@localhost:5432/platform_db",
    directUrl: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },

  // Stripe
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  },

  // NextAuth
  auth: {
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  },

  // Email
  email: {
    apiKey: process.env.RESEND_API_KEY || "",
    from: process.env.EMAIL_FROM || "noreply@yourplatform.com",
  },

  // Analytics
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },

  // App
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    name: process.env.NEXT_PUBLIC_APP_NAME || "Platform Control & Revenue Management",
  },

  // File Upload
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  // Logistics APIs
  logistics: {
    fedex: {
      apiKey: process.env.FEDEX_API_KEY || "",
      secretKey: process.env.FEDEX_SECRET_KEY || "",
    },
    ups: {
      accessKey: process.env.UPS_ACCESS_KEY || "",
      username: process.env.UPS_USERNAME || "",
      password: process.env.UPS_PASSWORD || "",
    },
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
  },

  // Environment
  env: process.env.NODE_ENV || "development",
} as const;

// Validation function
export function validateConfig() {
  const required = [
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXTAUTH_SECRET',
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
    console.warn('Some features may not work properly. Please check your .env.local file.');
  }

  return missing.length === 0;
}

