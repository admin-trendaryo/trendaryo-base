import React, { useState, useEffect } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import { useAuth } from '../hooks/useAuth';
import RealTimeWidget from '../components/RealTimeWidget';
import AdminLayout from '../components/AdminLayout';

export default function AnalyticsDashboard() {
  // ... existing component code ...

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <MagneticButton
              onClick={() => exportReport('csv')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Export CSV
            </MagneticButton>
            <MagneticButton
              onClick={() => exportReport('pdf')}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Export PDF
            </MagneticButton>
          </div>
        </div>
        {/* ... rest of existing component ... */}
      </div>
    </AdminLayout>
  );
}

interface AnalyticsData {
  sales: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    revenueGrowth: number;
    monthlyRevenue: Array<{ month: string; revenue: number }>;
  };
  traffic: {
    totalVisitors: number;
    pageViews: number;
    conversionRate: number;
    bounceRate: number;
    dailyTraffic: Array<{ date: string; visitors: number; pageViews: number }>;
  };
  products: {
    topProducts: Array<{ id: string; name: string; sales: number; revenue: number }>;
    categoryPerformance: Array<{ category: string; sales: number; revenue: number }>;
  };
  customers: {
    totalCustomers: number;
    newCustomers: number;
    returningCustomers: number;
    customerGrowth: number;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async (format: 'csv' | 'pdf') => {
    try {
      const response = await fetch(`/api/admin/analytics/export?format=${format}&range=${dateRange}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `trendaryo-analytics-${dateRange}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  if (loading || !analytics) {
    return <div className="p-6">Loading analytics...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <MagneticButton
            onClick={() => exportReport('csv')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Export CSV
          </MagneticButton>
          <MagneticButton
            onClick={() => exportReport('pdf')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
          </MagneticButton>
        </div>
      </div>

      {/* Real-time Widget */}
      <div className="mb-8">
        <RealTimeWidget />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.sales.totalRevenue.toLocaleString()}`}
          change={analytics.sales.revenueGrowth}
          icon="💰"
        />
        <MetricCard
          title="Total Orders"
          value={analytics.sales.totalOrders.toString()}
          change={12.5}
          icon="📦"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analytics.traffic.conversionRate}%`}
          change={-2.1}
          icon="📈"
        />
        <MetricCard
          title="Total Customers"
          value={analytics.customers.totalCustomers.toString()}
          change={analytics.customers.customerGrowth}
          icon="👥"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <RevenueChart data={analytics.sales.monthlyRevenue} />
        </div>

        {/* Traffic Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
          <TrafficChart data={analytics.traffic.dailyTraffic} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-3">
            {analytics.products.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${product.revenue}</div>
                  <div className="text-sm text-gray-600">{product.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
          <div className="space-y-3">
            {analytics.products.categoryPerformance.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span className="font-medium">{category.category}</span>
                <div className="text-right">
                  <div className="font-semibold">${category.revenue}</div>
                  <div className="text-sm text-gray-600">{category.sales} sales</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
}

function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function RevenueChart({ data }: { data: Array<{ month: string; revenue: number }> }) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-48 border-b border-gray-200">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="bg-orange-500 w-8 rounded-t"
              style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
              title={`$${item.revenue}`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {data.map((item, index) => (
          <span key={index}>{item.month}</span>
        ))}
      </div>
    </div>
  );
}

function TrafficChart({ data }: { data: Array<{ date: string; visitors: number; pageViews: number }> }) {
  const maxVisitors = Math.max(...data.map(d => d.visitors));
  
  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-48 border-b border-gray-200">
        {data.slice(-7).map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="bg-blue-500 w-6 rounded-t mr-1"
              style={{ height: `${(item.visitors / maxVisitors) * 100}%` }}
              title={`${item.visitors} visitors`}
            />
            <div
              className="bg-green-500 w-6 rounded-t"
              style={{ height: `${(item.pageViews / (maxVisitors * 2)) * 100}%` }}
              title={`${item.pageViews} page views`}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        {data.slice(-7).map((item, index) => (
          <span key={index}>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
        ))}
      </div>
      <div className="flex justify-center mt-2 space-x-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
          <span>Visitors</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
          <span>Page Views</span>
        </div>
      </div>
    </div>
  );
}