import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import CreateEvent from '../../components/SellerComponents/CreateEvent.jsx'

const ShopCreateEvents = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] width-at-800px'>
                    <DashboardSidebar activeHeading={6} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateEvent />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateEvents
