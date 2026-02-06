import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'trendaryo-jwt-secret-key-change-in-production-2024';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Load admin users dynamically on each request
    const adminUsers = [
      {
        id: '1',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD_HASH,
        role: 'admin'
      },
      {
        id: '2',
        email: process.env.STAFF_EMAIL,
        password: process.env.STAFF_PASSWORD_HASH,
        role: 'staff'
      }
    ].filter(u => u.email && u.password);

    console.log('Login attempt:', email);
    console.log('Available users:', adminUsers.length);

    const user = adminUsers.find(u => u.email === email);
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token middleware
export const verifyAdminToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Check admin role
export const requireAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export default router;