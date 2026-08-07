import React from 'react'
import ShopSettings from '../../components/ShopSettings.jsx'
import DashboardHeader from "../../components/SellerComponents/DashboardHeader.jsx"
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar.jsx'

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className="flex items-start justify-between w-full">
        <div className="w-[80%] md:w-[330px]">
          <DashboardSidebar active={11}/>
        </div>
        <ShopSettings />
      </div>
    </div>
  )
}

export default ShopSettingsPage
