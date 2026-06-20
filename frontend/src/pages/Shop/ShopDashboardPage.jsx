import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader.jsx'
import DashboardHero from '../../components/SellerComponents/DashboardHero.jsx'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar.jsx'

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className='w-[80px] width-at-800px'>
          <DashboardSidebar activeHeading={1} />
        </div>
      </div>
      <DashboardHero />
    </div>
  )
}

export default ShopDashboardPage
