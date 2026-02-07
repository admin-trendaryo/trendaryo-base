import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET);
}

export default async function handler(req, res) {
  try {
    verifyToken(req);

    if (req.method === 'GET') {
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
        }
      };
      return res.json(overview);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
