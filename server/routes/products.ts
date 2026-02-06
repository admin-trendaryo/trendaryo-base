import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { verifyAdminToken, requireAdmin } from './admin';

const router = express.Router();

// Mock products database - replace with actual database
let products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    category: 'Smartphones',
    tags: ['trending', 'premium'],
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    stock: 50,
    status: 'active',
    description: 'Latest iPhone with advanced features'
  },
  {
    id: '2',
    name: 'Fitness Tracker Pro',
    price: 199,
    category: 'Wellness',
    tags: ['health', 'fitness'],
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    stock: 100,
    status: 'active',
    description: 'Advanced fitness tracking device'
  }
];

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get all products
router.get('/products', verifyAdminToken, (req, res) => {
  res.json(products);
});

// Get single product
router.get('/products/:id', verifyAdminToken, (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Create product
router.post('/products', verifyAdminToken, (req, res) => {
  const newProduct = {
    id: Date.now().toString(),
    ...req.body,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock)
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product
router.put('/products/:id', verifyAdminToken, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products[index] = {
    ...products[index],
    ...req.body,
    price: parseFloat(req.body.price),
    stock: parseInt(req.body.stock)
  };
  
  res.json(products[index]);
});

// Delete product (admin only)
router.delete('/products/:id', verifyAdminToken, requireAdmin, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// Upload image
router.post('/upload-image', verifyAdminToken, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }
  
  // In production, upload to cloud storage (AWS S3, Cloudinary, etc.)
  const imageUrl = `https://api.trendaryo.com/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

// Bulk upload products
router.post('/products/bulk-upload', verifyAdminToken, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  const results = {
    processed: 0,
    success_count: 0,
    error_count: 0,
    errors: []
  };

  const newProducts: any[] = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      results.processed++;
      
      try {
        // Validate required fields
        if (!row.name || !row.price || !row.category || !row.image) {
          throw new Error(`Row ${results.processed}: Missing required fields`);
        }

        const product = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: row.name,
          price: parseFloat(row.price),
          category: row.category,
          tags: row.tags ? row.tags.split(',').map((tag: string) => tag.trim()) : [],
          image: row.image,
          stock: parseInt(row.stock) || 0,
          status: row.status || 'active',
          description: row.description || ''
        };

        newProducts.push(product);
        results.success_count++;
      } catch (error) {
        results.error_count++;
        results.errors.push(error.message);
      }
    })
    .on('end', () => {
      // Add successful products to database
      products.push(...newProducts);
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);
      
      res.json({
        success: results.error_count === 0,
        ...results
      });
    })
    .on('error', (error) => {
      res.status(500).json({ error: 'Failed to process CSV file' });
    });
});

// Get categories
router.get('/categories', verifyAdminToken, (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Get tags
router.get('/tags', verifyAdminToken, (req, res) => {
  const allTags = products.flatMap(p => p.tags);
  const uniqueTags = [...new Set(allTags)];
  res.json(uniqueTags);
});

export default router;