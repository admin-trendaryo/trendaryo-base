import React, { useState, useEffect } from 'react';
import { MagneticButton } from '../components/MagneticButton';
import { useAuth } from '../hooks/useAuth';
import AdminLayout from '../components/AdminLayout';

export default function CustomersManagement() {
  // ... existing component code ...

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customers Management</h1>
          <div className="text-sm text-gray-600">
            Total Customers: {customers.length}
          </div>
        </div>
        {/* ... rest of existing component ... */}
      </div>
    </AdminLayout>
  );
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
}

interface CustomerOrder {
  id: string;
  total: number;
  status: string;
  orderDate: string;
  itemCount: number;
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<CustomerOrder[]>([]);
  const { hasRole } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/admin/customers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const fetchCustomerOrders = async (customerId: string) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setCustomerOrders(data);
    } catch (error) {
      console.error('Failed to fetch customer orders:', error);
    }
  };

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    fetchCustomerOrders(customer.id);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers Management</h1>
        <div className="text-sm text-gray-600">
          Total Customers: {customers.length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Contact</th>
                <th className="text-left py-3">Orders</th>
                <th className="text-left py-3">Total Spent</th>
                <th className="text-left py-3">Last Order</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-600">
                        Joined {new Date(customer.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      {customer.phone && <div className="text-gray-600">{customer.phone}</div>}
                    </div>
                  </td>
                  <td className="py-3 font-semibold">{customer.totalOrders}</td>
                  <td className="py-3 font-semibold">${customer.totalSpent}</td>
                  <td className="py-3 text-sm">
                    {customer.lastOrderDate 
                      ? new Date(customer.lastOrderDate).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      customer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <MagneticButton
                      onClick={() => viewCustomerDetails(customer)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View Profile
                    </MagneticButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          orders={customerOrders}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}

interface CustomerDetailsModalProps {
  customer: Customer;
  orders: CustomerOrder[];
  onClose: () => void;
}

function CustomerDetailsModal({ customer, orders, onClose }: CustomerDetailsModalProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customer Profile</h2>
          <MagneticButton
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              {customer.phone && <p><strong>Phone:</strong> {customer.phone}</p>}
              {customer.address && <p><strong>Address:</strong> {customer.address}</p>}
              <p><strong>Join Date:</strong> {new Date(customer.joinDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {customer.status}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Purchase Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Orders:</span>
                <span className="font-semibold">{customer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span className="font-semibold text-lg">${customer.totalSpent}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Order:</span>
                <span className="font-semibold">
                  ${customer.totalOrders > 0 ? (customer.totalSpent / customer.totalOrders).toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Order:</span>
                <span className="font-semibold">
                  {customer.lastOrderDate 
                    ? new Date(customer.lastOrderDate).toLocaleDateString()
                    : 'Never'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Order History</h3>
          {orders.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3">Order ID</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Items</th>
                    <th className="text-left p-3">Total</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-t">
                      <td className="p-3 font-mono text-sm">#{order.id}</td>
                      <td className="p-3 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="p-3">{order.itemCount} items</td>
                      <td className="p-3 font-semibold">${order.total}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders found for this customer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}