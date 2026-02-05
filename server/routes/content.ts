import express from 'express';
import { verifyAdminToken } from './admin';

const router = express.Router();

// Mock content data - replace with database
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
    },
    {
      id: '2',
      title: 'New Arrivals',
      description: 'Check out our latest products',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
      link: '/shop/new-arrivals',
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
    },
    {
      id: '2',
      title: 'Free Shipping',
      discount: 'Free Shipping',
      code: 'FREESHIP',
      validUntil: '2024-12-31',
      active: true
    }
  ]
};

// Get all content
router.get('/content', verifyAdminToken, (req, res) => {
  res.json(contentData);
});

// Update content
router.put('/content', verifyAdminToken, (req, res) => {
  try {
    contentData = { ...contentData, ...req.body };
    res.json({ message: 'Content updated successfully', data: contentData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Get public content (for frontend)
router.get('/public/content', (req, res) => {
  // Return only active/public content
  const publicContent = {
    hero: contentData.hero,
    brand: contentData.brand,
    banners: contentData.banners.filter(banner => banner.active),
    featuredProducts: contentData.featuredProducts,
    promotions: contentData.promotions.filter(promo => promo.active)
  };
  
  res.json(publicContent);
});

// Get specific content section
router.get('/content/:section', verifyAdminToken, (req, res) => {
  const section = req.params.section;
  
  if (contentData[section as keyof typeof contentData]) {
    res.json(contentData[section as keyof typeof contentData]);
  } else {
    res.status(404).json({ error: 'Content section not found' });
  }
});

// Update specific content section
router.put('/content/:section', verifyAdminToken, (req, res) => {
  const section = req.params.section;
  
  if (contentData[section as keyof typeof contentData]) {
    (contentData as any)[section] = { ...contentData[section as keyof typeof contentData], ...req.body };
    res.json({ message: `${section} updated successfully` });
  } else {
    res.status(404).json({ error: 'Content section not found' });
  }
});

// Add banner
router.post('/content/banners', verifyAdminToken, (req, res) => {
  const newBanner = {
    id: Date.now().toString(),
    ...req.body
  };
  
  contentData.banners.push(newBanner);
  res.status(201).json(newBanner);
});

// Delete banner
router.delete('/content/banners/:id', verifyAdminToken, (req, res) => {
  const bannerId = req.params.id;
  contentData.banners = contentData.banners.filter(banner => banner.id !== bannerId);
  res.json({ message: 'Banner deleted successfully' });
});

// Add promotion
router.post('/content/promotions', verifyAdminToken, (req, res) => {
  const newPromotion = {
    id: Date.now().toString(),
    ...req.body
  };
  
  contentData.promotions.push(newPromotion);
  res.status(201).json(newPromotion);
});

// Delete promotion
router.delete('/content/promotions/:id', verifyAdminToken, (req, res) => {
  const promotionId = req.params.id;
  contentData.promotions = contentData.promotions.filter(promo => promo.id !== promotionId);
  res.json({ message: 'Promotion deleted successfully' });
});

// Validate promotion code
router.post('/content/validate-promo', (req, res) => {
  const { code } = req.body;
  const promotion = contentData.promotions.find(
    promo => promo.code === code && promo.active && new Date(promo.validUntil) > new Date()
  );
  
  if (promotion) {
    res.json({ valid: true, promotion });
  } else {
    res.json({ valid: false, message: 'Invalid or expired promotion code' });
  }
});

export default router;