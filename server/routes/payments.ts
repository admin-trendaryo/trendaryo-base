import express from 'express';

const router = express.Router();

// Stripe payment processing (works well with Afghan banks via international transfers)
router.post('/stripe', async (req, res) => {
  try {
    const { amount, currency, customer, payment_method, metadata } = req.body;
    
    // Mock Stripe integration - replace with actual Stripe SDK
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount,
      currency,
      status: 'succeeded',
      client_secret: `pi_${Date.now()}_secret_${Math.random()}`,
      metadata: {
        ...metadata,
        gateway: 'stripe',
        region: 'afghanistan'
      }
    };

    res.json({
      success: true,
      payment: paymentIntent,
      message: 'Payment processed via Stripe'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Razorpay - excellent for South Asian region
router.post('/razorpay', async (req, res) => {
  try {
    const { amount, currency, customer, method } = req.body;
    
    // Mock Razorpay integration
    const order = {
      id: `order_${Date.now()}`,
      amount,
      currency,
      status: 'created',
      receipt: `receipt_${Date.now()}`,
      notes: {
        region: 'south_asia',
        country: 'afghanistan'
      }
    };

    res.json({
      success: true,
      order,
      message: 'Order created via Razorpay'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PayPal integration
router.post('/paypal', async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;
    
    // Mock PayPal integration
    const payment = {
      id: `PAY-${Date.now()}`,
      intent: 'sale',
      state: 'approved',
      transactions: [{
        amount: { total: amount.toString(), currency },
        description: 'Trendaryo Purchase'
      }]
    };

    res.json({
      success: true,
      payment,
      message: 'Payment processed via PayPal'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Wise (TransferWise) for international transfers to Afghan banks
router.post('/wise', async (req, res) => {
  try {
    const { amount, currency, customer, target_country } = req.body;
    
    // Mock Wise integration
    const transfer = {
      id: `transfer_${Date.now()}`,
      source_currency: currency,
      target_currency: 'AFN',
      source_amount: amount,
      target_amount: amount * 85, // Mock AFN conversion
      status: 'processing',
      delivery_estimate: '1-3 business days'
    };

    res.json({
      success: true,
      transfer,
      message: 'International transfer initiated via Wise'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Afghan banks integration endpoint
router.get('/afghan-banks', async (req, res) => {
  const banks = [
    { 
      id: 'dab', 
      name: 'Da Afghanistan Bank', 
      swift: 'DAFGAFKA',
      branches: ['Kabul', 'Herat', 'Mazar-i-Sharif', 'Kandahar']
    },
    { 
      id: 'azizi', 
      name: 'Azizi Bank', 
      swift: 'AZIZAFKA',
      branches: ['Kabul', 'Herat', 'Jalalabad']
    },
    { 
      id: 'aib', 
      name: 'Afghanistan International Bank', 
      swift: 'AFIBAFKA',
      branches: ['Kabul', 'Herat', 'Mazar-i-Sharif']
    }
  ];
  
  res.json({ success: true, banks });
});

// Mobile money providers in Afghanistan
router.get('/mobile-money', async (req, res) => {
  const providers = [
    { 
      id: 'roshan', 
      name: 'Roshan M-Paisa', 
      code: '*444#',
      coverage: 'National',
      fees: '1-2%'
    },
    { 
      id: 'mtn', 
      name: 'MTN Mobile Money', 
      code: '*165#',
      coverage: 'Major cities',
      fees: '1.5%'
    }
  ];
  
  res.json({ success: true, providers });
});

export default router;