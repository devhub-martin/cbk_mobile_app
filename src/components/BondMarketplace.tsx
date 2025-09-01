import React, { useState } from 'react';
import { Filter, ArrowLeft } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

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

interface BondMarketplaceProps {
  user: User | null;
}

export function BondMarketplace({ user }: BondMarketplaceProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedBond, setSelectedBond] = useState<any>(null);

  const filters = ['All', '1 year', '2 years', '5 years', 'High Yield', 'Low Risk'];

  const bonds = [
    {
      id: 1,
      issuer: 'Central Bank of Kenya',
      name: 'CBK Treasury Bond 2025',
      couponRate: 8.5,
      maturity: '12 months',
      minInvestment: 5000,
      risk: 'Low',
      yield: 'High'
    },
    {
      id: 2,
      issuer: 'Government of Kenya',
      name: 'Infrastructure Bond 2027',
      couponRate: 9.2,
      maturity: '24 months',
      minInvestment: 10000,
      risk: 'Low',
      yield: 'High'
    },
    {
      id: 3,
      issuer: 'Central Bank of Kenya',
      name: 'Development Bond 2030',
      couponRate: 7.8,
      maturity: '60 months',
      minInvestment: 7500,
      risk: 'Medium',
      yield: 'Medium'
    }
  ];

  const handlePurchase = (bond: any) => {
    setSelectedBond(bond);
    setShowPurchaseDialog(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ backgroundColor: '#314BB1' }} className="px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="font-medium">Bond Marketplace</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                selectedFilter === filter 
                  ? 'text-white' 
                  : 'text-gray-700 border-gray-300'
              }`}
              style={selectedFilter === filter ? { backgroundColor: '#314BB1' } : {}}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            <Filter className="w-3 h-3 mr-1" />
            More
          </Button>
        </div>

        {/* Bond Listings */}
        <div className="space-y-3">
          {bonds.map((bond) => (
            <Card key={bond.id} className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium" style={{ color: '#314BB1' }}>
                      {bond.issuer}
                    </h3>
                    <p className="text-sm text-gray-600">{bond.name}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {bond.risk} Risk
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: '#FAD879', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
                        {bond.couponRate}%
                      </p>
                      <p className="text-xs text-gray-600">Coupon Rate</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{bond.maturity}</p>
                      <p className="text-xs text-gray-600">Maturity</p>
                    </div>
                  </div>
                  <Button 
                    style={{ backgroundColor: '#FAD879', color: '#000' }}
                    onClick={() => handlePurchase(bond)}
                  >
                    Buy
                  </Button>
                </div>

                <div className="text-sm" style={{ color: '#7A4A47' }}>
                  Min. Investment: KES {bond.minInvestment.toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Bond</DialogTitle>
            <DialogDescription>
              Complete your bond purchase by entering the investment amount and selecting a payment method.
            </DialogDescription>
          </DialogHeader>
          {selectedBond && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedBond.name}</h4>
                <p className="text-sm text-gray-600">{selectedBond.issuer}</p>
                <p className="text-lg font-bold">{selectedBond.couponRate}% Coupon Rate</p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="amount">Investment Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder={`Min. ${selectedBond.minInvestment.toLocaleString()}`}
                    min={selectedBond.minInvestment}
                  />
                </div>

                <div>
                  <Label htmlFor="payment">Payment Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpesa">M-Pesa</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="card">Debit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full"
                  style={{ backgroundColor: '#FAD879', color: '#000' }}
                  onClick={() => {
                    toast.success('Bond purchase confirmed! Transaction ID: TXN' + Date.now().toString().slice(-6));
                    setShowPurchaseDialog(false);
                    setSelectedBond(null);
                  }}
                >
                  Confirm Purchase
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}