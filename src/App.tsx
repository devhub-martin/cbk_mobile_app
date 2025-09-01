import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { BondMarketplace } from './components/BondMarketplace';
import { Portfolio } from './components/Portfolio';
import { TransactionHistory } from './components/TransactionHistory';
import { Settings } from './components/Settings';
import { BottomNavigation } from './components/BottomNavigation';
import { AuthFlow } from './components/AuthFlow';

type Screen = 'dashboard' | 'marketplace' | 'portfolio' | 'transactions' | 'settings';

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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for saved session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('cbk_user');
    const savedAuth = localStorage.getItem('cbk_authenticated');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('cbk_user', JSON.stringify(userData));
    localStorage.setItem('cbk_authenticated', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('cbk_user');
    localStorage.removeItem('cbk_authenticated');
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'marketplace':
        return <BondMarketplace user={user} />;
      case 'portfolio':
        return <Portfolio user={user} />;
      case 'transactions':
        return <TransactionHistory user={user} />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} onUpdateUser={setUser} />;
      default:
        return <Dashboard user={user} onNavigate={setCurrentScreen} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-[390px] mx-auto h-screen flex flex-col bg-gray-50">
        <AuthFlow onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] mx-auto h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
}