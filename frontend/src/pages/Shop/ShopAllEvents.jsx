import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSideBar from '../../components/SellerComponents/DashboardSidebar'
import AllEvents from '../../components/SellerComponents/AllEvents.jsx'

function ShopAllEvents() {
  return (
    <div>
      <DashboardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] md:w-[330px]'>
          <DashboardSideBar active={5} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopAllEvents />
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents
