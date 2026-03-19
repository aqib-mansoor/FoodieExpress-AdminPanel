import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { formatCurrency, cn } from '@/utils';
import { Wallet, ArrowUpRight, CreditCard, Landmark, History, X, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { MOCK_PAYOUTS } from '@/mockData';

const DATA = [
  { name: 'Vendors', value: 85000, color: '#27187E' },
  { name: 'Platform', value: 25000, color: '#758BFD' },
  { name: 'Tax', value: 15430, color: '#FF8600' },
];

export const Financials = () => {
  const [availableBalance, setAvailableBalance] = useState(1245080); // In PKR (1,245,080)
  const [payoutHistory, setPayoutHistory] = useState(MOCK_PAYOUTS);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutStep, setPayoutStep] = useState<'method' | 'confirm'>('method');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [payoutAmount, setPayoutAmount] = useState(0);

  const handlePayout = () => {
    const newPayout = {
      id: `p${payoutHistory.length + 1}`,
      vendor: 'Platform Withdrawal',
      amount: payoutAmount,
      status: 'PROCESSED',
      date: new Date().toISOString().split('T')[0],
    };
    setPayoutHistory([newPayout as any, ...payoutHistory]);
    setAvailableBalance(prev => prev - payoutAmount);
    setIsPayoutModalOpen(false);
    setPayoutStep('method');
    setSelectedMethod('');
    setPayoutAmount(0);
    toast.success('Payout processed successfully!');
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Financial Management</h2>
          <p className="text-slate-500 text-sm">Revenue, commissions, and vendor payouts.</p>
        </div>
        <button 
          onClick={() => {
            setPayoutAmount(availableBalance);
            setIsPayoutModalOpen(true);
          }}
          className="btn-primary w-full sm:w-auto"
        >
          <CreditCard className="w-4 h-4" />
          Process Payouts
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm card-hover">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Payout</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900">{formatCurrency(availableBalance)}</h3>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-black uppercase mt-2">
                <ArrowUpRight className="w-3 h-3" />
                +8.4% growth
              </div>
            </div>
            {/* ... */}
          </div>
          {/* ... chart ... */}
        </div>

        <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-tight">Payout History</h3>
          <div className="space-y-3">
            {payoutHistory.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/20 transition-all group">
                <div>
                  <p className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{payout.vendor}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{payout.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{formatCurrency(payout.amount)}</p>
                  <span className={cn(
                    "text-[9px] font-black px-1.5 py-0.5 rounded-md mt-1 inline-block",
                    payout.status === 'PROCESSED' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {payout.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 flex items-center justify-center gap-2 py-3 text-xs font-black text-slate-500 hover:bg-slate-50 rounded-xl transition-all border border-slate-200 uppercase tracking-widest">
            <History className="w-4 h-4" />
            Full History
          </button>
        </div>
      </div>

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-primary p-6 flex items-center justify-between">
              <h3 className="text-white font-black uppercase tracking-tight">
                {payoutStep === 'method' ? 'Select Payout Method' : 'Confirm Payout'}
              </h3>
              <button onClick={() => setIsPayoutModalOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              {payoutStep === 'method' ? (
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-600 mb-4">Amount to withdraw: <span className="text-primary font-black">{formatCurrency(payoutAmount)}</span></p>
                  {['Bank Transfer', 'JazzCash', 'EasyPaisa'].map(method => (
                    <button 
                      key={method}
                      onClick={() => setSelectedMethod(method)}
                      className={cn(
                        "w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between",
                        selectedMethod === method ? "border-primary bg-primary/5" : "border-slate-100 hover:border-primary/20"
                      )}
                    >
                      <span className="font-black text-slate-900">{method}</span>
                      {selectedMethod === method && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </button>
                  ))}
                  <button 
                    disabled={!selectedMethod}
                    onClick={() => setPayoutStep('confirm')}
                    className="w-full btn-primary py-4 mt-4 disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Landmark className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900">Confirm Withdrawal</h4>
                    <p className="text-slate-500 text-sm mt-2">You are about to withdraw <span className="font-black text-primary">{formatCurrency(payoutAmount)}</span> via <span className="font-black text-slate-900">{selectedMethod}</span>.</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setPayoutStep('method')} className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-all">Back</button>
                    <button onClick={handlePayout} className="flex-1 btn-primary py-4">Confirm</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
