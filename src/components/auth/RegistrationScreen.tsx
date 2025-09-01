import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';

interface RegistrationScreenProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export function RegistrationScreen({ onNext, onBack }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    nationalId: '',
    kraPin: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    
    if (!formData.nationalId.trim() || formData.nationalId.length < 8) {
      toast.error('Please enter a valid National ID/Passport');
      return false;
    }
    
    if (!formData.kraPin.trim() || formData.kraPin.length < 10) {
      toast.error('Please enter a valid KRA PIN');
      return false;
    }
    
    if (!formData.phone.trim() || !formData.phone.startsWith('+254')) {
      toast.error('Please enter a valid Kenyan phone number (+254...)');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Registration details validated');
      onNext(formData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4" style={{ backgroundColor: '#314BB1' }}>
        <div className="flex items-center gap-3 text-white">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={onBack} />
          <h1 className="font-medium">Create Account</h1>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: '#314BB1' }}>
            Personal Information
          </h2>
          <p className="text-sm text-gray-600">
            We need this information to verify your identity and comply with CBK regulations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId">National ID / Passport Number *</Label>
            <Input
              id="nationalId"
              value={formData.nationalId}
              onChange={(e) => handleInputChange('nationalId', e.target.value)}
              placeholder="Enter your ID/Passport number"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kraPin">KRA PIN *</Label>
            <Input
              id="kraPin"
              value={formData.kraPin}
              onChange={(e) => handleInputChange('kraPin', e.target.value.toUpperCase())}
              placeholder="e.g., A123456789X"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+254 700 123 456"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="At least 8 characters"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-12 text-black font-medium"
              style={{ backgroundColor: '#FAD879' }}
              disabled={loading}
            >
              {loading ? 'Validating...' : 'Continue'}
            </Button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6 px-4">
          By creating an account, you agree to CBK's Terms of Service and Privacy Policy. 
          Your information is encrypted and secure.
        </p>
      </div>
    </div>
  );
}