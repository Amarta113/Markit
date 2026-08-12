import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'
import CreateEvent from '../../components/SellerComponents/CreateEvent.jsx'

const ShopCreateEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex w-full items-start justify-between'>
                <div className='w-full max-w-[260px] shrink-0'>
                    <DashboardSidebar activeHeading={6} />
                </div>
                <div className='flex w-full justify-center'>
                    <CreateEvent />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateEvents
