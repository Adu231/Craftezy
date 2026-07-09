import { useState } from 'react';
import { Bell, Shield, Trash2, KeyRound, Smartphone } from 'lucide-react';
import CustomerLayout from '@/layouts/role/CustomerLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CustomerSettings() {
  const [notifs, setNotifs] = useState({ orders: true, promos: false, reviews: true, news: false });
  
  // Security Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2faModal, setShow2faModal] = useState(false);
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  
  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Password changed successfully!');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handle2faToggle = (e: React.FormEvent) => {
    e.preventDefault();
    if (is2faEnabled) {
      setIs2faEnabled(false);
      toast.success('Two-factor authentication disabled');
      setShow2faModal(false);
      return;
    }
    if (verificationCode.length < 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }
    setIs2faEnabled(true);
    toast.success('Two-factor authentication enabled successfully!');
    setShow2faModal(false);
    setVerificationCode('');
  };

  return (
    <CustomerLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-xs text-muted-foreground">Choose what you want to be notified about</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'orders', label: 'Order Updates', desc: 'Shipping, delivery, and status changes' },
              { key: 'promos', label: 'Promotions & Deals', desc: 'Special offers and discounts' },
              { key: 'reviews', label: 'Review Reminders', desc: 'Reminders to review purchases' },
              { key: 'news', label: 'Platform News', desc: 'New features and announcements' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <button
                  onClick={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key as keyof typeof n] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${notifs[item.key as keyof typeof n] ? 'bg-primary' : 'bg-muted'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifs[item.key as keyof typeof n] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-xs text-muted-foreground">Manage your account security</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full rounded-xl justify-start gap-2 h-11" onClick={() => setShowPasswordModal(true)}>
              <KeyRound className="w-4 h-4 text-muted-foreground" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full rounded-xl justify-start gap-2 h-11" onClick={() => setShow2faModal(true)}>
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              {is2faEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication'}
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-700">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back.</p>
          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 rounded-xl"
            onClick={() => toast.error('Account deletion requires confirmation via email')}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handlePasswordChange} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">Change Password</h3>
            <p className="text-xs text-muted-foreground mb-4">Update your account credentials to keep your profile secure</p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="current-pw">Current Password</Label>
                <Input
                  id="current-pw"
                  type="password"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="Enter current password"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-pw">New Password</Label>
                <Input
                  id="new-pw"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="Enter new password"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm-pw">Confirm New Password</Label>
                <Input
                  id="confirm-pw"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="h-11 rounded-xl border-border bg-white"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowPasswordModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                Update Password
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* 2FA Modal */}
      {show2faModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <form onSubmit={handle2faToggle} className="bg-white rounded-3xl p-6 max-w-md w-full border border-border shadow-craft-lg relative animate-in zoom-in duration-200">
            <h3 className="font-display font-bold text-xl mb-1 text-foreground">
              {is2faEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              {is2faEnabled 
                ? 'Confirm you want to disable two-factor authentication on your account.'
                : 'Scan the QR code below with Google Authenticator or Authy to configure 2FA.'
              }
            </p>

            {!is2faEnabled && (
              <div className="space-y-4">
                {/* Mock QR Code */}
                <div className="flex flex-col items-center justify-center p-4 bg-muted/30 border border-dashed border-border rounded-2xl">
                  <div className="w-32 h-32 bg-white border border-border p-2 rounded-xl flex items-center justify-center font-bold text-xs text-center text-muted-foreground shadow-sm">
                    [MOCK QR CODE]
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 font-mono">Secret Key: CRFT ZY56 NM90 LK34</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="verification-code">Verification Code</Label>
                  <Input
                    id="verification-code"
                    type="text"
                    maxLength={6}
                    value={verificationCode}
                    onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    className="h-11 rounded-xl border-border bg-white text-center tracking-widest text-lg font-semibold"
                    placeholder="000000"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShow2faModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button type="submit" className="rounded-xl bg-primary text-white hover:bg-primary/90 px-5">
                {is2faEnabled ? 'Disable 2FA' : 'Verify & Enable'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </CustomerLayout>
  );
}
