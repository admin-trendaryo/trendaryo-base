import React, { useState, useEffect } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import AdminLayout from '../components/AdminLayout';

interface AdminOverview {
  sales: {
    totalRevenue: number;
    totalOrders: number;
    revenueGrowth: number;
  };
  products: {
    totalProducts: number;
    activeProducts: number;
    lowStockProducts: number;
  };
  customers: {
    totalCustomers: number;
    newCustomers: number;
    activeCustomers: number;
  };
  orders: {
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'order' | 'customer' | 'product';
    message: string;
    timestamp: string;
  }>;
}

export default function AdminOverview() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const response = await fetch('/api/admin/overview', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setOverview(data);
    } catch (error) {
      console.error('Failed to fetch overview:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !overview) {
    return (
      <AdminLayout>
        <div className="p-6">Loading overview...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Overview</h1>
          <p className="text-gray-600">Complete view of your Trendaryo store performance</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">${overview.sales.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
            <div className="mt-2 text-green-100 text-sm">
              +{overview.sales.revenueGrowth}% from last month
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Products</p>
                <p className="text-2xl font-bold">{overview.products.totalProducts}</p>
              </div>
              <div className="text-3xl">📦</div>
            </div>
            <div className="mt-2 text-blue-100 text-sm">
              {overview.products.activeProducts} active products
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Customers</p>
                <p className="text-2xl font-bold">{overview.customers.totalCustomers}</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
            <div className="mt-2 text-purple-100 text-sm">
              {overview.customers.newCustomers} new this month
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Orders</p>
                <p className="text-2xl font-bold">{overview.orders.pendingOrders}</p>
              </div>
              <div className="text-3xl">🛒</div>
            </div>
            <div className="mt-2 text-orange-100 text-sm">
              {overview.orders.processingOrders} processing
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {overview.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 mr-3">
                      {activity.type === 'order' && <span className="text-green-500">🛒</span>}
                      {activity.type === 'customer' && <span className="text-blue-500">👤</span>}
                      {activity.type === 'product' && <span className="text-purple-500">📦</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <MagneticButton
                  as="Link"
                  to="/admin/products"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-left"
                >
                  📦 Add New Product
                </MagneticButton>
                <MagneticButton
                  as="Link"
                  to="/admin/orders"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-left"
                >
                  🛒 Process Orders
                </MagneticButton>
                <MagneticButton
                  as="Link"
                  to="/admin/analytics"
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg text-left"
                >
                  📊 View Analytics
                </MagneticButton>
                <MagneticButton
                  as="Link"
                  to="/admin/content"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-left"
                >
                  🎨 Update Content
                </MagneticButton>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Status</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Gateway</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Stock Alerts</span>
                  <span className="flex items-center text-yellow-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    {overview.products.lowStockProducts} items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}