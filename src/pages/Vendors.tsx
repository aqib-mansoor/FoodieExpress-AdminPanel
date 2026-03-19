import React, { useState, useMemo } from 'react';
import { MOCK_VENDORS } from '@/mockData';
import { Vendor } from '@/types';
import { formatCurrency, cn } from '@/utils';
import { 
  flexRender, 
  getCoreRowModel, 
  useReactTable,
  createColumnHelper 
} from '@tanstack/react-table';
import { MoreHorizontal, Star, CheckCircle2, XCircle, Clock, AlertCircle, Plus, Search, X, FileText, MapPin, Store, User, Mail, Phone } from 'lucide-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const columnHelper = createColumnHelper<any>();

const VendorSchema = Yup.object().shape({
  storeName: Yup.string().required('Required'),
  ownerName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  cnic: Yup.string().matches(/^\d{5}-\d{7}-\d{1}$/, 'Invalid CNIC (Format: 12345-1234567-1)').required('Required'),
  address: Yup.string().required('Required'),
});

export const Vendors = () => {
  const [vendors, setVendors] = useState(MOCK_VENDORS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStatus = (vendorId: string, newStatus: Vendor['status']) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, status: newStatus } : v));
    toast.success(`Vendor status updated to ${newStatus}`);
  };

  const filteredData = useMemo(() => {
    return vendors.filter(vendor => {
      const matchesSearch = 
        vendor.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'ALL' || vendor.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [vendors, searchQuery, statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: useMemo(() => [
      columnHelper.accessor('storeName', {
        header: 'Store Name',
        cell: info => (
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm">
              {info.getValue()?.charAt(0) || '?'}
            </div>
            <div>
              <p className="font-bold text-slate-900 leading-tight">{info.getValue() || 'Unknown'}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{info.row.original?.category || 'N/A'}</p>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('ownerName', {
        header: 'Owner',
        cell: info => <span className="text-sm font-medium text-slate-600">{info.getValue() || 'Unknown'}</span>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          return (
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
              status === 'APPROVED' ? "bg-emerald-100 text-emerald-700" :
              status === 'PENDING' ? "bg-amber-100 text-amber-700" :
              status === 'REJECTED' ? "bg-red-100 text-red-700" :
              "bg-slate-100 text-slate-700"
            )}>
              {status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
              {status === 'PENDING' && <Clock className="w-3 h-3" />}
              {status === 'REJECTED' && <XCircle className="w-3 h-3" />}
              {status === 'SUSPENDED' && <AlertCircle className="w-3 h-3" />}
              {status}
            </div>
          );
        },
      }),
      columnHelper.accessor('rating', {
        header: 'Rating',
        cell: info => (
          <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
            <Star className="w-4 h-4 fill-current" />
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor('revenue', {
        header: 'Revenue',
        cell: info => <span className="text-sm font-black text-slate-900">{formatCurrency(info.getValue() || 0)}</span>,
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => {
          const vendor = info.row.original;
          return (
            <div className="flex items-center gap-1">
              {vendor.status === 'PENDING' && (
                <>
                  <button 
                    onClick={() => handleUpdateStatus(vendor.id, 'APPROVED')}
                    className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                    title="Approve"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(vendor.id, 'REJECTED')}
                    className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </>
              )}
              {vendor.status === 'APPROVED' && (
                <button 
                  onClick={() => handleUpdateStatus(vendor.id, 'SUSPENDED')}
                  className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-lg transition-colors"
                  title="Suspend"
                >
                  <AlertCircle className="w-4 h-4" />
                </button>
              )}
              {vendor.status === 'SUSPENDED' && (
                <button 
                  onClick={() => handleUpdateStatus(vendor.id, 'APPROVED')}
                  className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors"
                  title="Re-activate"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => toast.success('Vendor details coming soon!')}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          );
        },
      }),
    ], [handleUpdateStatus]),
    getCoreRowModel: useMemo(() => getCoreRowModel(), []),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Vendor Management</h2>
          <p className="text-slate-500 text-sm">Manage and verify platform vendors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search vendors by store, owner or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-shadow"
          />
        </div>
        
        <div className="flex items-center gap-2 min-w-[200px]">
          <label htmlFor="status-filter" className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Filter Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-shadow appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      <div className="table-container overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-slate-100">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="text-left py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-4 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No vendors found matching your search.</p>
          </div>
        )}
      </div>

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            <div className="bg-primary p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-tight">Register New Vendor</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Verification Required</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8">
              <Formik
                initialValues={{
                  storeName: '',
                  ownerName: '',
                  email: '',
                  phone: '',
                  category: '',
                  cnic: '',
                  address: '',
                }}
                validationSchema={VendorSchema}
                onSubmit={(values) => {
                  const newVendor = {
                    ...values,
                    id: `v${vendors.length + 1}`,
                    status: 'PENDING',
                    commissionRate: 15,
                    rating: 0,
                    totalOrders: 0,
                    revenue: 0,
                    joinedAt: new Date().toISOString().split('T')[0],
                  };
                  setVendors([newVendor as any, ...vendors]);
                  setIsModalOpen(false);
                  toast.success('Vendor registered! Verification process started.');
                }}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Plus className="w-3 h-3" /> Store Name
                        </label>
                        <Field 
                          name="storeName" 
                          placeholder="e.g. Karachi Biryani"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.storeName && touched.storeName ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.storeName && touched.storeName && <p className="text-[10px] text-red-500 font-bold">{errors.storeName}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Owner Name
                        </label>
                        <Field 
                          name="ownerName" 
                          placeholder="Full Name"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.ownerName && touched.ownerName ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.ownerName && touched.ownerName && <p className="text-[10px] text-red-500 font-bold">{errors.ownerName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Email Address
                        </label>
                        <Field 
                          name="email" 
                          type="email"
                          placeholder="owner@example.com"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.email && touched.email ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.email && touched.email && <p className="text-[10px] text-red-500 font-bold">{errors.email}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Phone Number
                        </label>
                        <Field 
                          name="phone" 
                          placeholder="+92 300 1234567"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.phone && touched.phone ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.phone && touched.phone && <p className="text-[10px] text-red-500 font-bold">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Category
                        </label>
                        <Field 
                          name="category" 
                          placeholder="e.g. Fast Food, Desi"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.category && touched.category ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.category && touched.category && <p className="text-[10px] text-red-500 font-bold">{errors.category}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <FileText className="w-3 h-3" /> CNIC Number
                        </label>
                        <Field 
                          name="cnic" 
                          placeholder="12345-1234567-1"
                          className={cn(
                            "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all", 
                            errors.cnic && touched.cnic ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                          )} 
                        />
                        {errors.cnic && touched.cnic && <p className="text-[10px] text-red-500 font-bold">{errors.cnic}</p>}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <MapPin className="w-3 h-3" /> Store Address
                      </label>
                      <Field 
                        name="address" 
                        as="textarea"
                        placeholder="Full physical address of the store"
                        className={cn(
                          "w-full px-4 py-3 bg-slate-50 border rounded-xl text-sm font-bold outline-none transition-all min-h-[80px]", 
                          errors.address && touched.address ? "border-red-500 focus:ring-red-50" : "border-slate-200 focus:ring-primary/5 focus:border-primary"
                        )} 
                      />
                      {errors.address && touched.address && <p className="text-[10px] text-red-500 font-bold">{errors.address}</p>}
                    </div>
                    
                    <div className="pt-4 flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-4 px-6 rounded-2xl font-black uppercase tracking-widest text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="flex-[2] btn-primary py-4"
                      >
                        Submit for Verification
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

