import React from 'react'
import DashboardHeader from '../../components/SellerComponents/DashboardHeader'
import WithdrawMoney from './WithdrawMoney.jsx'
import DashboardSidebar from '../../components/SellerComponents/DashboardSidebar'

const ShopWithDrawMoneyPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className='flex w-full items-start justify-between'>
                <div className='w-full max-w-[260px] shrink-0'>
                    <DashboardSidebar activeHeading={7} />
                </div>
                <div className='flex-1'>
                    <WithdrawMoney />
                </div>
            </div>
        </div>
    )
}

export default ShopWithDrawMoneyPage
