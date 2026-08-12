import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSideBar from '../../components/SellerComponents/DashboardSidebar'
import AllCoupons from '../../components/SellerComponents/AllCoupons.jsx'

function ShopAllCoupons() {
  return (
    <div>
      <DashboardHeader />
      <div className='flex w-full justify-between'>
        <div className='w-full max-w-[260px] shrink-0'>
          <DashboardSideBar activeHeading={9} />
        </div>
        <div className='flex w-full justify-center'>
          <AllCoupons />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupons
