import express from 'express';
import { verifyAdminToken } from './admin';

const router = express.Router();

// Mock analytics data - replace with actual database queries
const generateAnalyticsData = (range: string) => {
  const now = new Date();
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
  
  // Generate mock monthly revenue data
  const monthlyRevenue = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthlyRevenue.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      revenue: Math.floor(Math.random() * 50000) + 20000
    });
  }

  // Generate mock daily traffic data
  const dailyTraffic = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dailyTraffic.push({
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 1000) + 200,
      pageViews: Math.floor(Math.random() * 3000) + 500
    });
  }

  return {
    sales: {
      totalRevenue: 125000,
      totalOrders: 1250,
      averageOrderValue: 100,
      revenueGrowth: 15.3,
      monthlyRevenue
    },
    traffic: {
      totalVisitors: 25000,
      pageViews: 75000,
      conversionRate: 3.2,
      bounceRate: 45.8,
      dailyTraffic
    },
    products: {
      topProducts: [
        { id: '1', name: 'iPhone 15 Pro', sales: 150, revenue: 149850 },
        { id: '2', name: 'Fitness Tracker Pro', sales: 200, revenue: 39800 },
        { id: '3', name: 'Wireless Headphones', sales: 180, revenue: 35820 },
        { id: '4', name: 'Smart Watch', sales: 120, revenue: 29880 },
        { id: '5', name: 'Laptop Stand', sales: 300, revenue: 14970 }
      ],
      categoryPerformance: [
        { category: 'Technology', sales: 450, revenue: 225000 },
        { category: 'Wellness', sales: 320, revenue: 64000 },
        { category: 'Smartphones', sales: 280, revenue: 279720 },
        { category: 'Fitness', sales: 200, revenue: 39800 }
      ]
    },
    customers: {
      totalCustomers: 5200,
      newCustomers: 320,
      returningCustomers: 890,
      customerGrowth: 8.7
    }
  };
};

// Get analytics data
router.get('/analytics', verifyAdminToken, (req, res) => {
  const range = req.query.range as string || '30d';
  const analytics = generateAnalyticsData(range);
  res.json(analytics);
});

