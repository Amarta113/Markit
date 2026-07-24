import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'
import { useSelector } from 'react-redux'
import ShippingInfo from '../UserComponents/ShippingInfo.jsx'

function Checkout() {
    const { user } = useSelector(state => state.user)
    const { cart } = useSelector(state => state.user)
    const [country, setCountry] = useState()
    const [city, setCity] = useState("")
    const [userInfo, setUserInfo] = useState(false)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [zipCode, setZipCode] = useState(null)
    const [couponCode, setCouponCode] = useState("");
    const [couponCodeData, setCouponCodeData] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const paymentSubmit = () => {
        navigate('/payment')
    }
    const subTotalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    )
    // Shipping cost variable
    const shipping = subTotalPrice * 0.1

    const handleSubmit = async (e) => {
        e.preventDefault()
        const couponCode;
        await axios.get(`{server}/coupon/get-coupon-value/${name}`).then(
            res => {
                if (res.data.couponCode === null) {
                    toast.error("Coupon code doesn't exists!")
                    setCouponCodeData("")
                }
            })
    }
    const discountPercentenge = couponCodeData ? discountPrice : ""
    const totalPrice = couponCodeData ?
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
                    <CartData
                        handleSubmit={handleSubmit}
                        totalPrice={totalPrice}
                        shipping={shipping}
                        subTotalPrice={subTotalPrice}
                        couponCode={couponCode}
                        setCouponCode={setCouponCode}
                        discountPercentenge={discountPercentenge}
                    />
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

function CartData({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    couponCode,
    setCouponCode,
    discountPercentenge
}) {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className='text-[16px] font-[400] text-[#000000a4]'>subtotal:</h3>
                <h5 className='text-[18px] font-[600]'>${subTotalPrice}</h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className='text-[16px] font-[400] text-[#000000a4]'>shipping:</h3>
                <h5 className='text-[18px] font-[600]'>${shipping.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className='text-[16px] font-[400] text-[#000000a4]'>Discount:</h3>
                <h5 className='text-[18px] font-[600]'>
                    - {discountPercentenge ? "$" + discountPercentenge.toString() : null}</h5>
            </div>
            <h5 className='text-[18px] font-[600] text-end pt-3'>${totalPrice}</h5>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={`${styles.input} h-[40px] pl-2`}
                    placeholder='Coupon Code'
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    required
                />
                <input
                    className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
                    required
                    value="Apply Code"
                    type='submit'
                />
            </form>
        </div>
    )
}


export default Checkout