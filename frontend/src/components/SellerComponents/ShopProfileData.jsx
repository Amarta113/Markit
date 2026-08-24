import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles'
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from '../../../redux/actions/productActions.js'
import { getAllEventShop } from '../../../redux/actions/eventActions.js'
import Ratings from '../UserComponents/Ratings'
import { backend_url } from '../../server.js';
import ProductCard from '../ProductCard/ProductCard'

const EmptyState = ({ title, subtitle }) => (
  <div className='w-full flex flex-col items-center justify-center py-16 text-center'>
    <div className='w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    </div>
    <h5 className='text-[24px] font-[600] text-[#333]'>{title}</h5>
    {subtitle && <p className='text-[14px] text-[#00000090] mt-1 max-w-[320px]'>{subtitle}</p>}
  </div>
)

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1)
  const { products } = useSelector(state => state.products)
  const { seller } = useSelector(state => state.seller)
  const { events } = useSelector(state => state.events)
  const { id } = useParams()
  const dispatch = useDispatch()

  const allReviews = products?.flatMap((product) => product.reviews ?? []) ?? []

  useEffect(() => {
    if (!id) return

    dispatch(getAllProductsShop(id))
    dispatch(getAllEventShop(id))
  }, [dispatch, id])

  return (
    <div className='w-full'>
      <div className="flex w-full items-center justify-between border-b border-[#e8e8e8]">
        <div className='w-full flex'>
          <div className="flex items-center"
            onClick={() => setActive(1)}>
            <h5 className={`font-[600] text-[20px] ${active === 1 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5 className={`font-[600] text-[20px] ${active === 2 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5 className={`font-[600] text-[20px] ${active === 3 ? "text-red-500" : "text-[#333]"} cursor-pointer pr-[20px]`}>
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to='/dashboard'>
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className='text-[#fff]'>Go To Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      <div className='mt-2'>
      {
        active === 1 && (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0'>
            {
              products && products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))
            }
          </div>
        )
      }
      {
        active === 2 && (
          <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0'>
            {
              events && events.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} isEvent={true} />
              ))
            }
          </div>
        )
      }

      {
        active === 3 && (
          <div className="w-full">
            {
              allReviews?.length !== 0 ?
              (allReviews?.map((item, index) => (
                <div className="w-full flex my-4">
                  <img 
                  src={`${item?.user?.avatar.url}`}
                  className='w-[50px] h-[50px] rounded-full'
                  alt="" />
                  <div className='pl-2'>
                    <div className='flex w-full items-center'>
                        <h1 className='font-[600]'>{item?.user?.name}</h1>
                        <Ratings rating={item?.rating} />
                    </div>
                    <p className='text-[#000000a7] font-[14px]'>{item?.createdAt}</p>
                    <p className='font-[400] text-[#000000a7]'>{item?.comment}</p>
                  </div>
                </div>
              ))
            ): (
              <EmptyState
                title="No Review Exists"
                subtitle="This shop doesn't have any review right now."
              />
            )
            }
          </div>
        )
      }
      {
        active === 1 && products && products.length === 0 && (
          <h5 className='w-full text-center py-5 text-[18px]'>
            No Products have for this shop
          </h5>
        )
      }
      </div>
    </div>
  )
}

export default ShopProfileData
