import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

let orders = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { productId: '1', name: 'iPhone 15 Pro', price: 999, quantity: 1 }
    ],
    total: 999,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: '123 Main St, New York, NY 10001',
    orderDate: '2024-01-15T10:30:00Z',
    trackingNumber: 'TRK123456789'
  }
];

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET);
}

export default async function handler(req, res) {
  try {
    verifyToken(req);

    if (req.method === 'GET') {
      if (req.query.id) {
        const order = orders.find(o => o.id === req.query.id);
        if (!order) {
          return res.status(404).json({ error: 'Order not found' });
        }
        return res.json(order);
      }
      return res.json(orders);
    }

    if (req.method === 'POST') {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        ...req.body,
        orderDate: new Date().toISOString()
      };
      orders.push(newOrder);
      return res.status(201).json(newOrder);
    }

    if (req.method === 'PUT') {
      const orderIndex = orders.findIndex(o => o.id === req.query.id);
      if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      if (req.url.includes('/status')) {
        orders[orderIndex].status = req.body.status;
        if (req.body.status === 'delivered') {
          orders[orderIndex].deliveryDate = new Date().toISOString();
        }
      } else if (req.url.includes('/tracking')) {
        orders[orderIndex].trackingNumber = req.body.trackingNumber;
      }
      
      return res.json({ message: 'Order updated successfully', order: orders[orderIndex] });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
