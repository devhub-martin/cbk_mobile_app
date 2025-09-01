import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { toast } from 'sonner@2.0.3';

interface OTPVerificationScreenProps {
  onNext: () => void;
  onBack: () => void;
  phone: string;
}

export function OTPVerificationScreen({ onNext, onBack, phone }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);

  // Demo OTP for testing
  const correctOTP = '123456';

  useEffect(() => {
    // Start initial cooldown
    setResendCooldown(60);
    toast.info(`OTP sent to ${phone}. Use 123456 for demo.`);
  }, [phone]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    
    // Auto-verify when 6 digits are entered
    if (value.length === 6) {
      handleVerifyOTP(value);
    }
  };

  const handleVerifyOTP = (otpValue: string = otp) => {
    if (otpValue.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setLoading(true);

    // Simulate API verification
    setTimeout(() => {
      if (otpValue === correctOTP) {
        toast.success('Phone number verified successfully');
        onNext();
      } else {
        toast.error('Invalid OTP. Please try again.');
        setOtp('');
      }
      setLoading(false);
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendCooldown > 0) return;
    
    if (resendCount >= 3) {
      toast.error('Maximum resend attempts reached. Please try again later.');
      return;
    }

    setResendCount(prev => prev + 1);
    setResendCooldown(60);
    setOtp('');
    
    toast.success('New OTP sent to your phone');
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length > 8) {
      return phone.slice(0, 4) + ' ' + phone.slice(4, 7) + ' ***' + phone.slice(-3);
    }
    return phone;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4" style={{ backgroundColor: '#314BB1' }}>
        <div className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
          <h1 className="font-medium">Verify Phone Number</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#314BB1' }}>
            Enter OTP
          </h2>
          <p className="text-gray-600 mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="font-medium" style={{ color: '#314BB1' }}>
            {formatPhoneNumber(phone)}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-8">
          <InputOTP
            value={otp}
            onChange={handleOTPChange}
            maxLength={6}
            disabled={loading}
            render={({ slots }) => (
              <InputOTPGroup className="gap-3">
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index}
                    {...slot}
                    className="w-12 h-12 text-xl font-medium border-2 rounded-lg"
                    style={{
                      borderColor: slot.isActive ? '#314BB1' : '#E5E7EB',
                      backgroundColor: slot.char ? '#F3F9FD' : 'white'
                    }}
                  />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        {/* Verify Button */}
        <Button 
          className="w-full h-12 text-black font-medium mb-6"
          style={{ backgroundColor: otp.length === 6 ? '#FAD879' : '#E5E7EB' }}
          onClick={() => handleVerifyOTP()}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>

        {/* Resend Section */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          
          {resendCooldown > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in {resendCooldown}s
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-sm font-medium"
              style={{ color: resendCount >= 3 ? '#9CA3AF' : '#7A4A47' }}
              disabled={resendCount >= 3}
            >
              {resendCount >= 3 ? 'Maximum attempts reached' : 'Resend OTP'}
            </button>
          )}
          
          {resendCount > 0 && resendCount < 3 && (
            <p className="text-xs text-gray-500 mt-1">
              Attempts remaining: {3 - resendCount}
            </p>
          )}
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: '#F3F9FD' }}>
          <p className="text-sm text-center" style={{ color: '#314BB1' }}>
            <strong>Demo Mode:</strong> Use OTP <strong>123456</strong> to continue
          </p>
        </div>
      </div>
    </div>
  );
}