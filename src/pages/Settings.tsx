import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Save, Globe, Shield, Percent } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const SettingsSchema = Yup.object().shape({
  platformName: Yup.string().required('Required'),
  commissionRate: Yup.number().min(0).max(100).required('Required'),
  deliveryFeeBase: Yup.number().min(0).required('Required'),
  supportEmail: Yup.string().email('Invalid email').required('Required'),
});

export const Settings = () => {
  return (
    <div className="max-w-4xl space-y-6 lg:space-y-8">
      <div>
        <h2 className="text-2xl lg:text-3xl font-black text-primary">Platform Settings</h2>
        <p className="text-slate-500 text-sm">Global parameters and business rules.</p>
      </div>

      <Formik
        initialValues={{
          platformName: 'FoodieExpress',
          commissionRate: 15,
          deliveryFeeBase: 2.50,
          supportEmail: 'support@foodieexpress.com',
          maintenanceMode: false,
          autoApproveVendors: false,
        }}
        validationSchema={SettingsSchema}
        onSubmit={(values) => {
          console.log(values);
          toast.success('Settings updated successfully!');
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight mb-2">
                  <Globe className="w-5 h-5 text-primary" />
                  General
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Platform Name</label>
                  <Field 
                    name="platformName" 
                    className={cn(
                      "w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                      errors.platformName && touched.platformName ? "border-red-500" : "border-slate-200"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Support Email</label>
                  <Field 
                    name="supportEmail" 
                    className={cn(
                      "w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                      errors.supportEmail && touched.supportEmail ? "border-red-500" : "border-slate-200"
                    )}
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight mb-2">
                  <Percent className="w-5 h-5 text-orange-500" />
                  Business
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Commission Rate (%)</label>
                  <Field 
                    name="commissionRate" 
                    type="number"
                    className={cn(
                      "w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                      errors.commissionRate && touched.commissionRate ? "border-red-500" : "border-slate-200"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Delivery Fee ($)</label>
                  <Field 
                    name="deliveryFeeBase" 
                    type="number"
                    step="0.01"
                    className={cn(
                      "w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                      errors.deliveryFeeBase && touched.deliveryFeeBase ? "border-red-500" : "border-slate-200"
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-slate-900 font-black uppercase tracking-tight mb-4">
                <Shield className="w-5 h-5 text-violet-500" />
                System
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <Field type="checkbox" name="maintenanceMode" className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Maintenance Mode</p>
                    <p className="text-xs font-bold text-slate-400">Disable customer app access.</p>
                  </div>
                </label>

                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center">
                    <Field type="checkbox" name="autoApproveVendors" className="w-5 h-5 rounded-md border-slate-300 text-primary focus:ring-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Auto-approve Vendors</p>
                    <p className="text-xs font-bold text-slate-400">Skip manual verification workflow.</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                className="btn-primary w-full sm:w-auto px-10 py-4 shadow-xl shadow-primary/20"
              >
                <Save className="w-5 h-5" />
                Save Platform Config
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
