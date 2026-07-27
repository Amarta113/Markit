import React, { useEffect, useState } from 'react'
import CartData from '../../components/UserComponents/CartData'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PaymentInfo from '../UserComponents/PaymentInfo.jsx'

const Payment = () => {
    const [orderData, setOrderData] = useState([])
    const [open, setOpen] = useState(false)
    const { user } = useSelector((state) => state.user())
    const navigate = useNavigate()
    const element = useElements()

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"))
        setOrderData(orderData)
    }, [])

    const createOrder = (data, actions) => {

    }

    const onApprove = async(data, actions) =>{
        console.log('ddd')
    }

    const paypalPaymentHandler = (async(paymentInfo) => {

    })

    const paymentData = {
        amount: Math.round(orderData?.totalPrice * 100)
    }

    const paymentHandler = async(e) => {
        e.preventDefault()
    }

    const cashOnDeliveryHandler = async(e) => {
        e.preventDefault()
    }
    return (
        <div className='w-full flex flex-col items-center py-8'>
            <div className="w-[90%] 1000px:w-[70%] block md:flex">
                <div className="w-full md:w-[65%]">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        setApprove={onApprove}
                        createOrder={createOrder}
                        paymentHandler={paymentHandler}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
                    />
                </div>
                <div className="w-full md:w-[35%] md:mt-0 mt-8">
                    <CartData orderData={orderData} />
                </div>
            </div>
        </div>
    )
}

export default Payment