// Export analytics report
router.get('/analytics/export', verifyAdminToken, (req, res) => {
  const format = req.query.format as string || 'csv';
  const range = req.query.range as string || '30d';
  const analytics = generateAnalyticsData(range);

  if (format === 'csv') {
    // Generate CSV content
    let csvContent = 'Trendaryo Analytics Report\n\n';
    
    // Sales Summary
    csvContent += 'SALES SUMMARY\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Revenue,$${analytics.sales.totalRevenue}\n`;
    csvContent += `Total Orders,${analytics.sales.totalOrders}\n`;
    csvContent += `Average Order Value,$${analytics.sales.averageOrderValue}\n`;
    csvContent += `Revenue Growth,${analytics.sales.revenueGrowth}%\n\n`;
    
    // Monthly Revenue
    csvContent += 'MONTHLY REVENUE\n';
    csvContent += 'Month,Revenue\n';
    analytics.sales.monthlyRevenue.forEach(item => {
      csvContent += `${item.month},$${item.revenue}\n`;
    });
    csvContent += '\n';
    
    // Top Products
    csvContent += 'TOP PRODUCTS\n';
    csvContent += 'Product,Sales,Revenue\n';
    analytics.products.topProducts.forEach(product => {
      csvContent += `${product.name},${product.sales},$${product.revenue}\n`;
    });
    csvContent += '\n';
    
    // Traffic Summary
    csvContent += 'TRAFFIC SUMMARY\n';
    csvContent += 'Metric,Value\n';
    csvContent += `Total Visitors,${analytics.traffic.totalVisitors}\n`;
    csvContent += `Page Views,${analytics.traffic.pageViews}\n`;
    csvContent += `Conversion Rate,${analytics.traffic.conversionRate}%\n`;
    csvContent += `Bounce Rate,${analytics.traffic.bounceRate}%\n`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=trendaryo-analytics-${range}.csv`);
    res.send(csvContent);
    
  } else if (format === 'pdf') {
    // Generate simple PDF content (in a real app, use a PDF library like puppeteer or jsPDF)
    const pdfContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Trendaryo Analytics Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { text-align: center; margin-bottom: 30px; }
          .section { margin-bottom: 30px; }
          .metric { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #eee; }
          .chart-placeholder { height: 200px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Trendaryo Analytics Report</h1>
          <p>Period: ${range}</p>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="section">
          <h2>Sales Summary</h2>
          <div class="metric"><span>Total Revenue:</span><span>$${analytics.sales.totalRevenue.toLocaleString()}</span></div>
          <div class="metric"><span>Total Orders:</span><span>${analytics.sales.totalOrders}</span></div>
          <div class="metric"><span>Average Order Value:</span><span>$${analytics.sales.averageOrderValue}</span></div>
          <div class="metric"><span>Revenue Growth:</span><span>${analytics.sales.revenueGrowth}%</span></div>
        </div>
        
        <div class="section">
          <h2>Traffic Overview</h2>
          <div class="metric"><span>Total Visitors:</span><span>${analytics.traffic.totalVisitors.toLocaleString()}</span></div>
          <div class="metric"><span>Page Views:</span><span>${analytics.traffic.pageViews.toLocaleString()}</span></div>
          <div class="metric"><span>Conversion Rate:</span><span>${analytics.traffic.conversionRate}%</span></div>
          <div class="metric"><span>Bounce Rate:</span><span>${analytics.traffic.bounceRate}%</span></div>
        </div>
        
        <div class="section">
          <h2>Top Products</h2>
          ${analytics.products.topProducts.map(product => 
            `<div class="metric"><span>${product.name}</span><span>${product.sales} sales - $${product.revenue}</span></div>`
          ).join('')}
        </div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename=trendaryo-analytics-${range}.html`);
    res.send(pdfContent);
  }
});

// Get real-time metrics
router.get('/analytics/realtime', verifyAdminToken, (req, res) => {
  const realTimeData = {
    activeUsers: Math.floor(Math.random() * 50) + 10,
    todayOrders: Math.floor(Math.random() * 20) + 5,
    todayRevenue: Math.floor(Math.random() * 5000) + 1000,
    conversionRate: (Math.random() * 2 + 2).toFixed(1)
  };
  
  res.json(realTimeData);
});

// Get product performance details
router.get('/analytics/products/:id', verifyAdminToken, (req, res) => {
  const productId = req.params.id;
  
  // Mock product analytics
  const productAnalytics = {
    id: productId,
    name: 'iPhone 15 Pro',
    totalSales: 150,
    totalRevenue: 149850,
    averageRating: 4.8,
    viewsToSales: 3.2,
    dailySales: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sales: Math.floor(Math.random() * 10) + 1,
      views: Math.floor(Math.random() * 100) + 20
    }))
  };
  
  res.json(productAnalytics);
});

// Get customer analytics
router.get('/analytics/customers', verifyAdminToken, (req, res) => {
  const customerAnalytics = {
    totalCustomers: 5200,
    newCustomersThisMonth: 320,
    returningCustomers: 890,
    averageLifetimeValue: 450,
    customerRetentionRate: 68.5,
    topCustomers: [
      { id: '1', name: 'John Doe', totalSpent: 2500, orders: 8 },
      { id: '2', name: 'Jane Smith', totalSpent: 1800, orders: 6 },
      { id: '3', name: 'Bob Johnson', totalSpent: 1200, orders: 4 }
    ],
    customerGrowth: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
      newCustomers: Math.floor(Math.random() * 200) + 100,
      totalCustomers: 4000 + (i * 100) + Math.floor(Math.random() * 100)
    }))
  };
  
  res.json(customerAnalytics);
});

export default router;