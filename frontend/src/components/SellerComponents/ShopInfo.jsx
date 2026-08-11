import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../server.js'
import { Link, useParams } from 'react-router-dom'
import { getAllProductsShop } from '../../../redux/actions/productActions.js'
import axios from 'axios'
import logo from '../../assets/logo-img.png'
import styles from '../../styles/styles.js'

const ShopInfo = ({ isOwner }) => {
    const { products } = useSelector(state => state.products)
    const { seller } = useSelector(state => state.seller)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                dispatch(getAllProductsShop(id))
                const res = await axios.get(`${server}/seller/get-shop-info/${id}`)
                setData(res.data.shop)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getData()
    }, [dispatch])

    async function logoutHandler() {
        try {
            setIsLoading(true)
            const res = await axios.get(`${server}/seller/seller-logout`,
                {
                    withCredential: true
                })
            if (res.data.success) {
                window.location.href = '/shop-create'
            } else {
                console.error('Seller logout failed! ', res.data.message)
            }
        } catch (error) {
            console.error("Seller logout error", error)
        }
    }


    const totalReviewsLength = products && products.reduce((acc, product) => acc + product.reviews.length, 0)
    const totalRatings = products && products.reduce((acc, product) => acc + product.reviews.reduce((sum, review) => sum + review.rating, 0))
    const averageRating = totalRatings / totalReviewsLength || 0


    return (
        <div>
            <div className='w-full py-4'>
                <div className="w-full flex item-center justify-center">
                    <img src={logo}
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
                <h4 className='text-[#000000a6]'>{products && products.length}</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Shop Ratings</h5>
                <h4 className='text-[#000000a6]'>4/5</h4>
            </div>
            <div className="p-3">
                <h5 className='font-[600]' >Joined On</h5>
                <h4 className='text-[#000000a6]'>
                    {data?.createdAt?.slice(0, 10)}
                </h4>
            </div>
            {isOwner && (
                <div className="py-3 px-4">
                    <Link to="/settings">
                        <div className={`${styles.button} !w-full h-[42px] rounded-[5px]`}>
                            <span className='text-white'>Edit Shop</span>
                        </div>
                    </Link>
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
