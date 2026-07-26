import React, { useEffect } from 'react'
import CartData from '../../components/UserComponents/CartData'

const Payment = () => {
    const [orderData, setOrderData] = useState([])
    useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"))
    setOrderData(orderData)
    }, [])
    return (
        <div className='w-full flex flex-col items-center py-8'>
            <div className="w-[90%] 1000px:w-[70%] block md:flex">
                <div className="w-full md:w-[65%]">
                    <PaymentInfo />
                </div>
                <div className="w-full md:w-[35%] md:mt-0 mt-8">
                    <CartData orderData={orderData}/>
                </div>
            </div>
        </div>
    )
}

export default Payment