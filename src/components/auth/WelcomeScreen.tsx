import React from 'react';
import { Building, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '../ui/button';

interface WelcomeScreenProps {
  onNext: () => void;
  onRegister: () => void;
}

export function WelcomeScreen({ onNext, onRegister }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F3F9FD' }}>
      {/* Header with CBK Logo */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-xl mb-8 flex items-center justify-center" style={{ backgroundColor: '#314BB1' }}>
          <Building className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#314BB1' }}>
          Welcome to CBK Retail Bonds
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Secure, government-backed bonds with easy investment and guaranteed returns
        </p>

        {/* Benefits */}
        <div className="space-y-4 mb-12 w-full max-w-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FAD879' }}>
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-gray-700">Government-backed security</span>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FAD879' }}>
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-gray-700">Competitive interest rates</span>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FAD879' }}>
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-gray-700">Low minimum investment</span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 space-y-3">
        <Button 
          className="w-full h-12 text-black font-medium"
          style={{ backgroundColor: '#FAD879' }}
          onClick={onNext}
        >
          Sign In
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full h-12 border-2"
          style={{ borderColor: '#314BB1', color: '#314BB1' }}
          onClick={onRegister}
        >
          Create Account
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4 px-4">
          By continuing, you agree to CBK's Terms of Service and Privacy Policy. 
          Licensed and regulated by the Central Bank of Kenya.
        </p>
      </div>
    </div>
  );
}