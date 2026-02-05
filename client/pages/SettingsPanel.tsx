import React, { useState, useEffect } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import { useAuth } from '../hooks/useAuth';
import AdminLayout from '../components/AdminLayout';

export default function SettingsPanel() {
  // ... existing component code ...

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <MagneticButton
            onClick={saveSettings}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </MagneticButton>
        </div>
        {/* ... rest of existing component ... */}
      </div>
    </AdminLayout>
  );
}

interface Settings {
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    fontSize: string;
    layout: 'boxed' | 'full-width';
    darkMode: boolean;
  };
  payments: {
    stripe: { enabled: boolean; publicKey: string; secretKey: string };
    paypal: { enabled: boolean; clientId: string; clientSecret: string };
    razorpay: { enabled: boolean; keyId: string; keySecret: string };
    wise: { enabled: boolean; apiKey: string };
    afghanBanks: { enabled: boolean; supportedBanks: string[] };
  };
  shipping: {
    freeShippingThreshold: number;
    domesticRate: number;
    internationalRate: number;
    processingTime: string;
    shippingZones: Array<{ name: string; countries: string[]; rate: number }>;
  };
  seo: {
    siteName: string;
    siteDescription: string;
    keywords: string;
    googleAnalytics: string;
    googleSearchConsole: string;
    facebookPixel: string;
    robotsTxt: string;
    sitemapUrl: string;
  };
}

