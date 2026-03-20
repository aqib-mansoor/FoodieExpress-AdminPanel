import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck, Mail, Lock, CheckCircle2, TrendingUp, Users, Store } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('admin@foodieexpress.pk');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Left Side - Branding & Info (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-lg"
        >
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-primary font-black text-4xl mb-8 shadow-2xl">
            F
          </div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tighter">
            Manage your <br />
            <span className="text-white/60 italic">Marketplace</span> <br />
            with precision.
          </h1>
          <p className="text-white/70 text-lg mb-12 font-medium max-w-md">
            The ultimate command center for FoodieExpress. Monitor orders, manage vendors, and track growth in real-time.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
              <TrendingUp className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-black text-2xl tracking-tight">12.5%</p>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Monthly Growth</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
              <Users className="w-8 h-8 text-white mb-3" />
              <p className="text-white font-black text-2xl tracking-tight">12.5k+</p>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Active Users</p>
            </div>
          </div>
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-50 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo (Visible only on mobile) */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-4 shadow-xl">
              F
            </div>
            <h1 className="text-primary font-black text-2xl uppercase tracking-tight">FoodieExpress</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Admin Portal</p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Enter your credentials to access the admin dashboard.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="admin@foodieexpress.pk"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 ml-1">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Forgot?</button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 px-1">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer">Remember this device</label>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 flex items-center justify-center gap-2 transform active:scale-[0.98] transition-all"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Portal
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Grade Security</span>
            </div>
          </div>

          <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2024 FoodieExpress. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
