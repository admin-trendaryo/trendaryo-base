import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

let siteSettings = {
  appearance: {
    primaryColor: '#F97316',
    secondaryColor: '#1E3A8A',
    accentColor: '#10B981',
    fontFamily: 'Inter',
    fontSize: '16px',
    layout: 'full-width',
    darkMode: false
  },
  payments: {
    stripe: { enabled: true },
    paypal: { enabled: true }
  },
  shipping: {
    freeShippingThreshold: 100,
    domesticRate: 5.99,
    internationalRate: 15.99
  }
};

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded.role !== 'admin') throw new Error('Admin access required');
  return decoded;
}

export default async function handler(req, res) {
  if (req.url.includes('/public/settings')) {
    const publicSettings = {
      appearance: siteSettings.appearance,
      shipping: {
        freeShippingThreshold: siteSettings.shipping.freeShippingThreshold
      }
    };
    return res.json(publicSettings);
  }

  try {
    verifyToken(req);

    if (req.method === 'GET') {
      return res.json(siteSettings);
    }

    if (req.method === 'PUT') {
      siteSettings = { ...siteSettings, ...req.body };
      return res.json({ message: 'Settings updated successfully', settings: siteSettings });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
