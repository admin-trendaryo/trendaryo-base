import { useState, useEffect } from 'react';
import { Building, Smartphone } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface AfghanPaymentOptionsProps {
  paymentMethod: string;
  onBack: () => void;
  onSubmit: () => void;
  processing: boolean;
}

export default function AfghanPaymentOptions({ 
  paymentMethod, 
  onBack, 
  onSubmit, 
  processing 
}: AfghanPaymentOptionsProps) {
  const [afghanBanks, setAfghanBanks] = useState([]);
  const [mobileProviders, setMobileProviders] = useState([]);

  useEffect(() => {
    loadPaymentOptions();
  }, []);

  const loadPaymentOptions = async () => {
    try {
      const [banksRes, mobileRes] = await Promise.all([
        fetch('/api/payments/afghan-banks'),
        fetch('/api/payments/mobile-money')
      ]);
      
      if (banksRes.ok) {
        const banksData = await banksRes.json();
        setAfghanBanks(banksData.banks || []);
      }
      
      if (mobileRes.ok) {
        const mobileData = await mobileRes.json();
        setMobileProviders(mobileData.providers || []);
      }
    } catch (error) {
      console.error('Failed to load payment options:', error);
    }
  };

  if (paymentMethod === 'bank') {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-blue-100">
            <Building className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Select Afghan Bank</h3>
          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
            {afghanBanks.map((bank: any) => (
              <button
                key={bank.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 text-left"
              >
                <div className="font-semibold">{bank.name}</div>
                <div className="text-sm text-gray-500">SWIFT: {bank.swift}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 border border-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Payment Methods
          </button>
          <MagneticButton
            onClick={onSubmit}
            disabled={processing}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Continue with Bank Transfer'}
          </MagneticButton>
        </div>
      </div>
    );
  }

  if (paymentMethod === 'mobile') {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-green-100">
            <Smartphone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Mobile Money Provider</h3>
          <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
            {mobileProviders.map((provider: any) => (
              <button
                key={provider.id}
                className="p-3 border border-gray-200 rounded-lg hover:border-green-300 text-left"
              >
                <div className="font-semibold">{provider.name}</div>
                <div className="text-sm text-gray-500">Dial: {provider.code} • Fee: {provider.fees}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 border border-gray-200 text-foreground font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Payment Methods
          </button>
          <MagneticButton
            onClick={onSubmit}
            disabled={processing}
            className="btn-primary flex-1 disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Continue with Mobile Money'}
          </MagneticButton>
        </div>
      </div>
    );
  }

  return null;
}