import React, { useState, useMemo } from 'react';
import { MOCK_CUSTOMERS, MOCK_RIDERS } from '@/mockData';
import { formatCurrency, cn } from '@/utils';
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  createColumnHelper 
} from '@tanstack/react-table';
import { MoreHorizontal, Search } from 'lucide-react';

const columnHelper = createColumnHelper<any>();

const customerColumns = [
  columnHelper.accessor('name', {
    header: 'Customer',
    cell: info => (
      <div className="flex items-center gap-3 min-w-[180px]">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
          {info.getValue()?.charAt(0) || '?'}
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">{info.getValue() || 'Unknown'}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.row.original?.email || 'N/A'}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => <span className="text-xs font-bold text-slate-600">{info.getValue() || 'N/A'}</span>,
  }),
  columnHelper.accessor('totalOrders', {
    header: 'Orders',
    cell: info => <span className="text-sm font-black text-slate-900">{info.getValue() || 0}</span>,
  }),
  columnHelper.accessor('totalSpent', {
    header: 'Total Spent',
    cell: info => <span className="text-sm font-black text-slate-900">{formatCurrency(info.getValue() || 0)}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
          status === 'ACTIVE' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        )}>
          {status || 'UNKNOWN'}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    ),
  }),
];

const riderColumns = [
  columnHelper.accessor('name', {
    header: 'Rider',
    cell: info => (
      <div className="flex items-center gap-3 min-w-[180px]">
        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center font-black text-orange-600 text-xs">
          {info.getValue()?.charAt(0) || '?'}
        </div>
        <div>
          <p className="font-bold text-slate-900 leading-tight">{info.getValue() || 'Unknown'}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.row.original?.email || 'N/A'}</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('vehicleType', {
    header: 'Vehicle',
    cell: info => <span className="text-xs font-bold text-slate-600">{info.getValue() || 'N/A'}</span>,
  }),
  columnHelper.accessor('totalDeliveries', {
    header: 'Deliveries',
    cell: info => <span className="text-sm font-black text-slate-900">{info.getValue() || 0}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
          status === 'ONLINE' ? "bg-emerald-100 text-emerald-700" : 
          status === 'PENDING' ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
        )}>
          {status || 'OFFLINE'}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    ),
  }),
];

export const Users = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'riders'>('customers');
  const [searchQuery, setSearchQuery] = useState('');

  const data = useMemo(() => {
    const rawData = activeTab === 'customers' ? MOCK_CUSTOMERS : MOCK_RIDERS;
    return rawData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery)
    );
  }, [activeTab, searchQuery]);

  const columns = useMemo(() => {
    return activeTab === 'customers' ? customerColumns : riderColumns;
  }, [activeTab]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">User Management</h2>
          <p className="text-slate-500 text-sm">Manage platform customers and delivery riders.</p>
        </div>
      </div>

      <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit">
        <button 
          onClick={() => { setActiveTab('customers'); setSearchQuery(''); }}
          className={cn(
            "px-6 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-lg",
            activeTab === 'customers' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-primary"
          )}
        >
          Customers
        </button>
        <button 
          onClick={() => { setActiveTab('riders'); setSearchQuery(''); }}
          className={cn(
            "px-6 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-lg",
            activeTab === 'riders' ? "bg-primary text-white shadow-lg" : "text-slate-500 hover:text-primary"
          )}
        >
          Riders
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input 
          type="text" 
          placeholder={`Search ${activeTab}...`} 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-shadow"
        />
      </div>

      <div className="table-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
