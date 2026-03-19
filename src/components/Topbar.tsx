import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';
import toast from 'react-hot-toast';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            onChange={(e) => e.target.value && console.log('Searching:', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
          />
        </div>
        
        <div className="sm:hidden font-black text-primary text-lg tracking-tighter">FE</div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
        <button 
          onClick={() => toast.success('Search feature coming soon!')}
          className="sm:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Search className="w-5 h-5" />
        </button>

        <button 
          onClick={() => toast.success('You have 3 new notifications')}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg relative transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-1 lg:mx-2"></div>
        
        <div 
          onClick={() => toast.success('Profile settings coming soon!')}
          className="flex items-center gap-2 sm:gap-3 pl-1 cursor-pointer group"
        >
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-900 leading-tight">Super Admin</p>
            <p className="text-xs text-slate-500">itzaqib248@gmail.com</p>
          </div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-primary/5 rounded-full flex items-center justify-center border border-slate-200 group-hover:border-primary transition-colors overflow-hidden">
            <User className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
          </div>
        </div>
      </div>
    </header>
  );
};