export default function SettingsPanel() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [activeTab, setActiveTab] = useState('appearance');
  const [saving, setSaving] = useState(false);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(settings)
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const generateSitemap = async () => {
    try {
      await fetch('/api/admin/settings/generate-sitemap', {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      alert('Sitemap generated successfully!');
    } catch (error) {
      console.error('Failed to generate sitemap:', error);
    }
  };

  if (!settings) return <div className="p-6">Loading settings...</div>;

  const tabs = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'payments', label: 'Payments' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'seo', label: 'SEO & Analytics' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <MagneticButton
          onClick={saveSettings}
          disabled={saving}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Settings'}
        </MagneticButton>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'appearance' && (
            <AppearanceSettings settings={settings} setSettings={setSettings} />
          )}
          {activeTab === 'payments' && (
            <PaymentSettings settings={settings} setSettings={setSettings} />
          )}
          {activeTab === 'shipping' && (
            <ShippingSettings settings={settings} setSettings={setSettings} />
          )}
          {activeTab === 'seo' && (
            <SEOSettings settings={settings} setSettings={setSettings} onGenerateSitemap={generateSitemap} />
          )}
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings({ settings, setSettings }: any) {
  const updateAppearance = (field: string, value: any) => {
    setSettings({
      ...settings,
      appearance: { ...settings.appearance, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Site Appearance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) => updateAppearance('primaryColor', e.target.value)}
              className="w-16 h-10 border rounded"
            />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) => updateAppearance('primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={settings.appearance.secondaryColor}
              onChange={(e) => updateAppearance('secondaryColor', e.target.value)}
              className="w-16 h-10 border rounded"
            />
            <input
              type="text"
              value={settings.appearance.secondaryColor}
              onChange={(e) => updateAppearance('secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Font Family</label>
          <select
            value={settings.appearance.fontFamily}
            onChange={(e) => updateAppearance('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Playfair Display">Playfair Display</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Layout Style</label>
          <select
            value={settings.appearance.layout}
            onChange={(e) => updateAppearance('layout', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="full-width">Full Width</option>
            <option value="boxed">Boxed</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="darkMode"
          checked={settings.appearance.darkMode}
          onChange={(e) => updateAppearance('darkMode', e.target.checked)}
          className="mr-3"
        />
        <label htmlFor="darkMode" className="text-sm font-medium">Enable Dark Mode</label>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Preview</h3>
        <div 
          className="h-32 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: settings.appearance.primaryColor }}
        >
          <div className="text-center" style={{ fontFamily: settings.appearance.fontFamily }}>
            <h2 className="text-xl font-bold">Trendaryo</h2>
            <p>Effortless Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentSettings({ settings, setSettings }: any) {
  const updatePayment = (provider: string, field: string, value: any) => {
    setSettings({
      ...settings,
      payments: {
        ...settings.payments,
        [provider]: { ...settings.payments[provider], [field]: value }
      }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Methods</h2>
      
      {/* Stripe */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Stripe</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payments.stripe.enabled}
              onChange={(e) => updatePayment('stripe', 'enabled', e.target.checked)}
              className="mr-2"
            />
            Enabled
          </label>
        </div>
        {settings.payments.stripe.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Public Key</label>
              <input
                type="text"
                value={settings.payments.stripe.publicKey}
                onChange={(e) => updatePayment('stripe', 'publicKey', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                placeholder="pk_test_..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secret Key</label>
              <input
                type="password"
                value={settings.payments.stripe.secretKey}
                onChange={(e) => updatePayment('stripe', 'secretKey', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                placeholder="sk_test_..."
              />
            </div>
          </div>
        )}
      </div>

      {/* PayPal */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">PayPal</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payments.paypal.enabled}
              onChange={(e) => updatePayment('paypal', 'enabled', e.target.checked)}
              className="mr-2"
            />
            Enabled
          </label>
        </div>
        {settings.payments.paypal.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client ID</label>
              <input
                type="text"
                value={settings.payments.paypal.clientId}
                onChange={(e) => updatePayment('paypal', 'clientId', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Client Secret</label>
              <input
                type="password"
                value={settings.payments.paypal.clientSecret}
                onChange={(e) => updatePayment('paypal', 'clientSecret', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Afghan Banks */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Afghan Banks</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.payments.afghanBanks.enabled}
              onChange={(e) => updatePayment('afghanBanks', 'enabled', e.target.checked)}
              className="mr-2"
            />
            Enabled
          </label>
        </div>
        {settings.payments.afghanBanks.enabled && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Supported Banks</label>
            {['Afghanistan Bank', 'Azizi Bank', 'AIB Bank', 'Maiwand Bank'].map(bank => (
              <label key={bank} className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.payments.afghanBanks.supportedBanks.includes(bank)}
                  onChange={(e) => {
                    const banks = e.target.checked
                      ? [...settings.payments.afghanBanks.supportedBanks, bank]
                      : settings.payments.afghanBanks.supportedBanks.filter((b: string) => b !== bank);
                    updatePayment('afghanBanks', 'supportedBanks', banks);
                  }}
                  className="mr-2"
                />
                {bank}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ShippingSettings({ settings, setSettings }: any) {
  const updateShipping = (field: string, value: any) => {
    setSettings({
      ...settings,
      shipping: { ...settings.shipping, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Shipping Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Free Shipping Threshold ($)</label>
          <input
            type="number"
            value={settings.shipping.freeShippingThreshold}
            onChange={(e) => updateShipping('freeShippingThreshold', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Domestic Shipping Rate ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shipping.domesticRate}
            onChange={(e) => updateShipping('domesticRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">International Shipping Rate ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.shipping.internationalRate}
            onChange={(e) => updateShipping('internationalRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Processing Time</label>
          <select
            value={settings.shipping.processingTime}
            onChange={(e) => updateShipping('processingTime', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="1-2 business days">1-2 business days</option>
            <option value="2-3 business days">2-3 business days</option>
            <option value="3-5 business days">3-5 business days</option>
            <option value="5-7 business days">5-7 business days</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Shipping Zones</h3>
        <div className="space-y-3">
          {settings.shipping.shippingZones.map((zone: any, index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Zone Name</label>
                  <input
                    type="text"
                    value={zone.name}
                    onChange={(e) => {
                      const zones = [...settings.shipping.shippingZones];
                      zones[index].name = e.target.value;
                      updateShipping('shippingZones', zones);
                    }}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Countries</label>
                  <input
                    type="text"
                    value={zone.countries.join(', ')}
                    onChange={(e) => {
                      const zones = [...settings.shipping.shippingZones];
                      zones[index].countries = e.target.value.split(',').map(c => c.trim());
                      updateShipping('shippingZones', zones);
                    }}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="US, CA, MX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rate ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={zone.rate}
                    onChange={(e) => {
                      const zones = [...settings.shipping.shippingZones];
                      zones[index].rate = parseFloat(e.target.value);
                      updateShipping('shippingZones', zones);
                    }}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SEOSettings({ settings, setSettings, onGenerateSitemap }: any) {
  const updateSEO = (field: string, value: string) => {
    setSettings({
      ...settings,
      seo: { ...settings.seo, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">SEO & Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <input
            type="text"
            value={settings.seo.siteName}
            onChange={(e) => updateSEO('siteName', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
          <input
            type="text"
            value={settings.seo.googleAnalytics}
            onChange={(e) => updateSEO('googleAnalytics', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="GA4-XXXXXXXXX"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Site Description</label>
        <textarea
          value={settings.seo.siteDescription}
          onChange={(e) => updateSEO('siteDescription', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Keywords (comma separated)</label>
        <input
          type="text"
          value={settings.seo.keywords}
          onChange={(e) => updateSEO('keywords', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="ecommerce, tech, wellness, afghanistan"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Google Search Console</label>
          <input
            type="text"
            value={settings.seo.googleSearchConsole}
            onChange={(e) => updateSEO('googleSearchConsole', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Verification code"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Facebook Pixel ID</label>
          <input
            type="text"
            value={settings.seo.facebookPixel}
            onChange={(e) => updateSEO('facebookPixel', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Robots.txt Content</label>
        <textarea
          value={settings.seo.robotsTxt}
          onChange={(e) => updateSEO('robotsTxt', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-sm"
          rows={6}
        />
      </div>

      <div className="flex gap-3">
        <MagneticButton
          onClick={onGenerateSitemap}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Generate Sitemap
        </MagneticButton>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Current Sitemap URL</label>
          <input
            type="url"
            value={settings.seo.sitemapUrl}
            onChange={(e) => updateSEO('sitemapUrl', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="https://trendaryo.com/sitemap.xml"
          />
        </div>
      </div>
    </div>
  );
}