import express from 'express';
import { verifyAdminToken } from './admin';

const router = express.Router();

// Get admin overview data
router.get('/overview', verifyAdminToken, (req, res) => {
  // Mock overview data - in production, aggregate from all modules
  const overview = {
    sales: {
      totalRevenue: 125000,
      totalOrders: 1250,
      revenueGrowth: 15.3
    },
    products: {
      totalProducts: 89,
      activeProducts: 82,
      lowStockProducts: 7
    },
    customers: {
      totalCustomers: 5200,
      newCustomers: 320,
      activeCustomers: 1450
    },
    orders: {
      pendingOrders: 23,
      processingOrders: 45,
      shippedOrders: 67
    },
    recentActivity: [
      {
        id: '1',
        type: 'order',
        message: 'New order #ORD-1234 received from John Doe',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        type: 'customer',
        message: 'New customer Jane Smith registered',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        type: 'product',
        message: 'iPhone 15 Pro stock is running low (5 remaining)',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        type: 'order',
        message: 'Order #ORD-1230 has been shipped',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        type: 'product',
        message: 'New product "Wireless Earbuds Pro" added to catalog',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      }
    ]
  };

  res.json(overview);
});

// Get system health status
router.get('/system-status', verifyAdminToken, (req, res) => {
  const systemStatus = {
    server: {
      status: 'online',
      uptime: '99.9%',
      lastRestart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    database: {
      status: 'connected',
      responseTime: '12ms',
      connections: 45
    },
    paymentGateway: {
      stripe: { status: 'active', lastCheck: new Date().toISOString() },
      paypal: { status: 'active', lastCheck: new Date().toISOString() },
      afghanBanks: { status: 'active', lastCheck: new Date().toISOString() }
    },
    storage: {
      used: '2.3GB',
      available: '47.7GB',
      usage: '4.6%'
    }
  };

  res.json(systemStatus);
});

// Get module-specific quick stats
router.get('/quick-stats', verifyAdminToken, (req, res) => {
  const quickStats = {
    todayStats: {
      orders: 12,
      revenue: 2450,
      visitors: 1250,
      conversions: 3.2
    },
    weekStats: {
      orders: 89,
      revenue: 18750,
      visitors: 8900,
      conversions: 2.8
    },
    monthStats: {
      orders: 345,
      revenue: 72500,
      visitors: 35600,
      conversions: 2.9
    },
    alerts: [
      { type: 'warning', message: '7 products are low in stock', priority: 'medium' },
      { type: 'info', message: '23 orders pending processing', priority: 'high' },
      { type: 'success', message: 'Payment gateway is functioning normally', priority: 'low' }
    ]
  };

  res.json(quickStats);
});

export default router;