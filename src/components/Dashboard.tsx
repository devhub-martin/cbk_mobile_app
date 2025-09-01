import React from 'react';
import { Search, Bell, TrendingUp, Wallet, CreditCard, Settings, LogOut } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

interface DashboardProps {
  user: User | null;
  onNavigate: (screen: string) => void;
  onLogout?: () => void;
}

export function Dashboard({ user, onNavigate, onLogout }: DashboardProps) {
  const categories = ['All', 'Government', 'Corporate', 'Maturities'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ backgroundColor: '#314BB1' }} className="px-4 py-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-medium">Hello, {user?.name?.split(' ')[0] || 'Investor'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-sm font-medium" style={{ color: '#314BB1' }}>
                {user?.name?.charAt(0) || 'I'}
              </span>
            </div>
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="p-2 hover:bg-white/20 text-white"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search bonds..." 
            className="pl-10 bg-white text-gray-900 border-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                index === 0 
                  ? 'text-white'
                  : 'text-gray-700 border-gray-300'
              }`}
              style={index === 0 ? { backgroundColor: '#FAD879', color: '#000' } : {}}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Summary */}
        <Card className="p-4" style={{ backgroundColor: '#F3F9FD' }}>
          <h3 className="font-medium mb-3">Portfolio Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Investment</p>
              <p className="font-bold text-lg">KES 1,200,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Bonds</p>
              <p className="font-bold text-lg">8</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Interest</p>
              <p className="font-bold text-lg">KES 12,500</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Next Payment</p>
              <p className="font-bold text-lg">5 days</p>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <div style={{ backgroundColor: '#FAD879' }} className="p-3 rounded-lg flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <p className="text-sm">Coupon Payment Due Tomorrow - KES 8,500</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-medium mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('marketplace')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#FAD879' }}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-medium">Buy Bond</h4>
                <p className="text-xs text-gray-600">Purchase new issues</p>
              </div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('portfolio')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#314BB1' }}>
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium">My Portfolio</h4>
                <p className="text-xs text-gray-600">View holdings</p>
              </div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('transactions')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#F3F9FD' }}>
                  <CreditCard className="w-6 h-6" style={{ color: '#314BB1' }} />
                </div>
                <h4 className="font-medium">Transactions</h4>
                <p className="text-xs text-gray-600">View history</p>
              </div>
            </Card>

            <Card 
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onNavigate('settings')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: '#7A4A47' }}>
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-medium">Settings</h4>
                <p className="text-xs text-gray-600">Account & MFA</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}