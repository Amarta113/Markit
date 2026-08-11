import React from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { LoginPage, SignupPage, ActivationPage, SellerActivationPage, HomePage, ProductsPage, ShopCreatePage, BestSellingPage, EventsPage, FaqPage, ProfilePage, ShopLoginPage, OrderDetailsPage, TrackOrderPage, UserInbox } from "./routes/Routes.jsx"
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
import { ShopDashboardPage, ShopAllProducts, ShopCreateEvents, ShopAllEvents, ShopAllCoupons, ShopAllOrders, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage,ShopWithDrawMoneyPage, ShopInboxPage } from './routes/ShopRoutes.jsx';
import ShopCreateProducts from './routes/ShopCreateProducts.jsx';
import { getAllEvents } from '../redux/actions/eventActions.js';
import { getAllProducts } from '../redux/actions/productActions.js';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { server } from './server.js';


export default function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [stripeApiKey, setStripeApiKey] = useState("")
  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stipeapikey`)
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    dispatch(loadUser())
    dispatch(loadSeller())
    dispatch(getAllProducts())
    dispatch(getAllEvents())
    getStripeApikey()
  }, [dispatch])
  return (
    <>
      {stripeApiKey && (
        <Elements stripeApiKey={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path='/payment'
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
          </Routes>
        </Elements>
      )}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignupPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path='/best-selling' element={<BestSellingPage />} />
        <Route path='/events' element={<EventsPage />} />
        <Route path='/faq' element={<FaqPage />} />
        <Route path='/checkout' element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        } />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path='/profile' element={
          <ProtectedRoute >
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path='/inbox' element={
          <ProtectedRoute >
            <UserInbox />
          </ProtectedRoute>
        } />
        <Route path='/user/order/:id' element={
          <ProtectedRoute >
            <OrderDetailsPage />
          </ProtectedRoute>
        } />
        <Route path='/user/track/order/:id' element={
          <ProtectedRoute >
            <TrackOrderPage />
          </ProtectedRoute>
        } />
        <Route path='/shop-create' element={<ShopCreatePage />} />
        <Route path='/shop-login' element={<ShopLoginPage />} />
        <Route path='/shop/:id' element={
          <SellerProtectedRoute>
            <ShopHomePage />
          </SellerProtectedRoute>} />
        <Route path='/settings' element={
          <SellerProtectedRoute>
            <ShopSettingsPage />
          </SellerProtectedRoute>} />
        <Route path='/dashboard' element={
          <SellerProtectedRoute>
            <ShopDashboardPage />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute>
            <ShopCreateProducts />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-orders' element={
          <SellerProtectedRoute>
            <ShopAllOrders />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-refunds' element={
          <SellerProtectedRoute>
            <ShopAllRefunds />
          </SellerProtectedRoute>} />
        <Route path='/order/:id' element={
          <SellerProtectedRoute>
            <ShopOrderDetails />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-products' element={
          <SellerProtectedRoute>
            <ShopAllProducts />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute>
            < ShopCreateEvents />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-events' element={
          <SellerProtectedRoute>
            <ShopAllEvents />
          </SellerProtectedRoute>} />
        <Route path='/dashboard-coupons' element={
          <SellerProtectedRoute>
            <ShopAllCoupons />
          </SellerProtectedRoute>} 
        />
        <Route path='/dashboard-withdraw-money' element={
          <SellerProtectedRoute>
            <ShopWithDrawMoneyPage />
          </SellerProtectedRoute>}
        />
        <Route path='/dashboard-message' element={
          <SellerProtectedRoute>
            <ShopInboxPage />
          </SellerProtectedRoute>}
        />
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

