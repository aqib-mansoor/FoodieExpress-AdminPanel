import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Edit3, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { cn } from '@/utils';

const INITIAL_BANNERS = [
  { id: 1, title: 'Ramadan Special', image: 'https://picsum.photos/seed/ramadan/1200/400', status: 'ACTIVE' },
  { id: 2, title: 'Free Delivery Weekend', image: 'https://picsum.photos/seed/delivery/1200/400', status: 'ACTIVE' },
  { id: 3, title: 'New Vendor: Butt Karahi', image: 'https://picsum.photos/seed/food/1200/400', status: 'INACTIVE' },
];

export const ContentManagement = () => {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  const handleDeleteBanner = (id: number) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    toast.success('Banner deleted successfully');
  };

  const handleSaveBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const image = formData.get('image') as string;
    const status = formData.get('status') as string;

    if (editingBanner) {
      setBanners(prev => prev.map(b => b.id === editingBanner.id ? { ...b, title, image, status } : b));
      toast.success('Banner updated successfully');
    } else {
      const newBanner = {
        id: Math.max(...banners.map(b => b.id), 0) + 1,
        title,
        image: image || `https://picsum.photos/seed/${Math.random()}/1200/400`,
        status
      };
      setBanners(prev => [...prev, newBanner]);
      toast.success('New banner added successfully');
    }
    setIsBannerModalOpen(false);
    setEditingBanner(null);
  };

  const handleSendNotification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Push notification sent to all users!');
    setIsNotificationModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-primary">Content Management</h2>
          <p className="text-slate-500 text-sm">Manage app banners, promotions, and notifications.</p>
        </div>
        <button 
          className="btn-primary w-full sm:w-auto" 
          onClick={() => {
            setEditingBanner(null);
            setIsBannerModalOpen(true);
          }}
        >
          <Plus className="w-5 h-5" />
          Add New Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
            <div className="aspect-[3/1] relative overflow-hidden">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg",
                  banner.status === 'ACTIVE' ? "bg-emerald-500 text-white" : "bg-slate-500 text-white"
                )}>
                  {banner.status}
                </span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900">{banner.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Banner ID: #{banner.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setEditingBanner(banner);
                    setIsBannerModalOpen(true);
                  }}
                  className="p-2 hover:bg-primary/5 text-primary rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteBanner(banner.id)}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg mb-4">
          <ImageIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">Push Notifications</h3>
        <p className="text-slate-500 text-sm max-w-md mt-2">Send real-time alerts to all customers or specific segments about new deals and offers.</p>
        <button 
          onClick={() => setIsNotificationModalOpen(true)}
          className="btn-primary mt-6 px-8"
        >
          Compose Notification
        </button>
      </div>

      {/* Banner Modal */}
      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-primary p-6 flex items-center justify-between">
              <h3 className="text-white font-black uppercase tracking-tight">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h3>
              <button onClick={() => setIsBannerModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSaveBanner} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banner Title</label>
                <input 
                  name="title" 
                  defaultValue={editingBanner?.title}
                  required
                  placeholder="e.g. Summer Sale 2024"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image URL (Optional)</label>
                <input 
                  name="image" 
                  defaultValue={editingBanner?.image}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                <select 
                  name="status" 
                  defaultValue={editingBanner?.status || 'ACTIVE'}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all appearance-none"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <button type="submit" className="w-full btn-primary py-4 mt-4">
                {editingBanner ? 'Update Banner' : 'Publish Banner'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-primary p-6 flex items-center justify-between">
              <h3 className="text-white font-black uppercase tracking-tight">Compose Notification</h3>
              <button onClick={() => setIsNotificationModalOpen(false)} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSendNotification} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
                <input 
                  required
                  placeholder="e.g. Flash Sale Alert! ⚡"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type your notification message here..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-primary transition-all resize-none"
                />
              </div>
              <button type="submit" className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Notification
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
