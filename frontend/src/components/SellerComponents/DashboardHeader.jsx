import React from 'react'
import { useSelector } from 'react-redux'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/markit-logo.jpg'
import { AiOutlineGift } from 'react-icons/ai'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { BiMessageSquareDetail } from 'react-icons/bi'

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller)

  const quickLinks = [
    { to: '/dashboard-coupons', label: 'Coupons', icon: AiOutlineGift },
    { to: '/dashboard-events', label: 'Events', icon: MdOutlineLocalOffer },
    { to: '/dashboard-products', label: 'Products', icon: FiShoppingBag },
    { to: '/dashboard-orders', label: 'Orders', icon: FiPackage },
    { to: '/dashboard-message', label: 'Messages', icon: BiMessageSquareDetail },
  ]

  return (
    <header className='sticky top-0 left-0 z-30 h-[80px] border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm'>
      <div className='mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6'>
        <Link to='/dashboard' className='flex items-center'>
          <img src={logoImg} alt='Shop logo' className='h-10 w-auto object-contain' />
        </Link>

        <div className='flex items-center gap-3 sm:gap-4'>
          <nav className='hidden items-center gap-2 md:flex'>
            {quickLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                aria-label={label}
                className='flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-red-500'
              >
                <Icon size={22} />
              </Link>
            ))}
          </nav>

          <Link to={seller?._id ? `/shop/${seller._id}` : '/dashboard'} className='shrink-0'>
            <img
              src={seller?.avatar?.url || 'https://i.pravatar.cc/150'}
              alt='Seller avatar'
              className='h-11 w-11 rounded-full border border-slate-200 object-cover shadow-sm'
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
