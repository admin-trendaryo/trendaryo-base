import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

let contentData = {
  hero: {
    title: 'Discover Effortless Excellence',
    subtitle: 'Premium tech and wellness products for modern living',
    backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200',
    ctaText: 'Shop Now',
    ctaLink: '/shop'
  },
  brand: {
    logo: '/logo.png',
    tagline: 'Effortless Excellence',
    primaryColor: '#F97316',
    secondaryColor: '#1E3A8A'
  },
  banners: [
    {
      id: '1',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
      link: '/shop',
      active: true
    }
  ],
  featuredProducts: ['1', '2'],
  promotions: [
    {
      id: '1',
      title: 'Welcome Discount',
      discount: '15%',
      code: 'WELCOME15',
      validUntil: '2024-12-31',
      active: true
    }
  ]
};

function verifyToken(req) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new Error('No token provided');
  return jwt.verify(token, JWT_SECRET);
}

export default async function handler(req, res) {
  const { section } = req.query;

  if (req.url.includes('/public/content')) {
    const publicContent = {
      hero: contentData.hero,
      brand: contentData.brand,
      banners: contentData.banners.filter(banner => banner.active),
      featuredProducts: contentData.featuredProducts,
      promotions: contentData.promotions.filter(promo => promo.active)
    };
    return res.json(publicContent);
  }

  try {
    verifyToken(req);

    if (req.method === 'GET') {
      if (section) {
        if (contentData[section]) {
          return res.json(contentData[section]);
        }
        return res.status(404).json({ error: 'Content section not found' });
      }
      return res.json(contentData);
    }

    if (req.method === 'PUT') {
      if (section) {
        if (contentData[section]) {
          contentData[section] = { ...contentData[section], ...req.body };
          return res.json({ message: `${section} updated successfully` });
        }
        return res.status(404).json({ error: 'Content section not found' });
      }
      contentData = { ...contentData, ...req.body };
      return res.json({ message: 'Content updated successfully', data: contentData });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
