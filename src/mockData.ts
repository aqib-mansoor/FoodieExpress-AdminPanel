import { Vendor, Customer, Rider, Order, Dispute, DashboardStats } from './types';

export const MOCK_STATS: DashboardStats = {
  totalRevenue: 1254300,
  totalOrders: 8432,
  activeVendors: 142,
  activeCustomers: 12504,
  revenueGrowth: 12.5,
  orderGrowth: 8.2,
};

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'v1',
    storeName: 'Savour Foods',
    ownerName: 'Mohammad Ahmed',
    email: 'savour@example.pk',
    phone: '+92 300 1234567',
    category: 'Pulao Kabab',
    status: 'APPROVED',
    commissionRate: 15,
    rating: 4.8,
    totalOrders: 5240,
    revenue: 8500000,
    joinedAt: '2023-01-15',
  },
  {
    id: 'v2',
    storeName: 'Bundu Khan',
    ownerName: 'Zubair Khan',
    email: 'bundukhan@example.pk',
    phone: '+92 321 7654321',
    category: 'BBQ',
    status: 'PENDING',
    commissionRate: 18,
    rating: 4.5,
    totalOrders: 1450,
    revenue: 4200000,
    joinedAt: '2024-02-10',
  },
  {
    id: 'v3',
    storeName: 'Student Biryani',
    ownerName: 'Aslam Pervez',
    email: 'student@example.pk',
    phone: '+92 333 9876543',
    category: 'Biryani',
    status: 'APPROVED',
    commissionRate: 12,
    rating: 4.2,
    totalOrders: 8900,
    revenue: 12400000,
    joinedAt: '2023-05-20',
  },
  {
    id: 'v4',
    storeName: 'Butt Karahi',
    ownerName: 'Hamza Butt',
    email: 'butt@example.pk',
    phone: '+92 345 1122334',
    category: 'Karahi',
    status: 'APPROVED',
    commissionRate: 15,
    rating: 4.7,
    totalOrders: 3200,
    revenue: 9500000,
    joinedAt: '2023-08-12',
  },
  {
    id: 'v5',
    storeName: 'Gourmet Bakers',
    ownerName: 'Chaudhry Nawaz',
    email: 'gourmet@example.pk',
    phone: '+92 312 5556667',
    category: 'Bakery',
    status: 'APPROVED',
    commissionRate: 10,
    rating: 4.6,
    totalOrders: 12000,
    revenue: 15000000,
    joinedAt: '2022-11-05',
  },
  {
    id: 'v6',
    storeName: 'Salt\'n Pepper',
    ownerName: 'Mahmood Akbar',
    email: 'snp@example.pk',
    phone: '+92 301 4445556',
    category: 'Fine Dining',
    status: 'APPROVED',
    commissionRate: 20,
    rating: 4.9,
    totalOrders: 4500,
    revenue: 18000000,
    joinedAt: '2023-03-20',
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Ali Raza', email: 'ali@example.pk', phone: '+92 300 1112223', totalOrders: 15, totalSpent: 45000, status: 'ACTIVE', joinedAt: '2023-03-12' },
  { id: 'c2', name: 'Fatima Zahra', email: 'fatima@example.pk', phone: '+92 321 4445556', totalOrders: 8, totalSpent: 12000, status: 'ACTIVE', joinedAt: '2023-08-05' },
  { id: 'c3', name: 'Usman Sheikh', email: 'usman@example.pk', phone: '+92 333 7778889', totalOrders: 22, totalSpent: 65000, status: 'ACTIVE', joinedAt: '2023-01-20' },
  { id: 'c4', name: 'Zainab Bibi', email: 'zainab@example.pk', phone: '+92 345 9990001', totalOrders: 5, totalSpent: 8500, status: 'ACTIVE', joinedAt: '2024-01-15' },
  { id: 'c5', name: 'Bilal Khan', email: 'bilal@example.pk', phone: '+92 301 2223334', totalOrders: 12, totalSpent: 32000, status: 'ACTIVE', joinedAt: '2023-11-10' },
  { id: 'c6', name: 'Ayesha Malik', email: 'ayesha@example.pk', phone: '+92 322 5556667', totalOrders: 3, totalSpent: 4500, status: 'BLOCKED', joinedAt: '2024-02-01' },
  { id: 'c7', name: 'Omer Farooq', email: 'omer@example.pk', phone: '+92 334 8889990', totalOrders: 18, totalSpent: 54000, status: 'ACTIVE', joinedAt: '2023-06-25' },
  { id: 'c8', name: 'Sana Javed', email: 'sana@example.pk', phone: '+92 346 1112225', totalOrders: 7, totalSpent: 15000, status: 'ACTIVE', joinedAt: '2023-09-30' },
  { id: 'c9', name: 'Imran Abbas', email: 'imran@example.pk', phone: '+92 302 3334445', totalOrders: 10, totalSpent: 25000, status: 'ACTIVE', joinedAt: '2023-12-05' },
  { id: 'c10', name: 'Mahira Khan', email: 'mahira@example.pk', phone: '+92 323 6667778', totalOrders: 4, totalSpent: 9000, status: 'ACTIVE', joinedAt: '2024-02-15' },
];

