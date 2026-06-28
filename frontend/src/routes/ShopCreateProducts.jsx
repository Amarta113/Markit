import React from 'react'
import DashboardHeader from '../components/SellerComponents/DashboardHeader'
import DashboardSidebar from '../components/SellerComponents/DashboardSidebar'
import CreateProduct from '../components/SellerComponents/CreateProduct.jsx'

const ShopCreateProducts = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] width-at-800px'>
                    <DashboardSidebar activeHeading={1} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateProducts
