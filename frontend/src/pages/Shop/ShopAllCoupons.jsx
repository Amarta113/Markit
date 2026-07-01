import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSideBar from '../../components/SellerComponents/DashboardSidebar'
import AllCoupons from '../../components/SellerComponents/AllCoupons.jsx'

function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSideBar active={9} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllCoupons />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupons
