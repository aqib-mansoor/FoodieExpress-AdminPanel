import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Store, 
  Users 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { MOCK_STATS, REVENUE_CHART_DATA, REVENUE_CHART_DATA_MONTHLY, MOCK_ORDERS } from '@/mockData';
import { formatCurrency, cn } from '@/utils';
import { motion } from 'motion/react';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }: any) => (
  <div 
    className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm card-hover"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-xl text-white shadow-lg", colorClass)}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
        trend === 'up' ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
      )}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {trendValue}%
      </div>
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
    <h3 className="text-xl lg:text-2xl font-black text-slate-900 mt-1">{value}</h3>
  </div>
);

export const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '1Y'>('7D');

  const chartData = useMemo(() => {
    return timeRange === '7D' 
      ? REVENUE_CHART_DATA 
      : timeRange === '30D' 
        ? REVENUE_CHART_DATA 
        : REVENUE_CHART_DATA_MONTHLY;
  }, [timeRange]);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Dashboard Overview</h2>
          <p className="text-slate-500 text-sm">Platform health and performance metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Last Updated:</span>
          <span className="text-xs font-bold text-primary">Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(MOCK_STATS.totalRevenue)} 
          icon={DollarSign} 
          trend="up" 
          trendValue={MOCK_STATS.revenueGrowth}
          colorClass="bg-primary"
        />
        <StatCard 
          title="Total Orders" 
          value={MOCK_STATS.totalOrders.toLocaleString()} 
          icon={ShoppingBag} 
          trend="up" 
          trendValue={MOCK_STATS.orderGrowth}
          colorClass="bg-emerald-500"
        />
        <StatCard 
          title="Active Vendors" 
          value={MOCK_STATS.activeVendors} 
          icon={Store} 
          trend="up" 
          trendValue={5.4}
          colorClass="bg-orange-500"
        />
        <StatCard 
          title="Active Customers" 
          value={MOCK_STATS.activeCustomers.toLocaleString()} 
          icon={Users} 
          trend="down" 
          trendValue={1.2}
          colorClass="bg-violet-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-black text-slate-900 uppercase tracking-tight">Revenue Analytics</h3>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setTimeRange('7D')}
                className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", timeRange === '7D' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary")}
              >
                7D
              </button>
              <button 
                onClick={() => setTimeRange('30D')}
                className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", timeRange === '30D' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary")}
              >
                30D
              </button>
              <button 
                onClick={() => setTimeRange('1Y')}
                className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", timeRange === '1Y' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary")}
              >
                1Y
              </button>
            </div>
          </div>
          <div className="h-[250px] lg:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#27187E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#27187E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#27187E" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 lg:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-black text-slate-900 mb-6 uppercase tracking-tight">Recent Orders</h3>
          <div className="space-y-3">
            {MOCK_ORDERS.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                  {order.vendorName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{order.vendorName}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{formatCurrency(order.amount)}</p>
                  <p className={cn(
                    "text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md mt-1",
                    order.status === 'DELIVERED' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                  )}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-black text-primary hover:bg-primary/5 border border-primary/10 rounded-xl transition-all uppercase tracking-widest">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};
