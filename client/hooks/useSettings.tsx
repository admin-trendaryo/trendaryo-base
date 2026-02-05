import { useState, useEffect } from 'react';

interface PublicSettings {
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: string;
    layout: 'boxed' | 'full-width';
    darkMode: boolean;
  };
  seo: {
    siteName: string;
    siteDescription: string;
    keywords: string;
  };
  shipping: {
    freeShippingThreshold: number;
    processingTime: string;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<PublicSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/public/settings');
      const data = await response.json();
      setSettings(data);
      
      // Apply appearance settings to document
      if (data.appearance) {
        applyAppearanceSettings(data.appearance);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyAppearanceSettings = (appearance: PublicSettings['appearance']) => {
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty('--primary-color', appearance.primaryColor);
    root.style.setProperty('--secondary-color', appearance.secondaryColor);
    root.style.setProperty('--accent-color', appearance.accentColor);
    root.style.setProperty('--font-family', appearance.fontFamily);
    root.style.setProperty('--font-size', appearance.fontSize);
    
    // Apply dark mode
    if (appearance.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    
    // Apply layout
    const container = document.querySelector('.main-container');
    if (container) {
      if (appearance.layout === 'boxed') {
        container.classList.add('max-w-7xl', 'mx-auto');
      } else {
        container.classList.remove('max-w-7xl', 'mx-auto');
      }
    }
  };

  return {
    settings,
    loading,
    refetch: fetchSettings
  };
}