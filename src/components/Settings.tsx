import React, { useState } from 'react';
import { ArrowLeft, Edit, Lock, Shield, Bell, FileText, LogOut, ChevronRight, Smartphone, Key } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

interface SettingsProps {
  user: User | null;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

export function Settings({ user, onLogout, onUpdateUser }: SettingsProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(user?.biometricEnabled || false);
  const [mfaEnabled, setMfaEnabled] = useState(user?.mfaEnabled || false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [bondPurchaseNotif, setBondPurchaseNotif] = useState(true);
  const [interestPaymentNotif, setInterestPaymentNotif] = useState(true);
  const [maturityReminder, setMaturityReminder] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const profileData = {
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    kraPin: user?.kraPin || ''
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onClick, 
    rightElement 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <div 
      className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color: '#314BB1' }} />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      {rightElement || <ChevronRight className="w-4 h-4 text-gray-400" />}
    </div>
  );

  const NotificationItem = ({ 
    title, 
    subtitle, 
    checked, 
    onChange 
  }: {
    title: string;
    subtitle: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ backgroundColor: '#314BB1' }} className="px-4 py-4 text-white">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="font-medium">Settings & Security</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Profile Section */}
        <div>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Profile</h3>
          <Card className="p-4 space-y-1">
            <SettingItem
              icon={Edit}
              title="Edit Name"
              subtitle={profileData.name}
            />
            <SettingItem
              icon={Edit}
              title="Email"
              subtitle={profileData.email}
            />
            <SettingItem
              icon={Edit}
              title="Phone Number"
              subtitle={profileData.phone}
            />
            <SettingItem
              icon={Edit}
              title="KRA PIN"
              subtitle={profileData.kraPin}
            />
          </Card>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Security</h3>
          <Card className="p-4 space-y-1">
            <SettingItem
              icon={Key}
              title="Change Password"
              subtitle="Last changed 30 days ago"
              onClick={() => setShowPasswordDialog(true)}
            />
            <Separator className="my-2" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Shield className="w-4 h-4" style={{ color: '#314BB1' }} />
                </div>
                <div>
                  <p className="font-medium">Multi-Factor Authentication</p>
                  <p className="text-sm text-gray-600">
                    {mfaEnabled ? 'Enabled' : 'Disabled'} - OTP verification required
                  </p>
                </div>
              </div>
              <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" style={{ color: '#314BB1' }} />
                </div>
                <div>
                  <p className="font-medium">Biometric Authentication</p>
                  <p className="text-sm text-gray-600">
                    {biometricEnabled ? 'Enabled' : 'Disabled'} - Fingerprint/Face ID
                  </p>
                </div>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>
            <Separator className="my-2" />
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Lock className="w-4 h-4" style={{ color: '#314BB1' }} />
                </div>
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-gray-600">Get notified of security events</p>
                </div>
              </div>
              <Switch checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
            </div>
          </Card>
        </div>

        {/* Notifications Section */}
        <div>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Notifications</h3>
          <Card className="p-4 space-y-1">
            <NotificationItem
              title="Bond Purchase"
              subtitle="Get notified when you purchase bonds"
              checked={bondPurchaseNotif}
              onChange={setBondPurchaseNotif}
            />
            <Separator className="my-2" />
            <NotificationItem
              title="Interest Payment"
              subtitle="Get notified of coupon payments"
              checked={interestPaymentNotif}
              onChange={setInterestPaymentNotif}
            />
            <Separator className="my-2" />
            <NotificationItem
              title="Maturity Reminder"
              subtitle="Get reminded before bond maturity"
              checked={maturityReminder}
              onChange={setMaturityReminder}
            />
          </Card>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Legal</h3>
          <Card className="p-4 space-y-1">
            <SettingItem
              icon={FileText}
              title="Privacy Policy"
              subtitle="Read our privacy policy"
            />
            <SettingItem
              icon={FileText}
              title="Terms & Conditions"
              subtitle="Read terms of service"
            />
          </Card>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="font-medium mb-3" style={{ color: '#314BB1' }}>Account</h3>
          <Card className="p-4">
            <Button
              variant="destructive"
              className="w-full"
              style={{ backgroundColor: '#7A4A47', color: 'white' }}
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Card>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will need to authenticate again to access your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                style={{ backgroundColor: '#7A4A47', color: 'white' }}
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new secure password for your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowPasswordDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                style={{ backgroundColor: '#FAD879', color: '#000' }}
              >
                Update Password
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}