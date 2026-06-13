import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

const PaymentMethod = () => {
    return (
        <div className='w-full px-5'>
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>Payment Methods</h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between">
                <div className="flex items-center">
                    <img 
                    src=""
                    alt="visa" />
                </div>
                <h5 className='pl-5 font-[600]'>Amarta</h5>
            </div>
            <div className="pl-8 flex items-center">
                <h6>1234 *** *** ***</h6>
                <h5 className='pl-6'>08/2026</h5>
                <div className="min-2-[10%] flex items-center pl-8">
                    <AiOutlineDelete size={25}
                    className="cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod
