# 🚀 Platform Control & Revenue Management System - Setup Guide

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL database
- Redis (optional, for caching)

## 🔧 Environment Configuration

### 1. Copy Environment File
```bash
cp env.local.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your actual API keys and configuration:

#### Database
```env
DATABASE_URL="postgresql://username:password@localhost:5432/platform_db"
DIRECT_URL="postgresql://username:password@localhost:5432/platform_db"
```

#### Stripe (Required for payments)
```env
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
```

#### Authentication
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret_here"
```

#### Email Service (Resend)
```env
RESEND_API_KEY="re_your_resend_api_key_here"
EMAIL_FROM="noreply@yourplatform.com"
```

#### Analytics
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

#### File Upload (Cloudinary)
```env
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

#### Logistics APIs (Optional)
```env
FEDEX_API_KEY="your_fedex_api_key"
FEDEX_SECRET_KEY="your_fedex_secret_key"
UPS_ACCESS_KEY="your_ups_access_key"
UPS_USERNAME="your_ups_username"
UPS_PASSWORD="your_ups_password"
```

## 🗄️ Database Setup

### 1. Install Prisma
```bash
npm install prisma @prisma/client
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Create Database Schema
Create `prisma/schema.prisma` with your database models.

### 4. Run Migrations
```bash
npx prisma migrate dev
npx prisma generate
```

## 🔑 API Service Setup

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks for payment events
4. Update environment variables

### Email Service (Resend)
1. Create account at [resend.com](https://resend.com)
2. Get your API key
3. Verify your domain
4. Update environment variables

### Google Analytics
1. Create Google Analytics account
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Update environment variables

### Cloudinary (File Upload)
1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and secret
3. Update environment variables

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access Application
Open [http://localhost:3000](http://localhost:3000)

## 🔐 Test Accounts

Use these pre-configured accounts to test different roles:

- **Admin**: `admin@platform.com` / `admin123`
- **Vendor**: `vendor@platform.com` / `vendor123`
- **Logistics**: `logistics@platform.com` / `logistics123`
- **Finance**: `finance@platform.com` / `finance123`

## 📊 Features Overview

### Admin Dashboard
- Complete system oversight
- Revenue analytics
- User management
- Dispute resolution
- Platform settings

### Vendor Portal
- Product management
- Order tracking
- Earnings dashboard
- Subscription management
- Analytics

### Logistics Hub
- Order fulfillment
- Shipping management
- Tracking coordination
- Delivery updates

### Finance Center
- Revenue reporting
- Payout management
- Transaction logs
- Financial analytics

## 🔌 API Integrations

### Payment Processing
- **Stripe**: Credit card payments, subscriptions, payouts
- **Webhooks**: Real-time payment event handling

### Email Services
- **Resend**: Transactional emails, notifications
- **Templates**: Welcome, order confirmation, payout notifications

### Analytics
- **Google Analytics**: User behavior tracking
- **Custom Events**: Order tracking, revenue analytics

### Logistics
- **FedEx API**: Shipping rates, label generation, tracking
- **UPS API**: Alternative shipping options

### File Storage
- **Cloudinary**: Image uploads, optimization, CDN

## 🛠️ Development

### Project Structure
```
├── app/                 # Next.js app router
├── components/          # React components
├── lib/                 # Utilities and configurations
│   ├── auth.tsx        # Authentication
│   ├── config.ts       # Environment config
│   ├── database.ts     # Database operations
│   ├── email.ts        # Email service
│   ├── stripe-real.ts  # Stripe integration
│   ├── analytics.ts    # Analytics tracking
│   └── logistics.ts    # Shipping APIs
├── public/             # Static assets
└── styles/             # Global styles
```

### Key Files
- `lib/config.ts` - Environment configuration
- `lib/auth.tsx` - Authentication provider
- `lib/stripe-real.ts` - Real Stripe integration
- `lib/email.ts` - Email service
- `lib/analytics.ts` - Analytics tracking

## 🚨 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the root directory
   - Restart the development server after changes

2. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials
   - Ensure database exists

3. **Stripe Integration Issues**
   - Verify API keys are correct
   - Check webhook endpoints
   - Ensure test mode is enabled for development

4. **Email Not Sending**
   - Verify Resend API key
   - Check domain verification
   - Review email templates

## 📈 Production Deployment

### Environment Variables
Set all production environment variables in your hosting platform.

### Database
Use a managed PostgreSQL service (AWS RDS, Supabase, etc.)

### File Storage
Configure Cloudinary for production with proper security settings.

### Monitoring
Set up error tracking and performance monitoring.

## 🔒 Security Considerations

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Enable HTTPS in production
- Regularly rotate API keys
- Implement rate limiting
- Use proper CORS settings

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check environment configuration
4. Verify all services are properly set up

---

**Happy coding! 🎉**

