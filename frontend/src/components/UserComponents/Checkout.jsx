import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { useSelector } from 'react-redux'
import ShippingInfo from '../UserComponents/ShippingInfo.jsx'
import CartData from '../UserComponents/CartData.jsx'

function Checkout() {
    const { user } = useSelector(state => state.user)
    const { cart } = useSelector(state => state.user)
    const [country, setCountry] = useState()
    const [city, setCity] = useState("")
    const [userInfo, setUserInfo] = useState(false)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [zipCode, setZipCode] = useState(null)
    const [couponCodeData, setCouponCodeData] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const paymentSubmit = () => {
        navigate('/payment')
    }
    const subTotalPrice = cart.reduce(
        (acc,item) => acc + item.qty * item.discountPrice,
        0
    )
    // Shipping cost variable
    const shipping = subTotalPrice * 0.1

    const handleSubmit = async(e) => {
        e.preventDefault()
    }
    const discountPercentenge = couponCodeData? discountPrice : ""
    const totalPrice = couponCodeData? 
    (subTotalPrice + shipping - discountPercentenge).toFixed(2) :
    (subTotalPrice + shipping).toFixed(2)
    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] lg:w-[70%] block md:flex">
                <div className="w-full md:w-[65%]">
                    <ShippingInfo
                        user={user}
                        country={country}
                        setCountry={setCountry}
                        city={city}
                        setCity={setCity}
                        userInfo={userInfo}
                        setUserInfo={setUserInfo}
                        address1={address1}
                        setAddress1={setAddress1}
                        address2={address2}
                        setAddress2={setAddress2}
                        zipCode={zipCode}
                        setZipCode={setZipCode}
                    />
                </div>
                <div className="w-full md:w-[35%] md:mt-0 mt-8">
                    <CartData orderData={orderData}/>
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