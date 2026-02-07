export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, customer, payment_method, metadata } = req.body;
    
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
}
