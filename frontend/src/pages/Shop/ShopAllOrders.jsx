import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSideBar from '../../components/SellerComponents/DashboardSidebar'
import AllOrders from '../../components/SellerComponents/AllOrders.jsx'

function ShopAllOrders() {
  return (
    <div>
      <DashboardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSideBar active={2} />
        </div>
        <div className='w-full justify-center flex'>
          <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrders
