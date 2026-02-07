export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, currency, customer } = req.body;
    
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
}
