import React, { useState } from 'react';
import { WelcomeScreen } from './auth/WelcomeScreen';
import { LoginScreen } from './auth/LoginScreen';
import { RegistrationScreen } from './auth/RegistrationScreen';
import { DocumentUploadScreen } from './auth/DocumentUploadScreen';
import { OTPVerificationScreen } from './auth/OTPVerificationScreen';
import { BiometricSetupScreen } from './auth/BiometricSetupScreen';
import { ConfirmationScreen } from './auth/ConfirmationScreen';

type AuthStep = 'welcome' | 'login' | 'register' | 'documents' | 'otp' | 'biometric' | 'confirmation';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  kraPin: string;
  isOnboarded: boolean;
  biometricEnabled: boolean;
  mfaEnabled: boolean;
}

interface AuthFlowProps {
  onLogin: (user: User) => void;
}

export function AuthFlow({ onLogin }: AuthFlowProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome');
  const [registrationData, setRegistrationData] = useState({
    nationalId: '',
    kraPin: '',
    phone: '',
    email: '',
    name: '',
    password: ''
  });

  const handleStepChange = (step: AuthStep) => {
    setCurrentStep(step);
  };

  const handleRegistrationData = (data: any) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const handleLogin = (loginData: { email: string; password: string }) => {
    // Simulate login - in real app, this would call an API
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: loginData.email,
      phone: '+254 700 123 456',
      kraPin: 'A1234567890X',
      isOnboarded: true,
      biometricEnabled: true,
      mfaEnabled: true
    };
    onLogin(user);
  };

  const handleRegistrationComplete = () => {
    // Create user from registration data
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      kraPin: registrationData.kraPin,
      isOnboarded: true,
      biometricEnabled: true,
      mfaEnabled: true
    };
    onLogin(user);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={() => handleStepChange('login')} onRegister={() => handleStepChange('register')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onBack={() => handleStepChange('welcome')} onRegister={() => handleStepChange('register')} />;
      case 'register':
        return <RegistrationScreen onNext={(data) => { handleRegistrationData(data); handleStepChange('documents'); }} onBack={() => handleStepChange('welcome')} />;
      case 'documents':
        return <DocumentUploadScreen onNext={() => handleStepChange('otp')} onBack={() => handleStepChange('register')} />;
      case 'otp':
        return <OTPVerificationScreen onNext={() => handleStepChange('biometric')} onBack={() => handleStepChange('documents')} phone={registrationData.phone} />;
      case 'biometric':
        return <BiometricSetupScreen onNext={() => handleStepChange('confirmation')} onSkip={() => handleStepChange('confirmation')} />;
      case 'confirmation':
        return <ConfirmationScreen onComplete={handleRegistrationComplete} />;
      default:
        return <WelcomeScreen onNext={() => handleStepChange('login')} onRegister={() => handleStepChange('register')} />;
    }
  };

  return (
    <div className="flex-1 overflow-hidden">
      {renderStep()}
    </div>
  );
}