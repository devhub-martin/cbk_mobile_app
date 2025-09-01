import React, { useEffect, useState } from 'react';
import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ConfirmationScreenProps {
  onComplete: () => void;
}

export function ConfirmationScreen({ onComplete }: ConfirmationScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 300);
  }, []);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Start Investing',
      description: 'Browse and purchase government-backed bonds'
    },
    {
      icon: Sparkles,
      title: 'Earn Interest',
      description: 'Receive regular coupon payments'
    },
    {
      icon: Check,
      title: 'Track Performance',
      description: 'Monitor your portfolio growth'
    }
  ];

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#F3F9FD' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Success Animation */}
        <div className={`mb-8 transition-all duration-1000 ${showAnimation ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative">
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: '#FAD879' }}>
              <Check className="w-12 h-12 text-green-600" />
            </div>
            
            {/* Celebratory particles */}
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-3xl font-bold mb-4" style={{ color: '#314BB1' }}>
            Account Created Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Welcome to CBK Retail Bonds. You're all set to start your investment journey.
          </p>
        </div>

        {/* Next Steps */}
        <div className={`w-full max-w-sm space-y-4 mb-12 transition-all duration-1000 delay-500 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F3F9FD' }}>
                    <Icon className="w-5 h-5" style={{ color: '#314BB1' }} />
                  </div>
                  <div>
                    <h3 className="font-medium">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Action */}
      <div className={`px-6 pb-8 transition-all duration-1000 delay-700 ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
        <Button 
          className="w-full h-12 text-black font-medium"
          style={{ backgroundColor: '#FAD879' }}
          onClick={onComplete}
        >
          Go to Dashboard
        </Button>
        
        <p className="text-xs text-gray-500 text-center mt-4">
          You can always update your preferences in the Settings menu.
        </p>
      </div>
    </div>
  );
}