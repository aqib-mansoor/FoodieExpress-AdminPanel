export type UserRole = 'SUPER_ADMIN' | 'FINANCE_ADMIN' | 'VENDOR_MANAGER' | 'SUPPORT_ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface Vendor {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  commissionRate: number;
  rating: number;
  totalOrders: number;
  revenue: number;
  joinedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'ACTIVE' | 'BLOCKED';
  joinedAt: string;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: 'BIKE' | 'BICYCLE' | 'CAR';
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'OFFLINE' | 'ONLINE';
  rating: number;
  totalDeliveries: number;
  joinedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  vendorName: string;
  riderName?: string;
  amount: number;
  status: 'PENDING' | 'PREPARING' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentStatus: 'PAID' | 'UNPAID' | 'REFUNDED';
  createdAt: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  customerName: string;
  vendorName: string;
  reason: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeVendors: number;
  activeCustomers: number;
  revenueGrowth: number;
  orderGrowth: number;
}
