import React from 'react'
import ShopSettings from '../../components/ShopSettings.jsx'
import DashboardHeader from "../../components/SellerComponents/DashboardHeader.jsx"
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar.jsx'

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='flex w-full items-start justify-between'>
        <div className='w-full max-w-[260px] shrink-0'>
          <DashboardSidebar activeHeading={11}/>
        </div>
        <div className='flex-1'>
          <ShopSettings />
        </div>
      </div>
    </div>
  )
}

export default ShopSettingsPage
