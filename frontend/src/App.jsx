import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FaqPage} from "./Routes.jsx"
import {ToastContainer, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import store from '../redux/store.js';
import { loadUser } from '../redux/actions/user.js';
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'

export default function App () {
  useEffect(() => {
   store.dispatch(loadUser())
  }, [])
  return (   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/sign-up' element={<SignupPage/>} />
        <Route path='/activation/:activation_token' element={<ActivationPage/>} />
        <Route path="/products" element={<ProductsPage/>}/>
        <Route path="/products/:name" element={<ProductDetailsPage/>}/>
        <Route path='/best-selling' element={<BestSellingPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/faq' element={<FaqPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/payment' element={<PaymentPage/>}/>
        <Route path="/order/success/:id" element={<OrderSuccessPage/>}/>
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

