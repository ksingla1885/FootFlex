import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/auth/UserLogin';
import UserRegister from './pages/auth/UserRegister';
import AdminLogin from './pages/auth/AdminLogin';
import AdminRegister from './pages/auth/AdminRegister';
import Dashboard from './pages/user/Dashboard';
import CategoryPage from './pages/user/CategoryPage';
import ProductList from './pages/user/ProductList';
import ProductDetail from './pages/user/ProductDetail';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Payment from './pages/user/Payment';
import ThankYou from './pages/user/ThankYou';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductCreate from './pages/admin/ProductCreate';
import ProductEdit from './pages/admin/ProductEdit';
import OrdersList from './pages/admin/OrdersList';
import UsersList from './pages/admin/UsersList';
import UserDetail from './pages/admin/UserDetail';
import ProductManage from './pages/admin/ProductManage';

// Components
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/register/user" element={<UserRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        
        {/* User Routes */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/categories" element={<PrivateRoute element={<CategoryPage />} />} />
        <Route path="/products/:category" element={<PrivateRoute element={<ProductList />} />} />
        <Route path="/product/:id" element={<PrivateRoute element={<ProductDetail />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
        <Route path="/thank-you" element={<PrivateRoute element={<ThankYou />} />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
        <Route path="/admin/product/create" element={<AdminRoute element={<ProductCreate />} />} />
        <Route path="/admin/product/edit/:id" element={<AdminRoute element={<ProductEdit />} />} />
        <Route path="/admin/products" element={<AdminRoute element={<ProductManage />} />} />
        <Route path="/admin/orders" element={<AdminRoute element={<OrdersList />} />} />
        <Route path="/admin/users" element={<AdminRoute element={<UsersList />} />} />
        <Route path="/admin/user/:id" element={<AdminRoute element={<UserDetail />} />} />
      </Routes>
    </Router>
  );
}

export default App;