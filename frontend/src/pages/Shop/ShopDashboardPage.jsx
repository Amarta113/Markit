import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader.jsx'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar.jsx'
import DashboardHero from '../../components/SellerComponents/DashboardHero.jsx'
const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex w-full items-start justify-between'>
        <div className='w-full max-w-[260px] shrink-0'>
          <DashboardSidebar activeHeading={1} />
        </div>
        <div className='flex-1'>
          <DashboardHero />
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage
