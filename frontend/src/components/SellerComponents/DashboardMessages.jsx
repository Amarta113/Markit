import React from 'react'

const DashboardMessages = () => {
    return (
        <div className='w-[90%] bg-white h-[85px] overflow-y-scroll rounded'>
            <h1 className='text-center text-[30px] py-3 font-Poppins'>All Messages</h1>
            {/* All messages */}
            <MessageList />
        </div>
    )
}

const MessageList = () => {
    return (
        <div className="w-full flex p-3 px-3 bg-[#000000010] cursor-pointer">
            <div className="relative">
                <img src="" alt=""
                    className='w-[50%] h-[50%] rounded-full'
                />
                <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]' />
            </div>
            <div className="pl-3">
                <h1 className='text-[18px]'>User name</h1>
                <p className='text-[16px] text-[#000c]'>You: Yeah I am good</p>
            </div>
        </div>
    )
}

export default DashboardMessages
