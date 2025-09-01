import React, { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';

// Mock data storage for demo purposes
export const useMockData = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 1200000,
    bonds: [
      {
        id: 1,
        name: 'CBK Treasury Bond 2025',
        issuer: 'Central Bank of Kenya',
        units: 100,
        purchaseValue: 500000,
        currentValue: 520000,
        couponRate: 8.5,
      },
      {
        id: 2,
        name: 'Infrastructure Bond 2027',
        issuer: 'Government of Kenya',
        units: 50,
        purchaseValue: 400000,
        currentValue: 415000,
        couponRate: 9.2,
      }
    ]
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      date: '2024-12-20',
      type: 'Purchase',
      bondName: 'CBK Treasury Bond 2025',
      amount: 100000,
      status: 'Completed'
    }
  ]);

  const addTransaction = (transaction: any) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updatePortfolio = (bondPurchase: any) => {
    setPortfolioData(prev => ({
      ...prev,
      totalValue: prev.totalValue + bondPurchase.amount,
      bonds: [...prev.bonds, bondPurchase]
    }));
  };

  return {
    portfolioData,
    transactions,
    addTransaction,
    updatePortfolio
  };
};

// Notification system
export const useNotifications = () => {
  const showWelcomeNotification = () => {
    setTimeout(() => {
      toast.info('💰 Welcome to CBK Retail Bonds! Your next coupon payment is due in 5 days.');
    }, 2000);
  };

  const showInterestPayment = () => {
    toast.success('💰 Interest payment received: KES 8,500');
  };

  const showBondMaturity = () => {
    toast.info('⏰ Your bond CBK Treasury Bond 2025 matures in 30 days');
  };

  return {
    showWelcomeNotification,
    showInterestPayment,
    showBondMaturity
  };
};

// Real-time features simulation
export const useRealTimeFeatures = () => {
  const [bondPrices, setBondPrices] = useState<{[key: string]: number}>({
    'CBK Treasury Bond 2025': 8.5,
    'Infrastructure Bond 2027': 9.2,
    'Development Bond 2030': 7.8
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBondPrices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(bond => {
          const change = (Math.random() - 0.5) * 0.1; // ±0.05% change
          updated[bond] = Math.max(0, updated[bond] + change);
        });
        return updated;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { bondPrices };
};

// Interactive demo features
export const useDemoFeatures = () => {
  const simulateBondPurchase = (bondData: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = {
          id: 'TXN' + Date.now().toString().slice(-6),
          date: new Date().toISOString().split('T')[0],
          type: 'Purchase',
          bondName: bondData.name,
          amount: bondData.amount,
          status: 'Completed'
        };
        resolve(transaction);
      }, 2000);
    });
  };

  const simulateInterestPayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const payment = {
          id: 'INT' + Date.now().toString().slice(-6),
          date: new Date().toISOString().split('T')[0],
          type: 'Interest Payment',
          amount: Math.floor(Math.random() * 10000) + 5000,
          status: 'Completed'
        };
        resolve(payment);
      }, 1000);
    });
  };

  return {
    simulateBondPurchase,
    simulateInterestPayment
  };
};