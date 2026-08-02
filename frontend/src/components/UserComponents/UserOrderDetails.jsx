import React, { use, useState } from 'react'
import { BsFillBagFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from '../../styles/styles'
import { backend_url } from '../../server'
import { getAllOrdersUser } from '../../../redux/actions/orderActions'

const UserOrderDetails = () => {
    const { orders } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [status, setStatus] = useState("")
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAllOrdersUser(user._id))
    }, [dispatch])

    const data = orders && orders.find((item) => item._id === id)
    const orderUpdateHandler = (e) => {

    }
    return (
        <div className={`py-4 min-h-screen ${styles.section}`}>
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                    <BsFillBagFill
                        size={30}
                        color='crimson'
                    />
                    <h1 className='pl-2 text-[25px]'>Order Details</h1>
                </div>

            </div>
            <div className="w-full flex items-center justify-between pt-6">
                <h5 className='text-[#00000084]'>
                    Order ID:
                    <span>#{data?._id?.slice(0, 8)}</span>
                </h5>
                <h5 className='text-[#00000084]'>
                    Placed on: <span>{data?.createAt?.slice(0, 10)}</span>
                </h5>
                { /* order items */}
                {
                    data && data?.cart.map((item, index) => {
                        <div className="w-full flex items-start mb-5">
                            <img
                                src={`${backend_url}/${item.images[0]}`}
                                alt=""
                                className='w-[80px] h-[80px]' />
                            <div className="w-full">
                                <h5 className='pl-3 text-[20px]'>{item.name}</h5>
                                <h5 className='pl-3 text-[20px] text-[#00000091]'>US${item.discountPrice} x {item.qty}</h5>
                            </div>
                            {
                                data?.status === "Delivered" && (
                                    <div className={`${styles.button} text-[#fff]`}
                                    onClick={() => setOpen(true) || setSelectedItem(item) }>
                                        Write a review
                                    </div>
                            )}
                        </div>
                    })}
                    {/* Review Popup */}
                    {
                        opne && (
                            <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50">
                                
                            </div>
                        )
                    }
                <div className="w-full border-t text-right">
                    <h5 className='pt-3 text-[18px]'>
                        Total Price: <strong>US${data?.totalPrice}</strong>
                    </h5>
                </div>
                <br />
                <br />
                <div className="w-full md:flex items-center">
                    <div className="w-full md:w-[60%]">
                        <h4 className="pt-3 text-[20px] font-[600]">
                            Shipping Address:
                        </h4>
                        <h4 className='pt-3 text-[20px]'>
                            {data?.shippingAddress.address1 + " " + data?.shippingAddress.address2}
                        </h4>
                        <h4 className='text-[20px]'>
                            {
                                data?.shippingAddress.country
                            }
                        </h4>
                        <h4 className='text-[20px]'>
                            {
                                data?.shippingAddress.city
                            }
                        </h4>
                        <h4 className='text-[20px]'>
                            {
                                data?.shippingAddress.phonNumber
                            }
                        </h4>
                    </div>
                    <div className="w-full md:w-[40%]">
                        <h4 className='pt-3 text-[20px]'>Payment Info:</h4>
                        <h4>Status: {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}</h4>
                    </div>
                </div>
                <Link to="/">
                    <div className={`${styles.button} text-white`}>
                        Send Message
                    </div>
                </Link>
                <br />
                <br />
            </div>
        </div>
    )
}

export default UserOrderDetails
