import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MagneticButton } from '../components/MagneticButton';
import AdminLayout from '../components/AdminLayout';

export default function AdminDashboard() {
  const { user, hasRole } = useAuth();

  const stats = [
    { name: 'Total Revenue', value: '$125,000', change: '+15.3%', positive: true },
    { name: 'Total Orders', value: '1,250', change: '+12.5%', positive: true },
    { name: 'Active Products', value: '89', change: '+5.2%', positive: true },
    { name: 'Total Customers', value: '5,200', change: '+8.7%', positive: true }
  ];

  const quickActions = [
    { name: 'Add Product', href: '/admin/products', icon: '➕', color: 'bg-blue-500' },
    { name: 'View Orders', href: '/admin/orders', icon: '📋', color: 'bg-green-500' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📊', color: 'bg-purple-500' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', color: 'bg-gray-500', adminOnly: true }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.email?.split('@')[0]}!</h1>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions
              .filter(action => !action.adminOnly || hasRole('admin'))
              .map((action) => (
                <MagneticButton
                  key={action.name}
                  as="Link"
                  to={action.href}
                  className={`${action.color} hover:opacity-90 text-white p-4 rounded-lg text-center transition-all`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm font-medium">{action.name}</div>
                </MagneticButton>
              ))
            }
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {[
                { id: 'ORD-001', customer: 'John Doe', amount: '$999', status: 'Processing' },
                { id: 'ORD-002', customer: 'Jane Smith', amount: '$1,397', status: 'Shipped' },
                { id: 'ORD-003', customer: 'Bob Johnson', amount: '$299', status: 'Delivered' }
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-600">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <MagneticButton
              as="Link"
              to="/admin/orders"
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm"
            >
              View All Orders
            </MagneticButton>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-3">
              {[
                { name: 'iPhone 15 Pro', sales: 150, revenue: '$149,850' },
                { name: 'Fitness Tracker Pro', sales: 200, revenue: '$39,800' },
                { name: 'Wireless Headphones', sales: 180, revenue: '$35,820' }
              ].map((product, index) => (
                <div key={product.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {index + 1}
                    </span>
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
            <MagneticButton
              as="Link"
              to="/admin/products"
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm"
            >
              Manage Products
            </MagneticButton>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}