import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  type: 'tech' | 'wellness';
  rating: number;
  image: string;
}

export interface BrowsingHistoryItem {
  productId: number;
  timestamp: number;
  category: string;
  type: 'tech' | 'wellness';
}

export interface PersonalizationSettings {
  enabled: boolean;
  trackBrowsingHistory: boolean;
  showRecommendations: boolean;
  dataRetentionDays: number;
}

interface PersonalizationContextType {
  settings: PersonalizationSettings;
  updateSettings: (newSettings: Partial<PersonalizationSettings>) => void;
  browsingHistory: BrowsingHistoryItem[];
  addToHistory: (product: Product) => void;
  clearHistory: () => void;
  getRecommendations: () => Product[];
  isPersonalizationEnabled: boolean;
}

const defaultSettings: PersonalizationSettings = {
  enabled: false,
  trackBrowsingHistory: false,
  showRecommendations: false,
  dataRetentionDays: 30
};

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PersonalizationSettings>(defaultSettings);
  const [browsingHistory, setBrowsingHistory] = useState<BrowsingHistoryItem[]>([]);

  // Load saved settings and history on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('trendaryo-personalization-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const savedHistory = localStorage.getItem('trendaryo-browsing-history');
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      // Clean old entries based on retention policy
      const cutoffTime = Date.now() - (settings.dataRetentionDays * 24 * 60 * 60 * 1000);
      const filteredHistory = history.filter((item: BrowsingHistoryItem) => item.timestamp > cutoffTime);
      setBrowsingHistory(filteredHistory);
    }
  }, [settings.dataRetentionDays]);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('trendaryo-personalization-settings', JSON.stringify(settings));
  }, [settings]);

  // Save history when it changes
  useEffect(() => {
    if (settings.trackBrowsingHistory) {
      localStorage.setItem('trendaryo-browsing-history', JSON.stringify(browsingHistory));
    }
  }, [browsingHistory, settings.trackBrowsingHistory]);

  const updateSettings = (newSettings: Partial<PersonalizationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    
    // Clear history if tracking is disabled
    if (newSettings.trackBrowsingHistory === false) {
      setBrowsingHistory([]);
      localStorage.removeItem('trendaryo-browsing-history');
    }
  };

  const addToHistory = (product: Product) => {
    if (!settings.enabled || !settings.trackBrowsingHistory) return;

    const historyItem: BrowsingHistoryItem = {
      productId: product.id,
      timestamp: Date.now(),
      category: product.category,
      type: product.type
    };

    setBrowsingHistory(prev => {
      // Remove duplicate entries for the same product
      const filtered = prev.filter(item => item.productId !== product.id);
      // Add new entry at the beginning and limit to 50 items
      return [historyItem, ...filtered].slice(0, 50);
    });
  };

  const clearHistory = () => {
    setBrowsingHistory([]);
    localStorage.removeItem('trendaryo-browsing-history');
  };

  // Placeholder recommendation engine - can be swapped with real API
  const getRecommendations = (): Product[] => {
    if (!settings.enabled || !settings.showRecommendations || browsingHistory.length === 0) {
      return [];
    }

    // Simple recommendation logic based on browsing history
    const techViews = browsingHistory.filter(item => item.type === 'tech').length;
    const wellnessViews = browsingHistory.filter(item => item.type === 'wellness').length;
    const preferredType = techViews > wellnessViews ? 'tech' : 'wellness';

    // Mock recommendations - replace with actual API call
    const mockRecommendations: Product[] = [
      {
        id: 101,
        name: preferredType === 'tech' ? 'Smart Watch Pro' : 'Yoga Mat Premium',
        price: preferredType === 'tech' ? '$299' : '$89',
        category: preferredType === 'tech' ? 'Wearables' : 'Fitness',
        type: preferredType,
        rating: 4.7,
        image: `bg-gradient-to-br from-${preferredType === 'tech' ? 'blue' : 'green'}-100 to-${preferredType === 'tech' ? 'purple' : 'emerald'}-100`
      },
      {
        id: 102,
        name: preferredType === 'tech' ? 'Wireless Charger' : 'Protein Powder',
        price: preferredType === 'tech' ? '$49' : '$39',
        category: preferredType === 'tech' ? 'Accessories' : 'Nutrition',
        type: preferredType,
        rating: 4.5,
        image: `bg-gradient-to-br from-${preferredType === 'tech' ? 'gray' : 'orange'}-100 to-${preferredType === 'tech' ? 'slate' : 'yellow'}-100`
      }
    ];

    return mockRecommendations;
  };

  return (
    <PersonalizationContext.Provider value={{
      settings,
      updateSettings,
      browsingHistory,
      addToHistory,
      clearHistory,
      getRecommendations,
      isPersonalizationEnabled: settings.enabled
    }}>
      {children}
    </PersonalizationContext.Provider>
  );
}

export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider');
  }
  return context;
}