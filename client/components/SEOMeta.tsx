import { Helmet } from 'react-helmet-async';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export default function SEOMeta({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage = 'https://trendaryo.com/images/og-image.jpg',
  noindex = false 
}: SEOMetaProps) {
  const fullTitle = title.includes('Trendaryo') ? title : `${title} | Trendaryo`;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={truncatedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

// Pre-defined SEO data for main pages
export const SEO_DATA = {
  home: {
    title: 'Trendaryo - Premium Tech & Wellness Products | Effortless Excellence',
    description: 'Discover cutting-edge technology and holistic wellness products. Premium smartphones, fitness trackers, organic supplements & more. Free shipping worldwide.',
    keywords: 'technology, wellness, smartphones, fitness trackers, organic supplements, premium gadgets, health products, Afghanistan, global shipping',
    canonical: 'https://trendaryo.com/'
  },
  shop: {
    title: 'Shop Premium Tech & Wellness Products - Trendaryo',
    description: 'Browse our curated collection of premium technology and wellness products. Find the perfect gadgets and health products for modern living.',
    keywords: 'shop technology, buy wellness products, premium gadgets, health supplements, fitness equipment',
    canonical: 'https://trendaryo.com/shop'
  },
  technology: {
    title: 'Technology Products - Smartphones, Laptops & Gadgets | Trendaryo',
    description: 'Explore cutting-edge technology products including smartphones, laptops, wearables, and smart gadgets. Premium tech for modern living.',
    keywords: 'technology products, smartphones, laptops, wearables, smart gadgets, premium tech',
    canonical: 'https://trendaryo.com/technology-products'
  },
  wellness: {
    title: 'Wellness Products - Fitness, Health & Organic Supplements | Trendaryo',
    description: 'Discover premium wellness products including fitness trackers, organic supplements, health monitors, and natural wellness solutions.',
    keywords: 'wellness products, fitness trackers, organic supplements, health monitors, natural wellness',
    canonical: 'https://trendaryo.com/wellness-products'
  },
  about: {
    title: 'About Trendaryo - Premium Tech & Wellness Brand',
    description: 'Learn about Trendaryo\'s mission to bridge cutting-edge technology with holistic wellness. Discover our story and commitment to excellence.',
    keywords: 'about trendaryo, company story, tech wellness brand, premium products',
    canonical: 'https://trendaryo.com/about-trendaryo'
  },
  contact: {
    title: 'Contact Trendaryo - Customer Support & Inquiries',
    description: 'Get in touch with Trendaryo for customer support, product inquiries, or partnership opportunities. We\'re here to help.',
    keywords: 'contact trendaryo, customer support, product inquiries, help',
    canonical: 'https://trendaryo.com/contact-us'
  }
};