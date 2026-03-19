import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Vendors } from './pages/Vendors';
import { Orders } from './pages/Orders';
import { Users } from './pages/Users';
import { Financials } from './pages/Financials';
import { Disputes } from './pages/Disputes';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/Analytics';
import { ContentManagement } from './pages/ContentManagement';
import { Login } from './pages/Login';
import toast, { Toaster } from 'react-hot-toast';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuth', 'true');
    toast.success('Welcome back, Admin!');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuth');
    toast.success('Logged out successfully');
  };

  return (
    <Router>
      <ScrollToTop />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#27187E',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '14px',
          },
        }}
      />
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="orders" element={<Orders />} />
          <Route path="financials" element={<Financials />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="content" element={<ContentManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}


