# FoodieExpress Admin Portal

A comprehensive, production-grade management dashboard designed to oversee the FoodieExpress multi-vendor marketplace ecosystem. Built with a focus on performance, scalability, and a superior user experience.

## 🚀 Overview

The FoodieExpress Admin Portal is the central command center for platform administrators. It provides real-time insights into system health, facilitates vendor onboarding, manages content, and monitors the entire order lifecycle from a single, unified interface.

## ✨ Key Features

### 📊 Intelligence & Analytics
*   **Real-time Dashboard:** Track key performance indicators (KPIs) like Total Revenue, Orders, and Active Users.
*   **Interactive Charts:** Visualize growth trends and order volume using dynamic, responsive charts.

### 🏪 Vendor Ecosystem Management
*   **Vendor Onboarding:** Streamlined registration process with built-in verification workflows.
*   **Status Control:** Approve, Reject, or Suspend vendors with one click.
*   **Smart Filtering:** Filter vendor lists by status (Approved, Pending, Suspended, etc.) and instant search.

### 📦 Order Monitoring
*   **Live Tracking:** Monitor platform activity including order statuses (Pending, Preparing, Delivered, Cancelled).
*   **Detailed View:** Access order histories and payment status (Paid, Unpaid, Refunded).

### 🖼️ Content & Promotions
*   **Banner Management:** Full CRUD (Create, Read, Update, Delete) for promotional banners.
*   **Smart Notifications:** Compose and broadcast push notifications to all users or specific segments.

### 🔐 Security & Access
*   **Modern Split-Pane Login:** A secure, high-aesthetic login interface designed for enterprise access.
*   **Role-Based UI:** Optimized navigation and feedback systems tailored for administrative efficiency.

## 🛠️ Tech Stack

*   **Frontend Framework:** React 19 + TypeScript
*   **Build Tool:** Vite 6
*   **Styling:** Tailwind CSS 4
*   **State Management:** React Hooks
*   **Data Tables:** TanStack Table (React Table v8)
*   **Charts:** Recharts
*   **Icons:** Lucide React
*   **Forms & Validation:** Formik + Yup
*   **Animations:** Motion (Framer Motion)
*   **Notifications:** React Hot Toast
*   **Routing:** React Router v7

## 📂 Folder Structure

```text
src/
├── components/     # Reusable UI components (Layout, Sidebar, Topbar, etc.)
├── pages/          # Full page layouts (Dashboard, Vendors, Orders, Login, etc.)
├── services/       # API and external service integrations
├── lib/            # Shared logic and utilities
├── types.ts        # Global TypeScript definitions
├── mockData.ts     # Platform seed data for development
└── main.tsx        # Application entry point
```

## ⚙️ Getting Started

### Prerequisites
*   Node.js (LTS recommended)
*   npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To create an optimized production build:
```bash
npm run build
```

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel** or any static hosting provider.
*   **Build Command:** `npm run build`
*   **Output Directory:** `dist`
*   **Routing:** Uses `HashRouter` to ensure perfect compatibility with direct URL access on static hosts.

---
© 2024 FoodieExpress. All Rights Reserved.