export const MOCK_RIDERS: Rider[] = [
  { id: 'r1', name: 'Kamran Akmal', email: 'kamran@rider.pk', phone: '+92 300 0001112', vehicleType: 'BIKE', status: 'ONLINE', rating: 4.8, totalDeliveries: 450, joinedAt: '2023-02-15' },
  { id: 'r2', name: 'Shoaib Malik', email: 'shoaib@rider.pk', phone: '+92 321 0002223', vehicleType: 'BIKE', status: 'ONLINE', rating: 4.5, totalDeliveries: 320, joinedAt: '2023-05-10' },
  { id: 'r3', name: 'Babar Azam', email: 'babar@rider.pk', phone: '+92 333 0003334', vehicleType: 'BIKE', status: 'OFFLINE', rating: 4.9, totalDeliveries: 890, joinedAt: '2022-12-01' },
  { id: 'r4', name: 'Shaheen Afridi', email: 'shaheen@rider.pk', phone: '+92 345 0004445', vehicleType: 'BIKE', status: 'ONLINE', rating: 4.7, totalDeliveries: 150, joinedAt: '2024-01-20' },
  { id: 'r5', name: 'Rizwan Ahmed', email: 'rizwan@rider.pk', phone: '+92 301 0005556', vehicleType: 'BICYCLE', status: 'PENDING', rating: 0, totalDeliveries: 0, joinedAt: '2024-03-01' },
  { id: 'r6', name: 'Shadab Khan', email: 'shadab@rider.pk', phone: '+92 322 0006667', vehicleType: 'BIKE', status: 'ONLINE', rating: 4.6, totalDeliveries: 210, joinedAt: '2023-10-15' },
  { id: 'r7', name: 'Hasan Ali', email: 'hasan@rider.pk', phone: '+92 334 0007778', vehicleType: 'BIKE', status: 'ONLINE', rating: 4.4, totalDeliveries: 180, joinedAt: '2023-11-20' },
  { id: 'r8', name: 'Fakhar Zaman', email: 'fakhar@rider.pk', phone: '+92 346 0008889', vehicleType: 'BIKE', status: 'OFFLINE', rating: 4.7, totalDeliveries: 250, joinedAt: '2023-08-10' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'o1', orderNumber: 'ORD-1001', customerName: 'Ali Raza', vendorName: 'Savour Foods', riderName: 'Kamran Akmal', amount: 1550, status: 'DELIVERED', paymentStatus: 'PAID', createdAt: '2024-03-18 14:30' },
  { id: 'o2', orderNumber: 'ORD-1002', customerName: 'Fatima Zahra', vendorName: 'Bundu Khan', riderName: 'Shoaib Malik', amount: 3200, status: 'PREPARING', paymentStatus: 'PAID', createdAt: '2024-03-19 10:15' },
  { id: 'o3', orderNumber: 'ORD-1003', customerName: 'Usman Sheikh', vendorName: 'Student Biryani', riderName: 'Shaheen Afridi', amount: 850, status: 'PICKED_UP', paymentStatus: 'PAID', createdAt: '2024-03-19 11:45' },
  { id: 'o4', orderNumber: 'ORD-1004', customerName: 'Zainab Bibi', vendorName: 'Butt Karahi', riderName: 'Shadab Khan', amount: 2400, status: 'DELIVERED', paymentStatus: 'PAID', createdAt: '2024-03-18 20:00' },
  { id: 'o5', orderNumber: 'ORD-1005', customerName: 'Bilal Khan', vendorName: 'Savour Foods', riderName: 'Kamran Akmal', amount: 1200, status: 'CANCELLED', paymentStatus: 'REFUNDED', createdAt: '2024-03-17 13:00' },
  { id: 'o6', orderNumber: 'ORD-1006', customerName: 'Ayesha Malik', vendorName: 'Gourmet Bakers', riderName: 'Hasan Ali', amount: 950, status: 'DELIVERED', paymentStatus: 'PAID', createdAt: '2024-03-19 12:30' },
  { id: 'o7', orderNumber: 'ORD-1007', customerName: 'Omer Farooq', vendorName: 'Salt\'n Pepper', riderName: 'Fakhar Zaman', amount: 4500, status: 'PREPARING', paymentStatus: 'PAID', createdAt: '2024-03-19 13:15' },
];


