import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

let customers = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    address: '123 Main St, New York, NY 10001',
    joinDate: '2023-12-01T00:00:00Z',
    totalOrders: 3,
    totalSpent: 2500,
    lastOrderDate: '2024-01-15T10:30:00Z',
    status: 'active'
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
        const customer = customers.find(c => c.id === req.query.id);
        if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
        }
        return res.json(customer);
      }
      return res.json(customers);
    }

    if (req.method === 'PUT') {
      const customerIndex = customers.findIndex(c => c.id === req.query.id);
      if (customerIndex === -1) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      customers[customerIndex].status = req.body.status;
      return res.json({ message: 'Customer status updated successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
