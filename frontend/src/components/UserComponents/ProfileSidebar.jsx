import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RxPerson } from 'react-icons/rx'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai'
import { MdOutlineTrackChanges } from 'react-icons/md'
import { TbAddressBook, TbCodeAsterisk } from 'react-icons/tb'
import axios from 'axios'
import { server } from '../../server'
import { toast } from 'react-toastify'

const ProfileSidebar = ({ setActive, active }) => {
    const navigate = useNavigate()
    async function logoutHandler(){
        try {
            const res = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            })
            if(res.data.success) {
                toast.success(res.data.message)
                window.location.reload(true)
                navigate('/login-user')
            }
        } catch (err) {
            toast.error("Try again Later")
            console.error(err)
        }
    }
    return (
        <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
            <div 
            className="flex items-center cursor-pointer w-full mb-8" 
            onClick={() => setActive(1)}>
                <RxPerson size={20} color={active === 1 ? "red" : ""} />
                <span className={`pl-3 ${active === 1 ? "text-[red]" : ""} hidden md:block`}>
                    Profile
                </span>
            </div>
            <div className='my-[30px]'>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(2)}>
                <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
                <span className={`pl-3 ${active === 2 ? "text-[red]" : ""} hidden md:block`}>
                    Orders
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(3)}>
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
                <span className={`pl-3 ${active === 3 ? "text-[red]" : ""} hidden md:block`}>
                    Refunds
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(4) || navigate('/inbox')}>
                <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
                <span className={`pl-3 ${active === 4 ? "text-[red]" : ""} hidden md:block`}>
                    Inbox
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(5)}>
                <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
                <span className={`pl-3 ${active === 5 ? "text-[red]" : ""} hidden md:block`}>
                    Track Order
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(6)}>
                <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
                <span className={`pl-3 ${active === 6 ? "text-[red]" : ""} hidden md:block`}>
                    Payment Methods
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8" onClick={() => setActive(7)}>
                <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
                <span className={`pl-3 ${active === 7 ? "text-[red]" : ""} hidden md:block`}>
                    Address
                </span>
            </div>
            <div className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(8) || logoutHandler()}>
                <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
                <span className={`pl-3 ${active === 8 ? "text-[red]" : ""} hidden md:block`}>
                    Log out
                </span>
            </div>
            </div>
        </div>
    )
}

export default ProfileSidebar