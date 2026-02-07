import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET);
}

function generateAnalyticsData(range) {
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
  
  const monthlyRevenue = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyRevenue.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      revenue: Math.floor(Math.random() * 50000) + 20000
    });
  }

  return {
    sales: {
      totalRevenue: 125000,
      totalOrders: 1250,
      averageOrderValue: 100,
      revenueGrowth: 15.3,
      monthlyRevenue
    },
    traffic: {
      totalVisitors: 25000,
      pageViews: 75000,
      conversionRate: 3.2,
      bounceRate: 45.8
    },
    products: {
      topProducts: [
        { id: '1', name: 'iPhone 15 Pro', sales: 150, revenue: 149850 },
        { id: '2', name: 'Fitness Tracker Pro', sales: 200, revenue: 39800 }
      ]
    }
  };
}

export default async function handler(req, res) {
  try {
    verifyToken(req);

    if (req.method === 'GET') {
      const range = req.query.range || '30d';
      const analytics = generateAnalyticsData(range);
      return res.json(analytics);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
