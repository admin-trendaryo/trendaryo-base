import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

let products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    category: 'Smartphones',
    tags: ['trending', 'premium'],
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    stock: 50,
    status: 'active',
    description: 'Latest iPhone with advanced features'
  },
  {
    id: '2',
    name: 'Fitness Tracker Pro',
    price: 199,
    category: 'Wellness',
    tags: ['health', 'fitness'],
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    stock: 100,
    status: 'active',
    description: 'Advanced fitness tracking device'
  }
];

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET);
}

export default async function handler(req, res) {
  try {
    const user = verifyToken(req);

    if (req.method === 'GET') {
      if (req.query.id) {
        const product = products.find(p => p.id === req.query.id);
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.json(product);
      }
      return res.json(products);
    }

    if (req.method === 'POST') {
      const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock)
      };
      products.push(newProduct);
      return res.status(201).json(newProduct);
    }

    if (req.method === 'PUT') {
      const index = products.findIndex(p => p.id === req.query.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products[index] = {
        ...products[index],
        ...req.body,
        price: parseFloat(req.body.price),
        stock: parseInt(req.body.stock)
      };
      return res.json(products[index]);
    }

    if (req.method === 'DELETE') {
      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      const index = products.findIndex(p => p.id === req.query.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products.splice(index, 1);
      return res.json({ message: 'Product deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
