import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { useSelector } from 'react-redux'
import ShippingInfo from '../UserComponents/ShippingInfo.jsx'
import CartData from '../UserComponents/CartData.jsx'

function Checkout() {
    const { user } = useSelector(state => state.user)
    const { cart } = useSelector(state => state.user)

    const navigate = useNavigate()

    const paymentSubmit = () => {
        navigate('/payment')
    }
    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] lg:w-[70%] block md:flex">
                <div className="w-full md:w-[65%]">
                    <ShippingInfo />
                </div>
                <div className="w-full md:w-[35%] md:mt-0 mt-8">
                    <CartData />
                </div>
            </div>
            <div
                className={`${styles.button} w-[150px] md:w-[280px] mt-10`}
                onClick={paymentSubmit}
            >
                <h5 className='text-white'>Go to Payment</h5>
            </div>
        </div>
    )
}


export default Checkout