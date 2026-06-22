import React from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from 'react-router-dom'
import logoImg from '../../assets/markit-log.png'
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller)
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex item-center justify-between px-4'>
      <div>
        <Link to="/dashboard">
          <img src={logoImg} alt='logo' className='w-[140px] bg-transparent' />
        </Link>
      </div>
      <div className='flex items-center'>

        <div className="flex items-center">
          <Link to={'/dashboard/coupons'}>
            <AiOutlineGift color='#555' size={30} className='mx-5 cursor-pointer display-block-800px hidden' />
          </Link>
          <Link to={'/dashboard-events'}>
            <MdOutlineLocalOffer
              color='#555'
              size={30}
              className='mx-5 cursor-pointer display-block-800px hidden' />
          </Link>
          <Link to={'/dashboard-products'}>
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden" />
          </Link>
          <Link to={"/dashboard-orders"}>
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={'/dashboard-message'}>
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer display-block-800px hidden"
            />
          </Link>
          <Link to={`/shop/${seller?._id}`}>
            <img src={`${seller?.avatar.url}`} alt="img"
              className='w-[50px] h-[50px] rounded-full object-cover' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
