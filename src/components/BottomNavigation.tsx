import React from 'react';
import { Home, TrendingUp, Wallet, Receipt, Settings } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Bonds', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'transactions', label: 'History', icon: Receipt },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0"
            >
              <Icon 
                className="w-5 h-5 mb-1" 
                style={{ 
                  color: isActive ? '#314BB1' : '#6B7280' 
                }}
              />
              <span 
                className="text-xs font-medium"
                style={{ 
                  color: isActive ? '#314BB1' : '#6B7280' 
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}