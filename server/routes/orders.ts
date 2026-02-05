import express from 'express';
import { verifyAdminToken } from './admin';

const router = express.Router();

// Mock orders data - replace with database
let orders = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      { productId: '1', name: 'iPhone 15 Pro', price: 999, quantity: 1 },
      { productId: '2', name: 'Fitness Tracker Pro', price: 199, quantity: 2 }
    ],
    total: 1397,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: '123 Main St, New York, NY 10001',
    orderDate: '2024-01-15T10:30:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      { productId: '1', name: 'iPhone 15 Pro', price: 999, quantity: 1 }
    ],
    total: 999,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
    orderDate: '2024-01-14T14:20:00Z',
    trackingNumber: 'TRK987654321'
  }
];

// Mock customers data - replace with database
let customers = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    address: '123 Main St, New York, NY 10001',
    joinDate: '2023-12-01T00:00:00Z',
    totalOrders: 3,
    totalSpent: 2500,
    lastOrderDate: '2024-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1-555-0456',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    joinDate: '2023-11-15T00:00:00Z',
    totalOrders: 2,
    totalSpent: 1500,
    lastOrderDate: '2024-01-14T14:20:00Z',
    status: 'active'
  },
  {
    id: 'CUST-003',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    joinDate: '2023-10-20T00:00:00Z',
    totalOrders: 0,
    totalSpent: 0,
    status: 'inactive'
  }
];

// Get all orders
router.get('/orders', verifyAdminToken, (req, res) => {
  res.json(orders);
});

// Get single order
router.get('/orders/:id', verifyAdminToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// Update order status
router.put('/orders/:id/status', verifyAdminToken, (req, res) => {
  const { status } = req.body;
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  orders[orderIndex].status = status;
  
  // Set delivery date if status is delivered
  if (status === 'delivered') {
    orders[orderIndex].deliveryDate = new Date().toISOString();
  }
  
  res.json({ message: 'Order status updated successfully', order: orders[orderIndex] });
});

// Update tracking number
router.put('/orders/:id/tracking', verifyAdminToken, (req, res) => {
  const { trackingNumber } = req.body;
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  orders[orderIndex].trackingNumber = trackingNumber;
  res.json({ message: 'Tracking number updated successfully' });
});

// Get all customers
router.get('/customers', verifyAdminToken, (req, res) => {
  res.json(customers);
});

// Get single customer
router.get('/customers/:id', verifyAdminToken, (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// Get customer orders
router.get('/customers/:id/orders', verifyAdminToken, (req, res) => {
  const customerId = req.params.id;
  const customerOrders = orders
    .filter(order => order.customerId === customerId)
    .map(order => ({
      id: order.id,
      total: order.total,
      status: order.status,
      orderDate: order.orderDate,
      itemCount: order.items.length
    }))
    .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  
  res.json(customerOrders);
});

// Update customer status
router.put('/customers/:id/status', verifyAdminToken, (req, res) => {
  const { status } = req.body;
  const customerIndex = customers.findIndex(c => c.id === req.params.id);
  
  if (customerIndex === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  
  customers[customerIndex].status = status;
  res.json({ message: 'Customer status updated successfully' });
});

// Get order statistics
router.get('/orders/stats/summary', verifyAdminToken, (req, res) => {
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    processingOrders: orders.filter(o => o.status === 'processing').length,
    shippedOrders: orders.filter(o => o.status === 'shipped').length,
    deliveredOrders: orders.filter(o => o.status === 'delivered').length,
    cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrderValue: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
  };
  
  res.json(stats);
});

// Get customer statistics
router.get('/customers/stats/summary', verifyAdminToken, (req, res) => {
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.status === 'active').length,
    inactiveCustomers: customers.filter(c => c.status === 'inactive').length,
    customersWithOrders: customers.filter(c => c.totalOrders > 0).length,
    averageOrdersPerCustomer: customers.length > 0 ? customers.reduce((sum, customer) => sum + customer.totalOrders, 0) / customers.length : 0,
    averageSpentPerCustomer: customers.length > 0 ? customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length : 0
  };
  
  res.json(stats);
});

// Create new order (for testing)
router.post('/orders', verifyAdminToken, (req, res) => {
  const newOrder = {
    id: `ORD-${Date.now()}`,
    ...req.body,
    orderDate: new Date().toISOString()
  };
  
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

export default router;