export const MOCK_DISPUTES: Dispute[] = [
  { id: 'd1', orderId: 'o1', customerName: 'Ali Raza', vendorName: 'Savour Foods', reason: 'Missing items in the order', status: 'OPEN', priority: 'HIGH', createdAt: '2024-03-18 15:00' },
  { id: 'd2', orderId: 'o4', customerName: 'Zainab Bibi', vendorName: 'Butt Karahi', reason: 'Food was cold', status: 'IN_PROGRESS', priority: 'MEDIUM', createdAt: '2024-03-19 09:30' },
];

export const REVENUE_CHART_DATA = [
  { name: 'Mon', revenue: 45000, orders: 24 },
  { name: 'Tue', revenue: 38000, orders: 19 },
  { name: 'Wed', revenue: 52000, orders: 28 },
  { name: 'Thu', revenue: 41000, orders: 21 },
  { name: 'Fri', revenue: 65000, orders: 35 },
  { name: 'Sat', revenue: 89000, orders: 48 },
  { name: 'Sun', revenue: 72000, orders: 40 },
];

export const REVENUE_CHART_DATA_MONTHLY = [
  { name: 'Jan', revenue: 1200000, orders: 650 },
  { name: 'Feb', revenue: 1100000, orders: 590 },
  { name: 'Mar', revenue: 1400000, orders: 720 },
  { name: 'Apr', revenue: 1300000, orders: 680 },
  { name: 'May', revenue: 1500000, orders: 810 },
  { name: 'Jun', revenue: 1600000, orders: 850 },
  { name: 'Jul', revenue: 1700000, orders: 920 },
  { name: 'Aug', revenue: 1550000, orders: 840 },
  { name: 'Sep', revenue: 1450000, orders: 780 },
  { name: 'Oct', revenue: 1650000, orders: 890 },
  { name: 'Nov', revenue: 1800000, orders: 950 },
  { name: 'Dec', revenue: 2100000, orders: 1100 },
];

export const MOCK_PAYOUTS = [
  { id: 'p1', vendor: 'Savour Foods', amount: 45000, status: 'PROCESSED', date: '2024-03-15' },
  { id: 'p2', vendor: 'Bundu Khan', amount: 28000, status: 'PENDING', date: '2024-03-18' },
  { id: 'p3', vendor: 'Student Biryani', amount: 32000, status: 'PROCESSED', date: '2024-03-12' },
];
