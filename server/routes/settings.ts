import express from 'express';
import { verifyAdminToken, requireAdmin } from './admin';

const router = express.Router();

// Mock settings data - replace with database
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
    stripe: {
      enabled: true,
      publicKey: 'pk_test_...',
      secretKey: 'sk_test_...'
    },
    paypal: {
      enabled: true,
      clientId: '',
      clientSecret: ''
    },
    razorpay: {
      enabled: false,
      keyId: '',
      keySecret: ''
    },
    wise: {
      enabled: false,
      apiKey: ''
    },
    afghanBanks: {
      enabled: true,
      supportedBanks: ['Afghanistan Bank', 'Azizi Bank']
    }
  },
  shipping: {
    freeShippingThreshold: 100,
    domesticRate: 5.99,
    internationalRate: 15.99,
    processingTime: '2-3 business days',
    shippingZones: [
      {
        name: 'Afghanistan',
        countries: ['AF'],
        rate: 3.99
      },
      {
        name: 'South Asia',
        countries: ['PK', 'IN', 'BD'],
        rate: 8.99
      },
      {
        name: 'International',
        countries: ['US', 'CA', 'GB', 'AU'],
        rate: 15.99
      }
    ]
  },
  seo: {
    siteName: 'Trendaryo - Effortless Excellence',
    siteDescription: 'Premium tech and wellness products for modern living. Discover effortless excellence with Trendaryo.',
    keywords: 'ecommerce, technology, wellness, afghanistan, online shopping, premium products',
    googleAnalytics: '',
    googleSearchConsole: '',
    facebookPixel: '',
    robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/

Sitemap: https://trendaryo.com/sitemap.xml`,
    sitemapUrl: 'https://trendaryo.com/sitemap.xml'
  }
};

// Get all settings
router.get('/settings', verifyAdminToken, (req, res) => {
  res.json(siteSettings);
});

// Update settings
router.put('/settings', verifyAdminToken, requireAdmin, (req, res) => {
  try {
    siteSettings = { ...siteSettings, ...req.body };
    
    // Apply settings to site (in production, this would update CSS variables, etc.)
    applyAppearanceSettings(siteSettings.appearance);
    
    res.json({ message: 'Settings updated successfully', settings: siteSettings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Get specific settings section
router.get('/settings/:section', verifyAdminToken, (req, res) => {
  const section = req.params.section;
  
  if (siteSettings[section as keyof typeof siteSettings]) {
    res.json(siteSettings[section as keyof typeof siteSettings]);
  } else {
    res.status(404).json({ error: 'Settings section not found' });
  }
});

// Update specific settings section
router.put('/settings/:section', verifyAdminToken, requireAdmin, (req, res) => {
  const section = req.params.section;
  
  if (siteSettings[section as keyof typeof siteSettings]) {
    (siteSettings as any)[section] = { ...siteSettings[section as keyof typeof siteSettings], ...req.body };
    
    if (section === 'appearance') {
      applyAppearanceSettings(siteSettings.appearance);
    }
    
    res.json({ message: `${section} settings updated successfully` });
  } else {
    res.status(404).json({ error: 'Settings section not found' });
  }
});

// Generate sitemap
router.post('/settings/generate-sitemap', verifyAdminToken, requireAdmin, (req, res) => {
  try {
    const sitemap = generateSitemap();
    
    // In production, write to public/sitemap.xml
    // require('fs').writeFileSync('public/sitemap.xml', sitemap);
    
    res.json({ 
      message: 'Sitemap generated successfully',
      url: siteSettings.seo.sitemapUrl,
      content: sitemap
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
});

// Get robots.txt
router.get('/settings/robots-txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(siteSettings.seo.robotsTxt);
});

// Update robots.txt
router.put('/settings/robots-txt', verifyAdminToken, requireAdmin, (req, res) => {
  const { content } = req.body;
  siteSettings.seo.robotsTxt = content;
  
  // In production, write to public/robots.txt
  // require('fs').writeFileSync('public/robots.txt', content);
  
  res.json({ message: 'Robots.txt updated successfully' });
});

// Test payment gateway
router.post('/settings/test-payment/:gateway', verifyAdminToken, (req, res) => {
  const gateway = req.params.gateway;
  const config = siteSettings.payments[gateway as keyof typeof siteSettings.payments];
  
  if (!config || !config.enabled) {
    return res.status(400).json({ error: 'Payment gateway not enabled' });
  }
  
  // Mock payment test
  const testResult = {
    gateway,
    status: 'success',
    message: `${gateway} connection test successful`,
    timestamp: new Date().toISOString()
  };
  
  res.json(testResult);
});

// Get public settings (for frontend)
router.get('/public/settings', (req, res) => {
  const publicSettings = {
    appearance: siteSettings.appearance,
    seo: {
      siteName: siteSettings.seo.siteName,
      siteDescription: siteSettings.seo.siteDescription,
      keywords: siteSettings.seo.keywords
    },
    shipping: {
      freeShippingThreshold: siteSettings.shipping.freeShippingThreshold,
      processingTime: siteSettings.shipping.processingTime
    }
  };
  
  res.json(publicSettings);
});

// Helper function to apply appearance settings
function applyAppearanceSettings(appearance: any) {
  // In production, this would update CSS custom properties
  // or generate a new CSS file with the updated colors
  console.log('Applying appearance settings:', appearance);
  
  // Example: Update CSS variables
  const cssVariables = `
    :root {
      --primary-color: ${appearance.primaryColor};
      --secondary-color: ${appearance.secondaryColor};
      --accent-color: ${appearance.accentColor};
      --font-family: ${appearance.fontFamily};
      --font-size: ${appearance.fontSize};
    }
  `;
  
  // In production, write this to a CSS file or update database
  return cssVariables;
}

// Helper function to generate sitemap
function generateSitemap() {
  const baseUrl = 'https://trendaryo.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/shop', priority: '0.9', changefreq: 'daily' },
    { url: '/technology-products', priority: '0.8', changefreq: 'weekly' },
    { url: '/wellness-products', priority: '0.8', changefreq: 'weekly' },
    { url: '/about-trendaryo', priority: '0.6', changefreq: 'monthly' },
    { url: '/contact-us', priority: '0.6', changefreq: 'monthly' }
  ];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  staticPages.forEach(page => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Add product pages (mock data)
  for (let i = 1; i <= 10; i++) {
    sitemap += `
  <url>
    <loc>${baseUrl}/product/${i}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  sitemap += `
</urlset>`;

  return sitemap;
}

export default router;