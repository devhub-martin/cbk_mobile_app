import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Fingerprint, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';

interface LoginScreenProps {
  onLogin: (data: { email: string; password: string }) => void;
  onBack: () => void;
  onRegister: () => void;
}

export function LoginScreen({ onLogin, onBack, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'demo@cbk.co.ke' && password === 'demo123') {
        toast.success('Welcome back!');
        onLogin({ email, password });
      } else {
        toast.error('Invalid email or password');
      }
      setLoading(false);
    }, 1500);
  };

  const handleBiometricLogin = () => {
    toast.info('Biometric authentication would be triggered here');
    // Simulate biometric success
    setTimeout(() => {
      toast.success('Biometric authentication successful');
      onLogin({ email: 'demo@cbk.co.ke', password: 'biometric' });
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4" style={{ backgroundColor: '#314BB1' }}>
        <div className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
          <h1 className="font-medium">Sign In</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {/* Demo Credentials Info */}
        <Card className="p-4 mb-6" style={{ backgroundColor: '#F3F9FD', border: '1px solid #314BB1' }}>
          <h3 className="font-medium mb-2" style={{ color: '#314BB1' }}>Demo Credentials</h3>
          <p className="text-sm text-gray-600 mb-2">Email: demo@cbk.co.ke</p>
          <p className="text-sm text-gray-600">Password: demo123</p>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-black font-medium"
            style={{ backgroundColor: '#FAD879' }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Biometric Options */}
        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white px-4 text-sm text-gray-500">Or sign in with</span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 flex items-center gap-2"
              onClick={handleBiometricLogin}
            >
              <Fingerprint className="w-4 h-4" />
              Fingerprint
            </Button>
            
            <Button
              variant="outline"
              className="h-12 flex items-center gap-2"
              onClick={handleBiometricLogin}
            >
              <Smartphone className="w-4 h-4" />
              Face ID
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center space-y-4">
          <button className="text-sm" style={{ color: '#314BB1' }}>
            Forgot your password?
          </button>
          
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-gray-600">Don't have an account?</span>
            <button 
              onClick={onRegister}
              className="font-medium"
              style={{ color: '#314BB1' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}