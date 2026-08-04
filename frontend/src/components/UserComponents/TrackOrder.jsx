import React, { useEffect } from 'react'
import { MdTrackChanges } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { getAllOrdersShop } from '../../../redux/actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

const TrackOrder = () => {
  const { orders, isLoading } = useSelector((state) => state.order)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const {id} = useParams()

  useEffect(() => {
    dispatch(getAllOrdersShop(user._id))
  }, [])


  const data = orders && orders.find((item) => item._id === id)

  return (
       <div className="w-full h-[80vh] flex justify-center items-center">
      {
        data && data?.status === "Processing"? (
            <h1 className='text-[20px]'>Your Order is processing in Ship</h1>
        ): (
          data?.status === "Transferred to delivery parter"? (
            <h1 className='text-[20px]'>Your Order is on the way for delivery parter.</h1>
          ):
          (
            data?.status === "Shipping"? (
                <h1 className='text-[20px]'>Your Order is coming from our delivery parter.</h1>
            ): data?.status === "Received"? (
               <h1 className='text-[20px]'>Your Order is in your city. Our delivery man will deliver it.</h1>
            ): (
              data?.status === "On the way"? (
                <h1 className='text-[20px]'>Your Delivery man going to deliver your order.</h1>
              ): (
                data?.status === "Delivered"? (
                  <h1 className='text-[20px]'>Your Order is delivered.</h1>
                ): (
                  data?.status === "Processing refund"? (
                    <h1 className='text-[20px]'>Your Refund is processing.</h1>
                  ): 
                  data?.status === "Refund Success"? (
                   <h1 className='text-[20px]'>Your refund is success!</h1>
                  ): (
                    null
                  )
                )
              )
            )
          )
        )
      }
    </div>
  );
}


export default TrackOrder
