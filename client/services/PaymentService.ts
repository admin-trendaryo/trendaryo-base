// Payment gateways that work well with Afghan banks and regional fintechs
export interface PaymentGateway {
  id: string;
  name: string;
  logo: string;
  supportedCurrencies: string[];
  supportedCountries: string[];
  fees: string;
  processingTime: string;
}

export const PAYMENT_GATEWAYS: PaymentGateway[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '💳',
    supportedCurrencies: ['USD', 'EUR', 'AFN'],
    supportedCountries: ['AF', 'PK', 'IN', 'US', 'EU'],
    fees: '2.9% + $0.30',
    processingTime: 'Instant'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '🏦',
    supportedCurrencies: ['USD', 'INR', 'AFN'],
    supportedCountries: ['AF', 'IN', 'PK', 'BD'],
    fees: '2.5%',
    processingTime: '1-2 days'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '🅿️',
    supportedCurrencies: ['USD', 'EUR'],
    supportedCountries: ['AF', 'PK', 'IN', 'US', 'EU'],
    fees: '3.4% + $0.30',
    processingTime: 'Instant'
  },
  {
    id: 'wise',
    name: 'Wise (TransferWise)',
    logo: '🌍',
    supportedCurrencies: ['USD', 'EUR', 'AFN', 'PKR'],
    supportedCountries: ['AF', 'PK', 'IN', 'US', 'EU'],
    fees: '0.5-2%',
    processingTime: '1-3 days'
  }
];

export class PaymentService {
  private gateway: string = 'stripe';

  setGateway(gatewayId: string) {
    this.gateway = gatewayId;
  }

  async processPayment(paymentData: {
    amount: number;
    currency: string;
    customerInfo: any;
    paymentMethod: string;
  }) {
    switch (this.gateway) {
      case 'stripe':
        return this.processStripePayment(paymentData);
      case 'razorpay':
        return this.processRazorpayPayment(paymentData);
      case 'paypal':
        return this.processPayPalPayment(paymentData);
      case 'wise':
        return this.processWisePayment(paymentData);
      default:
        throw new Error('Unsupported payment gateway');
    }
  }

  private async processStripePayment(data: any) {
    // Stripe integration for Afghan-friendly processing
    const response = await fetch('/api/payments/stripe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: data.amount * 100, // Convert to cents
        currency: data.currency.toLowerCase(),
        customer: data.customerInfo,
        payment_method: data.paymentMethod,
        metadata: {
          country: 'AF',
          region: 'South Asia'
        }
      })
    });
    return response.json();
  }

  private async processRazorpayPayment(data: any) {
    // Razorpay - excellent for South Asian region including Afghanistan
    const response = await fetch('/api/payments/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: data.amount * 100,
        currency: data.currency,
        customer: data.customerInfo,
        method: data.paymentMethod
      })
    });
    return response.json();
  }

  private async processPayPalPayment(data: any) {
    // PayPal integration
    const response = await fetch('/api/payments/paypal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        customer: data.customerInfo
      })
    });
    return response.json();
  }

  private async processWisePayment(data: any) {
    // Wise for international transfers to Afghan banks
    const response = await fetch('/api/payments/wise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        customer: data.customerInfo,
        target_country: 'AF'
      })
    });
    return response.json();
  }

  // Afghan-specific banking integration
  async getAfghanBanks() {
    return [
      { id: 'dab', name: 'Da Afghanistan Bank', swift: 'DAFGAFKA' },
      { id: 'azizi', name: 'Azizi Bank', swift: 'AZIZAFKA' },
      { id: 'aib', name: 'Afghanistan International Bank', swift: 'AFIBAFKA' },
      { id: 'kabul', name: 'Kabul Bank', swift: 'KABLAFKA' },
      { id: 'maiwand', name: 'Maiwand Bank', swift: 'MAIWAFKA' }
    ];
  }

  // Mobile money integration for Afghanistan
  async getMobileMoneyProviders() {
    return [
      { id: 'mtn', name: 'MTN Mobile Money', code: '*165#' },
      { id: 'roshan', name: 'Roshan M-Paisa', code: '*444#' },
      { id: 'etisalat', name: 'Etisalat Easy Paisa', code: '*786#' }
    ];
  }
}

export const paymentService = new PaymentService();