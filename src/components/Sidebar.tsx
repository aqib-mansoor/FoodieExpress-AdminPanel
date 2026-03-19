import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Settings, 
  ShieldAlert, 
  Image as ImageIcon,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '@/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Store, label: 'Vendors', path: '/vendors' },
  { icon: ShoppingBag, label: 'Orders', path: '/orders' },
  { icon: Wallet, label: 'Financials', path: '/financials' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: ShieldAlert, label: 'Disputes', path: '/disputes' },
  { icon: ImageIcon, label: 'Content', path: '/content' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, onClose, onLogout }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed lg:sticky top-0 left-0 w-64 h-screen bg-primary text-slate-100 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-xl shadow-lg">
              F
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">FoodieExpress</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                isActive 
                  ? "bg-white/10 text-white font-medium shadow-sm" 
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                "group-hover:text-white"
              )} />
              <span className="text-sm">{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-slate-300 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
