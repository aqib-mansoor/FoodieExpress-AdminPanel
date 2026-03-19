import React, { useState, useMemo } from 'react';
import { MOCK_ORDERS } from '@/mockData';
import { formatCurrency, cn } from '@/utils';
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  createColumnHelper 
} from '@tanstack/react-table';
import { MoreHorizontal, Search, Filter } from 'lucide-react';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('orderNumber', {
    header: 'Order ID',
    cell: info => <span className="font-black text-primary text-sm">{info.getValue()}</span>,
  }),
  columnHelper.accessor('customerName', {
    header: 'Customer',
    cell: info => <span className="text-sm font-bold text-slate-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor('vendorName', {
    header: 'Vendor',
    cell: info => <span className="text-sm font-black text-slate-900">{info.getValue()}</span>,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
          status === 'DELIVERED' ? "bg-emerald-100 text-emerald-700" :
          status === 'CANCELLED' ? "bg-red-100 text-red-700" :
          "bg-blue-100 text-blue-700"
        )}>
          {status}
        </div>
      );
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: info => <span className="text-sm font-black text-slate-900">{formatCurrency(info.getValue())}</span>,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date',
    cell: info => <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.getValue()}</span>,
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

export const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  const filteredData = useMemo(() => {
    return MOCK_ORDERS.filter(order => {
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Order Monitoring</h2>
          <p className="text-slate-500 text-sm">Real-time tracking of platform activity.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Customer, or Vendor..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-2 min-w-[180px]">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-shadow appearance-none cursor-pointer uppercase tracking-widest"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PREPARING">Preparing</option>
          </select>
        </div>
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
