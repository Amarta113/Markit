import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage, SellerActivationPage, HomePage, ProductsPage, ShopCreatePage, BestSellingPage, EventsPage, FaqPage, ProfilePage, ShopLoginPage } from "./Routes.jsx"
import { ToastContainer, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import store from '../redux/store.js';
import { loadUser } from '../redux/actions/user.js';
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import { useSelector } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';
import {ShopHomePage} from './ShopRoutes.jsx'
import SellerProtectedRoute from './SellerProtectedRoute.jsx';


export default function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user)
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller)
  const navigate = useNavigate()

  useEffect(() => {
    store.dispatch(loadUser())
    store.dispatch(loadSeller())
  }, [])
  return (
    <BrowserRouter>
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
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path="/order/success/:id" element={<OrderSuccessPage />} />
        <Route path='/profile' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/shop/:id' element={
          <SellerProtectedRoute isSeller={isSeller} seller={seller}>
          <ShopHomePage />
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
    </BrowserRouter>)
}

