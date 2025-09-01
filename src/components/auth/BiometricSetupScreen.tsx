import React, { useState } from 'react';
import { ArrowLeft, Fingerprint, Smartphone, Shield, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface BiometricSetupScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function BiometricSetupScreen({ onNext, onSkip }: BiometricSetupScreenProps) {
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBiometricSetup = async (type: 'fingerprint' | 'faceid') => {
    setLoading(true);
    
    toast.info(`Setting up ${type === 'fingerprint' ? 'Fingerprint' : 'Face ID'}...`);
    
    // Simulate biometric setup process
    setTimeout(() => {
      if (type === 'fingerprint') {
        setFingerprintEnabled(true);
        toast.success('Fingerprint authentication enabled');
      } else {
        setFaceIdEnabled(true);
        toast.success('Face ID authentication enabled');
      }
      
      setSetupComplete(true);
      setLoading(false);
    }, 2000);
  };

  const handleContinue = () => {
    if (fingerprintEnabled || faceIdEnabled) {
      toast.success('Biometric authentication configured successfully');
    }
    onNext();
  };

  const BiometricOption = ({ 
    type, 
    title, 
    description, 
    icon: Icon, 
    enabled, 
    onSetup 
  }: {
    type: string;
    title: string;
    description: string;
    icon: any;
    enabled: boolean;
    onSetup: () => void;
  }) => (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: enabled ? '#FAD879' : '#F3F9FD' }}>
            {enabled ? (
              <Check className="w-6 h-6 text-green-600" />
            ) : (
              <Icon className="w-6 h-6" style={{ color: '#314BB1' }} />
            )}
          </div>
          
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {enabled ? (
            <span className="text-sm text-green-600 font-medium">Enabled</span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onSetup}
              disabled={loading}
            >
              Setup
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4" style={{ backgroundColor: '#314BB1' }}>
        <div className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onSkip} />
          <h1 className="font-medium">Setup Biometric Authentication</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F3F9FD' }}>
            <Shield className="w-10 h-10" style={{ color: '#314BB1' }} />
          </div>
          
          <h2 className="text-xl font-bold mb-2" style={{ color: '#314BB1' }}>
            Secure Your Account
          </h2>
          <p className="text-gray-600">
            Enable biometric authentication for faster and more secure access to your account.
          </p>
        </div>

        {/* Biometric Options */}
        <div className="space-y-4 mb-8">
          <BiometricOption
            type="fingerprint"
            title="Fingerprint Authentication"
            description="Use your fingerprint to sign in quickly"
            icon={Fingerprint}
            enabled={fingerprintEnabled}
            onSetup={() => handleBiometricSetup('fingerprint')}
          />
          
          <BiometricOption
            type="faceid"
            title="Face ID Authentication"
            description="Use Face ID for hands-free authentication"
            icon={Smartphone}
            enabled={faceIdEnabled}
            onSetup={() => handleBiometricSetup('faceid')}
          />
        </div>

        {/* Security Benefits */}
        <Card className="p-4 mb-8" style={{ backgroundColor: '#F3F9FD' }}>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Why use biometric authentication?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Faster sign-in without typing passwords</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Enhanced security with unique biometric data</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Your biometric data stays on your device</span>
            </li>
          </ul>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            className="w-full h-12 text-black font-medium"
            style={{ backgroundColor: '#FAD879' }}
            onClick={handleContinue}
          >
            {setupComplete ? 'Continue' : 'Continue Without Biometrics'}
          </Button>
          
          {!setupComplete && (
            <button
              onClick={onSkip}
              className="w-full text-center text-sm py-3"
              style={{ color: '#7A4A47' }}
            >
              Skip for now
            </button>
          )}
        </div>

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm text-gray-600">Setting up biometric authentication...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}