import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, Download, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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

interface PortfolioProps {
  user: User | null;
}

export function Portfolio({ user }: PortfolioProps) {
  const [expandedBonds, setExpandedBonds] = useState<number[]>([]);

  const portfolioStats = {
    totalValue: 1200000,
    currentYield: 8.3,
    upcomingMaturities: 2,
    pendingPayments: 3
  };

  const holdings = [
    {
      id: 1,
      name: 'CBK Treasury Bond 2025',
      issuer: 'Central Bank of Kenya',
      units: 100,
      purchaseDate: '2024-06-15',
      purchaseValue: 500000,
      currentValue: 520000,
      couponRate: 8.5,
      paymentsReceived: 42500,
      nextPayment: '2025-01-15',
      maturityDate: '2025-12-15'
    },
    {
      id: 2,
      name: 'Infrastructure Bond 2027',
      issuer: 'Government of Kenya',
      units: 50,
      purchaseDate: '2024-03-20',
      purchaseValue: 400000,
      currentValue: 415000,
      couponRate: 9.2,
      paymentsReceived: 36800,
      nextPayment: '2025-03-20',
      maturityDate: '2027-03-20'
    },
    {
      id: 3,
      name: 'Development Bond 2030',
      issuer: 'Central Bank of Kenya',
      units: 35,
      purchaseDate: '2024-01-10',
      purchaseValue: 300000,
      currentValue: 308000,
      couponRate: 7.8,
      paymentsReceived: 23400,
      nextPayment: '2025-01-10',
      maturityDate: '2030-01-10'
    }
  ];

  const toggleBondExpansion = (bondId: number) => {
    setExpandedBonds(prev => 
      prev.includes(bondId) 
        ? prev.filter(id => id !== bondId)
        : [...prev, bondId]
    );
  };

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ backgroundColor: '#314BB1' }} className="px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="font-medium">My Portfolio</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Total Portfolio Value */}
        <Card className="p-4" style={{ backgroundColor: '#F3F9FD' }}>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Portfolio Value</p>
            <p className="text-3xl font-bold" style={{ color: '#314BB1' }}>
              {formatCurrency(portfolioStats.totalValue)}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-600">+2.5% this month</p>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <p className="text-lg font-bold" style={{ color: '#FAD879', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
              {portfolioStats.currentYield}%
            </p>
            <p className="text-xs text-gray-600">Current Yield</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold" style={{ color: '#314BB1' }}>
              {portfolioStats.upcomingMaturities}
            </p>
            <p className="text-xs text-gray-600">Upcoming Maturities</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold" style={{ color: '#7A4A47' }}>
              {portfolioStats.pendingPayments}
            </p>
            <p className="text-xs text-gray-600">Pending Payments</p>
          </Card>
        </div>

        {/* Bond Holdings */}
        <div className="space-y-3">
          <h3 className="font-medium">Bond Holdings</h3>
          
          {holdings.map((bond) => (
            <Card key={bond.id} className="overflow-hidden">
              <Collapsible>
                <CollapsibleTrigger 
                  className="w-full p-4 text-left hover:bg-gray-50"
                  onClick={() => toggleBondExpansion(bond.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: '#314BB1' }}>
                        {bond.name}
                      </h4>
                      <p className="text-sm text-gray-600">{bond.issuer}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div>
                          <p className="text-sm font-medium">{bond.units} units</p>
                          <p className="text-xs text-gray-500">Purchased {formatDate(bond.purchaseDate)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{formatCurrency(bond.paymentsReceived)}</p>
                          <p className="text-xs text-gray-500">Interest Received</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        style={{ backgroundColor: '#FAD879', color: '#000' }}
                      >
                        {bond.couponRate}%
                      </Badge>
                      {expandedBonds.includes(bond.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-3 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Purchase Value</p>
                        <p className="font-medium">{formatCurrency(bond.purchaseValue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Current Value</p>
                        <p className="font-medium text-green-600">{formatCurrency(bond.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Payment</p>
                        <p className="font-medium">{formatDate(bond.nextPayment)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Maturity Date</p>
                        <p className="font-medium">{formatDate(bond.maturityDate)}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download Statement (PDF)
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Portfolio Performance Chart Placeholder */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Portfolio Growth</h3>
          <div className="h-32 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 text-sm">Portfolio growth chart would be displayed here</p>
          </div>
        </Card>
      </div>
    </div>
  );
}