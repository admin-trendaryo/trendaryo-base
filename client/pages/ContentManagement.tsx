import React, { useState, useEffect } from 'react';
import MagneticButton from '../components/MagneticButton';
import { useAuth } from '../hooks/useAuth';
import AdminLayout from '../components/AdminLayout';

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

export default function ContentManagement() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(content)
      });
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  if (!content) return (
    <AdminLayout>
      <div className="p-6">Loading...</div>
    </AdminLayout>
  );

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'brand', label: 'Brand Assets' },
    { id: 'banners', label: 'Banners' },
    { id: 'featured', label: 'Featured Products' },
    { id: 'promotions', label: 'Promotions' }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Content Management</h1>
          <MagneticButton
            onClick={saveContent}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
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
            {activeTab === 'hero' && (
              <HeroSection content={content} setContent={setContent} />
            )}
            {activeTab === 'brand' && (
              <BrandSection content={content} setContent={setContent} />
            )}
            {activeTab === 'banners' && (
              <BannersSection content={content} setContent={setContent} />
            )}
            {activeTab === 'featured' && (
              <FeaturedSection content={content} setContent={setContent} />
            )}
            {activeTab === 'promotions' && (
              <PromotionsSection content={content} setContent={setContent} />
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function HeroSection({ content, setContent }: any) {
  const updateHero = (field: string, value: string) => {
    setContent({
      ...content,
      hero: { ...content.hero, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Hero Section Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Main Title</label>
          <input
            type="text"
            value={content.hero.title}
            onChange={(e) => updateHero('title', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subtitle</label>
          <input
            type="text"
            value={content.hero.subtitle}
            onChange={(e) => updateHero('subtitle', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Background Image URL</label>
          <input
            type="url"
            value={content.hero.backgroundImage}
            onChange={(e) => updateHero('backgroundImage', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">CTA Button Text</label>
          <input
            type="text"
            value={content.hero.ctaText}
            onChange={(e) => updateHero('ctaText', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Preview</h3>
        <div 
          className="h-48 bg-cover bg-center rounded-lg flex items-center justify-center text-white"
          style={{ backgroundImage: `url(${content.hero.backgroundImage})` }}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{content.hero.title}</h1>
            <p className="text-lg mb-4">{content.hero.subtitle}</p>
            <button className="bg-orange-500 px-6 py-2 rounded-lg">
              {content.hero.ctaText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandSection({ content, setContent }: any) {
  const updateBrand = (field: string, value: string) => {
    setContent({
      ...content,
      brand: { ...content.brand, [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Brand Assets</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Logo URL</label>
          <input
            type="url"
            value={content.brand.logo}
            onChange={(e) => updateBrand('logo', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <input
            type="text"
            value={content.brand.tagline}
            onChange={(e) => updateBrand('tagline', e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <input
            type="color"
            value={content.brand.primaryColor}
            onChange={(e) => updateBrand('primaryColor', e.target.value)}
            className="w-full h-12 border rounded-lg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <input
            type="color"
            value={content.brand.secondaryColor}
            onChange={(e) => updateBrand('secondaryColor', e.target.value)}
            className="w-full h-12 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Brand Preview</h3>
        <div className="flex items-center space-x-4">
          <img src={content.brand.logo} alt="Logo" className="h-12 w-auto" />
          <div>
            <h2 className="text-xl font-bold">Trendaryo</h2>
            <p className="text-gray-600">{content.brand.tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannersSection({ content, setContent }: any) {
  const addBanner = () => {
    const newBanner = {
      id: Date.now().toString(),
      title: 'New Banner',
      description: 'Banner description',
      image: '',
      link: '',
      active: true
    };
    
    setContent({
      ...content,
      banners: [...content.banners, newBanner]
    });
  };

  const updateBanner = (id: string, field: string, value: any) => {
    setContent({
      ...content,
      banners: content.banners.map((banner: any) =>
        banner.id === id ? { ...banner, [field]: value } : banner
      )
    });
  };

  const deleteBanner = (id: string) => {
    setContent({
      ...content,
      banners: content.banners.filter((banner: any) => banner.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Homepage Banners</h2>
        <MagneticButton
          onClick={addBanner}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Banner
        </MagneticButton>
      </div>

      <div className="space-y-4">
        {content.banners.map((banner: any) => (
          <div key={banner.id} className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) => updateBanner(banner.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="url"
                  value={banner.image}
                  onChange={(e) => updateBanner(banner.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex items-end space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={banner.active}
                    onChange={(e) => updateBanner(banner.id, 'active', e.target.checked)}
                    className="mr-2"
                  />
                  Active
                </label>
                <MagneticButton
                  onClick={() => deleteBanner(banner.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </MagneticButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedSection({ content, setContent }: any) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const toggleFeatured = (productId: string) => {
    const featured = content.featuredProducts.includes(productId)
      ? content.featuredProducts.filter((id: string) => id !== productId)
      : [...content.featuredProducts, productId];
    
    setContent({ ...content, featuredProducts: featured });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Featured Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={content.featuredProducts.includes(product.id)}
                onChange={() => toggleFeatured(product.id)}
                className="mr-2"
              />
              Featured on Homepage
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromotionsSection({ content, setContent }: any) {
  const addPromotion = () => {
    const newPromotion = {
      id: Date.now().toString(),
      title: 'New Promotion',
      discount: '10%',
      code: 'SAVE10',
      validUntil: new Date().toISOString().split('T')[0],
      active: true
    };
    
    setContent({
      ...content,
      promotions: [...content.promotions, newPromotion]
    });
  };

  const updatePromotion = (id: string, field: string, value: any) => {
    setContent({
      ...content,
      promotions: content.promotions.map((promo: any) =>
        promo.id === id ? { ...promo, [field]: value } : promo
      )
    });
  };

  const deletePromotion = (id: string) => {
    setContent({
      ...content,
      promotions: content.promotions.filter((promo: any) => promo.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Active Promotions</h2>
        <MagneticButton
          onClick={addPromotion}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Promotion
        </MagneticButton>
      </div>

      <div className="space-y-4">
        {content.promotions.map((promo: any) => (
          <div key={promo.id} className="border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={promo.title}
                  onChange={(e) => updatePromotion(promo.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Discount</label>
                <input
                  type="text"
                  value={promo.discount}
                  onChange={(e) => updatePromotion(promo.id, 'discount', e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Code</label>
                <input
                  type="text"
                  value={promo.code}
                  onChange={(e) => updatePromotion(promo.id, 'code', e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex items-end space-x-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={promo.active}
                    onChange={(e) => updatePromotion(promo.id, 'active', e.target.checked)}
                    className="mr-2"
                  />
                  Active
                </label>
                <MagneticButton
                  onClick={() => deletePromotion(promo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </MagneticButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}