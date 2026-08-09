import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { server } from '../../server'

const DashboardMessages = () => {
    const { seller } = useSelector((state) => state.seller)
    const [conversations, setConversations] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!seller?._id) return

        axios
            .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
                withCredentials: true,
            })
            .then((res) => {
                setConversations(res.data.conversations)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [seller])

    return (
        <div className='w-[90%] bg-white h-[85px] overflow-y-scroll rounded'>
            {!open && (
                <>
                <h1 className='text-center text-[30px] py-3 font-Poppins'>All Messages</h1>
                {
                conversations && conversations.map((item, index) => (
                    <MessageList
                        data={item}
                        key={index}
                        index={index}
                        setOpen={setOpen}
                    />
                ))
                }
                </>
            )}
            
        </div>
    )
}

const MessageList = ({ data, index, setOpen }) => {
    const [active, setActive] = useState(0)
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`?${id}`)
    }

    return (
        <div
            className={`w-full flex ${active === index ? 'bg-[#000000010]' : 'bg-transparent'} p-3 px-3 cursor-pointer`}
            onClick={() => {
                setActive(index)
                handleClick(data._id)
            }}
        >
            <div className='relative'>
                <img src='' alt='' className='w-[50%] h-[50%] rounded-full' />
                <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]' />
            </div>
            <div className='pl-3'>
                <h1 className='text-[18px]'>User name</h1>
                <p className='text-[16px] text-[#000c]'>You: Yeah I am good</p>
            </div>
        </div>
    )
}

export default DashboardMessages
