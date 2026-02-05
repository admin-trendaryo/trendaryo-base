import { useState, useEffect } from 'react';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaText: string;
    ctaLink: string;
  };
  brand: {
    logo: string;
    tagline: string;
    primaryColor: string;
    secondaryColor: string;
  };
  banners: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    active: boolean;
  }>;
  featuredProducts: string[];
  promotions: Array<{
    id: string;
    title: string;
    discount: string;
    code: string;
    validUntil: string;
    active: boolean;
  }>;
}

export function useContent() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/public/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const validatePromoCode = async (code: string) => {
    try {
      const response = await fetch('/api/content/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to validate promo code:', error);
      return { valid: false, message: 'Validation failed' };
    }
  };

  return {
    content,
    loading,
    validatePromoCode,
    refetch: fetchContent
  };
}