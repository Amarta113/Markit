import React from 'react'
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { CiMoneyBill, CiSettings } from 'react-icons/ci'
import { VscNewFile } from 'react-icons/vsc'
import { HiOutlineReceiptRefund } from 'react-icons/hi'

const DashboardSidebar = ({ activeHeading = 1, active }) => {
  const currentActive = activeHeading ?? active ?? 1

  const menuItems = [
    { id: 1, label: 'Dashboard', to: '/dashboard', Icon: RxDashboard },
    { id: 2, label: 'All Orders', to: '/dashboard-orders', Icon: FiShoppingBag },
    { id: 3, label: 'All Products', to: '/dashboard-products', Icon: FiPackage },
    { id: 4, label: 'Create Product', to: '/dashboard-create-product', Icon: AiOutlineFolderAdd },
    { id: 5, label: 'All Events', to: '/dashboard-events', Icon: MdOutlineLocalOffer },
    { id: 6, label: 'Create Events', to: '/dashboard-create-event', Icon: VscNewFile },
    { id: 7, label: 'Withdraw Money', to: '/dashboard-withdraw-money', Icon: CiMoneyBill },
    { id: 8, label: 'Shop Inbox', to: '/dashboard-message', Icon: BiMessageSquareDetail },
    { id: 9, label: 'Discount Codes', to: '/dashboard-coupons', Icon: AiOutlineGift },
    { id: 10, label: 'Refunds', to: '/dashboard-refunds', Icon: HiOutlineReceiptRefund },
    { id: 11, label: 'Settings', to: '/settings', Icon: CiSettings },
  ]

  return (
    <aside className='sticky left-0 top-[90px] z-10 h-[calc(110vh-80px)] w-full border-r border-slate-200 bg-white shadow-sm'>
      <nav className='flex flex-col py-4'>
        {menuItems.map(({ id, label, to, Icon }) => {
          const isActive = currentActive === id

          return (
            <Link
              key={id}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                isActive ? 'border-r-4 border-red-500 bg-red-50 text-red-500' : 'text-slate-600 hover:bg-slate-50 hover:text-red-500'
              }`}
            >
              <Icon size={22} className={isActive ? 'text-red-500' : 'text-slate-600'} />
              <span className={`text-base font-medium ${isActive ? 'text-red-500' : 'text-slate-700'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default DashboardSidebar
