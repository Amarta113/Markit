import React from 'react'
import DashboardHeader from '../components/SellerComponents/DashboardHeader'
import DashboardSidebar from '../components/SellerComponents/DashboardSidebar'
import CreateProduct from '../components/SellerComponents/CreateProduct.jsx'

const ShopCreateProducts = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex w-full items-start justify-between'>
                <div className='w-full max-w-[260px] shrink-0'>
                    <DashboardSidebar activeHeading={4} />
                </div>
                <div className='flex w-full justify-center'>
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProducts
