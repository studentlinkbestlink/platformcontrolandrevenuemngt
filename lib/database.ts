import { PrismaClient } from '@prisma/client';
import { config } from './config';

// Database connection
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url,
    },
  },
});

// Database utility functions
export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Database disconnection failed:', error);
    throw error;
  }
};

// Health check
export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message, timestamp: new Date() };
  }
};

// Transaction helper
export const withTransaction = async <T>(
  callback: (tx: PrismaClient) => Promise<T>
): Promise<T> => {
  return await prisma.$transaction(callback);
};

// Common database operations
export const dbOperations = {
  // User operations
  createUser: async (userData: any) => {
    return await prisma.user.create({ data: userData });
  },

  findUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  updateUser: async (id: string, userData: any) => {
    return await prisma.user.update({ where: { id }, data: userData });
  },

  // Product operations
  createProduct: async (productData: any) => {
    return await prisma.product.create({ data: productData });
  },

  findProductsByVendor: async (vendorId: string) => {
    return await prisma.product.findMany({ where: { vendorId } });
  },

  // Order operations
  createOrder: async (orderData: any) => {
    return await prisma.order.create({ data: orderData });
  },

  findOrdersByCustomer: async (customerId: string) => {
    return await prisma.order.findMany({ where: { customerId } });
  },

  // Analytics queries
  getSalesAnalytics: async (startDate: Date, endDate: Date) => {
    return await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: 'delivered',
      },
      _sum: {
        total: true,
      },
      _count: true,
    });
  },

  getVendorEarnings: async (vendorId: string, startDate: Date, endDate: Date) => {
    return await prisma.orderItem.aggregate({
      where: {
        vendorId,
        order: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
          status: 'delivered',
        },
      },
      _sum: {
        vendorEarnings: true,
        commissionAmount: true,
      },
      _count: true,
    });
  },
};

