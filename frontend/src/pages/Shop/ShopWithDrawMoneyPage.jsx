import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import WithdrawMoney from './WithdrawMoney.jsx'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'

const ShopWithDrawMoneyPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className='w-[80px] width-at-800px'>
                    <DashboardSidebar activeHeading={7} />
                </div>
                <WithdrawMoney />
            </div>
        </div>
    )
}

export default ShopWithDrawMoneyPage
