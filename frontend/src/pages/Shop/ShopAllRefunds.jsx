import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import AllRefundOrders from '../../components/UserComponents/AllRefundOrders'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'

function ShopAllRefunds() {
  return (
    <div>
     <DashboardHeader/>
      <div className='flex justify-between w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSidebar active={9} />
        </div>
        <div className='w-full justify-center flex'>
          <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllRefunds
