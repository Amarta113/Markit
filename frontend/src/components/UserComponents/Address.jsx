import React from 'react'

const Address = () => {
    return (
        <div className='w-full px-5'>
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>My Addresses</h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between">
                <div className="flex items-center">
                    <h5 className='pl-5 font-[600]'>Default</h5>
                </div>
            <div className="pl-8 flex items-center">
                <h6>Street 1, block-14, Green Town</h6>
            </div>
            <div className="pl-8 flex items-center">
                <h6>(213) 840</h6>
            </div>
            <div className="min-2-[10%] flex items-center pl-8">
                <AiOutlineDelete size={25} className="cursor-pointer" />
            </div>
            </div>
        </div>
    )
}

export default Address
