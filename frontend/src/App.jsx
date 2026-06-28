import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage, SellerActivationPage, HomePage, ProductsPage, ShopCreatePage, BestSellingPage, EventsPage, FaqPage, ProfilePage, ShopLoginPage } from "./routes/Routes.jsx"
import { ToastContainer, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import store from '../redux/store.js';
import { loadUser } from '../redux/actions/user.js';
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import { useSelector } from 'react-redux';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { ShopHomePage } from './ShopRoutes.jsx'
import SellerProtectedRoute from './routes/SellerProtectedRoute.jsx';
import { loadSeller } from '../redux/actions/sellerActions.js';
import { ShopDashboardPage } from './routes/ShopRoutes.jsx';
import { ShopCreateProduct } from './routes/ShopCreateProducts.jsx';


export default function App() {
  const navigate = useNavigate()

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadSeller())
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:name" element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/checkout' element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path="/order/success/:id" element={<OrderSuccessPage />} />
        <Route path='/profile' element={
          <ProtectedRoute >
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/shop/:id' element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>} />
        <Route path='/dashboard' element={
          <SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute>
            <ShopCreateProduct />
          </SellerProtectedRoute>} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>)
}

