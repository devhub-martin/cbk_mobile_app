import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, ShoppingCart, Banknote, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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

interface TransactionHistoryProps {
  user: User | null;
}

export function TransactionHistory({ user }: TransactionHistoryProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterType, setFilterType] = useState('All');

  const transactions = [
    {
      id: 'TXN001',
      date: '2024-12-20',
      type: 'Purchase',
      bondName: 'CBK Treasury Bond 2025',
      amount: 100000,
      units: 20,
      status: 'Completed',
      paymentMethod: 'M-Pesa',
      icon: ShoppingCart,
      statusColor: 'green'
    },
    {
      id: 'TXN002',
      date: '2024-12-15',
      type: 'Interest Payment',
      bondName: 'Infrastructure Bond 2027',
      amount: 8500,
      units: null,
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      icon: Banknote,
      statusColor: 'green'
    },
    {
      id: 'TXN003',
      date: '2024-12-10',
      type: 'Purchase',
      bondName: 'Development Bond 2030',
      amount: 75000,
      units: 15,
      status: 'Pending',
      paymentMethod: 'Debit Card',
      icon: ShoppingCart,
      statusColor: 'yellow'
    },
    {
      id: 'TXN004',
      date: '2024-12-05',
      type: 'Purchase',
      bondName: 'CBK Treasury Bond 2025',
      amount: 50000,
      units: 10,
      status: 'Failed',
      paymentMethod: 'M-Pesa',
      icon: AlertCircle,
      statusColor: 'red'
    },
    {
      id: 'TXN005',
      date: '2024-11-30',
      type: 'Interest Payment',
      bondName: 'CBK Treasury Bond 2025',
      amount: 4250,
      units: null,
      status: 'Completed',
      paymentMethod: 'Bank Transfer',
      icon: Banknote,
      statusColor: 'green'
    }
  ];

  const filteredTransactions = filterType === 'All' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowDetails(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ backgroundColor: '#314BB1' }} className="px-4 py-4 text-white">
        <div className="flex items-center gap-3 mb-4">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="font-medium">Transaction History</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search transactions..." 
            className="pl-10 bg-white text-gray-900 border-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Filter */}
        <div className="flex items-center gap-3">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Transactions</SelectItem>
              <SelectItem value="Purchase">Purchases</SelectItem>
              <SelectItem value="Interest Payment">Interest Payments</SelectItem>
              <SelectItem value="Redeem">Redemptions</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-3 h-3 mr-2" />
            Date Range
          </Button>
        </div>

        {/* Transaction List */}
        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <Card 
                  key={transaction.id} 
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                        <IconComponent className="w-5 h-5" style={{ color: '#314BB1' }} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-600">{transaction.bondName}</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                      <Badge className={`text-xs ${getStatusBadgeColor(transaction.status)}`}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="font-medium">No transactions found</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Try adjusting your search or filter criteria
                </p>
              </div>
              <Button 
                style={{ backgroundColor: '#FAD879', color: '#000' }}
                onClick={() => setFilterType('All')}
              >
                View All Transactions
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Transaction Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              View detailed information about this transaction including amount, date, and payment method.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-medium text-lg">{selectedTransaction.type}</h3>
                <p className="text-2xl font-bold" style={{ color: '#314BB1' }}>
                  {formatCurrency(selectedTransaction.amount)}
                </p>
                <Badge className={`mt-2 ${getStatusBadgeColor(selectedTransaction.status)}`}>
                  {selectedTransaction.status}
                </Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-medium">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bond:</span>
                  <span className="font-medium">{selectedTransaction.bondName}</span>
                </div>
                {selectedTransaction.units && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Units:</span>
                    <span className="font-medium">{selectedTransaction.units}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{selectedTransaction.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(selectedTransaction.date)}</span>
                </div>
              </div>

              <Button 
                className="w-full"
                variant="outline"
              >
                <Download className="w-3 h-3 mr-2" />
                Download Receipt (PDF)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}