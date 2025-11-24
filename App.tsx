
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MerchantAuthProvider, useMerchantAuth } from './contexts/MerchantAuthContext';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import { Header } from './components/Header';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import TransactionsPage from './pages/TransactionsPage';
import PartnersPage from './pages/PartnersPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReferralPage from './pages/ReferralPage';
import PartnerDetailPage from './pages/PartnerDetailPage';
import OfferDetailPage from './pages/OfferDetailPage';

// Merchant Pages
import MerchantLoginPage from './pages/MerchantLoginPage';
import MerchantRegisterPage from './pages/MerchantRegisterPage';
import MerchantDashboard from './pages/MerchantDashboard';
import MerchantProductsPage from './pages/MerchantProductsPage';
import MerchantProductCreatePage from './pages/MerchantProductCreatePage';
import MerchantCustomersPage from './pages/MerchantCustomersPage';
import MerchantSearchUsersPage from './pages/MerchantSearchUsersPage';
import MerchantOffersPage from './pages/MerchantOffersPage';
import MerchantOfferCreatePage from './pages/MerchantOfferCreatePage';
import MerchantProfilePage from './pages/MerchantProfilePage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const MerchantProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useMerchantAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/merchant/login" />;
};

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { isAuthenticated: isMerchantAuthenticated } = useMerchantAuth();
  const location = useLocation();
  
  // Verificar se a rota atual é do lojista ou admin
  const isMerchantRoute = location.pathname.startsWith('/merchant');
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Só exibir Header e BottomNav se for cliente autenticado e NÃO for rota do lojista ou admin
  const showCustomerUI = isAuthenticated && !isMerchantRoute && !isAdminRoute;

  return (
    <div className="w-full bg-white font-sans min-h-screen">
      {showCustomerUI && <Header />}
      <div className={`min-h-screen ${showCustomerUI ? 'pb-24' : ''}`}>
        <Routes>
          {/* Customer Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
          } />
          <Route path="/partners" element={
            <ProtectedRoute>
              <PartnersPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/referral" element={
            <ProtectedRoute>
              <ReferralPage />
            </ProtectedRoute>
          } />
          <Route path="/partners/:id" element={
            <ProtectedRoute>
              <PartnerDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/offers/:id" element={
            <ProtectedRoute>
              <OfferDetailPage />
            </ProtectedRoute>
          } />

          {/* Merchant Routes */}
          <Route path="/merchant/login" element={<MerchantLoginPage />} />
          <Route path="/merchant/register" element={<MerchantRegisterPage />} />
          <Route path="/merchant/dashboard" element={
            <MerchantProtectedRoute>
              <MerchantDashboard />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/products" element={
            <MerchantProtectedRoute>
              <MerchantProductsPage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/products/new" element={
            <MerchantProtectedRoute>
              <MerchantProductCreatePage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/customers" element={
            <MerchantProtectedRoute>
              <MerchantCustomersPage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/search-users" element={
            <MerchantProtectedRoute>
              <MerchantSearchUsersPage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/offers" element={
            <MerchantProtectedRoute>
              <MerchantOffersPage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/offers/new" element={
            <MerchantProtectedRoute>
              <MerchantOfferCreatePage />
            </MerchantProtectedRoute>
          } />
          <Route path="/merchant/profile" element={
            <MerchantProtectedRoute>
              <MerchantProfilePage />
            </MerchantProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          } />
        </Routes>
      </div>
      {showCustomerUI && <BottomNav />}
    </div>
  );
};

export default function App(): React.ReactElement {
  return (
    <Router>
      <AuthProvider>
        <MerchantAuthProvider>
          <AdminAuthProvider>
            <AppContent />
          </AdminAuthProvider>
        </MerchantAuthProvider>
      </AuthProvider>
    </Router>
  );
}