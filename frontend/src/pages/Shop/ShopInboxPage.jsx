import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'
import DashboardMessages from '../../components/SellerComponents/DashboardMessages.jsx'

const ShopInboxPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex w-full items-start justify-between'>
                <div className='w-full max-w-[260px] shrink-0'>
                    <DashboardSidebar activeHeading={8} />
                </div>
                <div className='flex-1'>
                    <DashboardMessages />
                </div>
            </div>
        </div>
    )
}

export default ShopInboxPage
