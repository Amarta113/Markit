import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../server'
import { useParams } from 'react-router-dom'
import { getAllProductsShop } from '../../../redux/actions/productActions'
import axios from 'axios'

const ShopInfo = ({ isOwner }) => {
    const { products } = useSelector(state => state.products)
    const { id } = useParams()
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${server}/shop/get-shop-info/${id}`)
        .then((res) => {
            setData(res.data.shop)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }, [])

    async function logoutHandler () {
        try {
            setIsLoading(true)
            const res = await axios.get( `${server}/seller/seller-logout`,
                {
                    withCredential: true
                })
            if (res.data.success) {
                window.location.href = '/shop-create'
            } else {
                console.error('Seller logout failed! ', res.data.message)
            }
        } catch (error){
            console.error("Seller logout error", error)
        }
    }
    return (
        <div>
            <div className='w-full py-5'>
                <div className="w-full flex item-center justify-center">
                    <img src={`${seller?.avatar}`}
                        alt=""
                        className='w-[150px] h-[150px] object-cover rounded-full' />
                </div>
                <h3 className='text-center py-2 text-[20px]'>
                    {data.name}
                </h3>
                <p className='text-[16px] text-[#000000a6] p-[10px] flex item-center'>
                    {data.description}
                </p>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Address</h5>
                <h4 className='text-[#000000a6]'>{data.address}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Phone Number</h5>
                <h4 className='text-[#000000a6]'>{data.phoneNumber}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]'>Total Products</h5>
                <h4 className='text-[#000000a6]'>10</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Shop Ratings</h5>
                <h4 className='text-[#000000a6]'>4/5</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Joined On</h5>
                <h4 className='text-[#000000a6]'>
                    {data?.createdAt.slice(0, 10)}
                </h4>
            </div>
            {isOwner && (
                <div className="py-">
                    <div className={`${styles.button} !w-full h-[42px] rounded-[5px]`}>
                        <span className='text-white'>Edit Shop</span>
                    </div>
                    <div className={`${styles.button} !w-full h-[42px] rounded-[5px]`}
                    onClick={logoutHandler}>
                        <span className='text-white'>Log Out</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShopInfo
