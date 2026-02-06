import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin';
import productRoutes from './routes/products';
import contentRoutes from './routes/content';
import ordersRoutes from './routes/orders';
import analyticsRoutes from './routes/analytics';
import settingsRoutes from './routes/settings';
import overviewRoutes from './routes/overview';
import paymentRoutes from './routes/payments';

// Load environment variables
dotenv.config();

export function createServer() {
  const app = express();
  
  app.use(cors());
  app.use(express.json());
  
  // Routes
  app.use('/api/admin', adminRoutes);
  app.use('/api/admin', productRoutes);
  app.use('/api/admin', contentRoutes);
  app.use('/api/admin', ordersRoutes);
  app.use('/api/admin', analyticsRoutes);
  app.use('/api/admin', settingsRoutes);
  app.use('/api/admin', overviewRoutes);
  app.use('/api', contentRoutes);
  app.use('/api', settingsRoutes);
  app.use('/api/payments', paymentRoutes);
  
  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createServer();
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}