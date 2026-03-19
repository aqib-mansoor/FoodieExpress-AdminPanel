import React, { useState, useMemo } from 'react';
import { MOCK_DISPUTES } from '@/mockData';
import { cn } from '@/utils';
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  createColumnHelper 
} from '@tanstack/react-table';
import { MoreHorizontal, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const columnHelper = createColumnHelper<any>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => <span className="font-black text-primary text-xs">#{info.getValue()}</span>,
  }),
  columnHelper.accessor('customerName', {
    header: 'Customer',
    cell: info => <span className="text-sm font-bold text-slate-600">{info.getValue()}</span>,
  }),
  columnHelper.accessor('vendorName', {
    header: 'Vendor',
    cell: info => <span className="text-sm font-black text-slate-900">{info.getValue()}</span>,
  }),
  columnHelper.accessor('reason', {
    header: 'Reason',
    cell: info => <span className="text-xs font-medium text-slate-400 truncate max-w-[150px] block">{info.getValue()}</span>,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: info => {
      const priority = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
          priority === 'HIGH' || priority === 'URGENT' ? "bg-red-100 text-red-700" :
          priority === 'MEDIUM' ? "bg-amber-100 text-amber-700" :
          "bg-blue-100 text-blue-700"
        )}>
          {priority}
        </div>
      );
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => {
      const status = info.getValue();
      return (
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
          status === 'RESOLVED' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        )}>
          {status}
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600" title="Resolve">
          <CheckCircle className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Chat">
          <MessageSquare className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    ),
  }),
];

export const Disputes = () => {
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);

  const handleResolve = (id: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: 'RESOLVED' } : d));
    toast.success(`Dispute #${id} marked as resolved!`);
  };

  const tableColumns = useMemo(() => [
    ...columns.slice(0, -1),
    columnHelper.display({
      id: 'actions',
      cell: info => {
        const dispute = info.row.original;
        return (
          <div className="flex items-center gap-1">
            {dispute.status !== 'RESOLVED' && (
              <button 
                onClick={() => handleResolve(dispute.id)}
                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors text-emerald-600" 
                title="Resolve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600" title="Chat">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        );
      },
    }),
  ], [disputes]);

  const table = useReactTable({
    data: disputes,
    columns: tableColumns,
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Dispute Management</h2>
          <p className="text-slate-500 text-sm">Conflict resolution and refund handling.</p>
        </div>
        <div className="flex items-center gap-3 bg-red-50 text-red-700 px-4 py-2 rounded-xl border border-red-100">
          <AlertTriangle className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">3 Urgent Issues</span>
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
