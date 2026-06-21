import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/markit-log.png'
import { AiOutlineGift } from "react-icons/ai";

const DashboardHeader = () => {
  const {seller} = useSelector((state) => state.seller)
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex item-center justify-between px-4'>
      <div>
        <Link to="/dashboard">
          <img src={logoImg} alt='logo' className='w-[140px] bg-transparent' />
        </Link>
      </div>
      <div className='flex items-center'>
        <div className="flex items-center">
          <AiOutlineGift color='#555' size={30}
          className='mx-5 cursor-pointer display-block-800px hidden'/>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
