import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'
import DashboardMessages from '../../components/SellerComponents/DashboardMessages.jsx'

const ShopInboxPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] width-at-800px'>
                    <DashboardSidebar activeHeading={8} />
                </div>
                <DashboardMessages />
            </div>
        </div>
    )
}

export default ShopInboxPage
