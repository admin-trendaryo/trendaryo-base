// SEO-friendly URL structure for Trendaryo
export const SEO_ROUTES = {
  // Main pages
  home: '/',
  shop: '/shop',
  about: '/about-trendaryo',
  contact: '/contact-us',
  
  // Product categories
  technology: '/technology-products',
  wellness: '/wellness-products',
  smartphones: '/smartphones',
  fitness: '/fitness-trackers',
  supplements: '/organic-supplements',
  
  // Product pages
  product: '/product/:slug',
  
  // User pages
  account: '/my-account',
  cart: '/shopping-cart',
  checkout: '/secure-checkout',
  orderConfirmation: '/order-confirmation',
  
  // Blog (for content marketing)
  blog: '/blog',
  blogPost: '/blog/:slug'
};

// URL slug generation utility
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Product URL structure
export function getProductUrl(product: { id: number; name: string }): string {
  const slug = generateSlug(product.name);
  return `/product/${slug}-${product.id}`;
}