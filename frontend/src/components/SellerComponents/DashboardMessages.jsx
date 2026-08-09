import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight, AiOutlineSend } from 'react-icons/ai'
import axios from 'axios'
import styles from '../../styles/styles'
import { TfiGallery } from "react-icons/tfi";
import { server } from '../../server'
import { io } from 'socket.io-client'

ENDPOINT = 'http://localhost:4000/'

const socketId = io(ENDPOINT, { transports: ["websocket"] })

const DashboardMessages = () => {
    const { seller } = useSelector((state) => state.seller)
    const [conversations, setConversations] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messages, setMessages] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socketId.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && 
        currentChat?.members.includes(arrivalMessage.sender) &&
        setArrivalMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if (!seller?._id) return

        axios.get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
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
            {
                open && (
                    <SellerInbox
                    setOpen={setOpen}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage} 
                    />
                )
            }
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

const SellerInbox = ({ setOpen, newMessage, setNewMessage }) => {
    return (
        <div className="w-full min-h-full flex flex-col justify-between">
            {/* message header */}
            <div className="w-full">
                <div className="flex">
                    <img
                        src="" alt="user-image-avatar"
                        className='w-[60px] h-[60px] rounded-full'
                    />
                    <div className="pl-3">
                        <h1 className='text-[18px] font-[600]'>amarta</h1>
                        <h1>Active now</h1>
                    </div>
                </div>
                <AiOutlineArrowRight
                    size={20}
                    className='cursor-pointer'
                    onClick={() => setOpen(FileSystemWritableFileStream)}
                />
            </div>

            {/* messages */}
            <div className="px-3 h-[65vh] bg-red-100 py-2 overflow-y-scroll">
                <div className="flex w-full my-2">
                    <img src=""
                        alt=""
                        className='w-[40px] h-[40px] rounded-full mr-3' />
                    <div className="w-max bg-green-[400] rounded p-2 text-[#fff] h-min">
                        <p>Hello there!</p>
                    </div>
                </div>

                <div className="flex w-full my-2 justify-end">
                    <div className="w-max bg-green-[400] rounded p-2 text-[#fff] h-min">
                        <p>Hello there!</p>
                    </div>
                </div>
            </div>

            {/* send message input */}
            <form aria-required={true}
                className='p-3 relative w-full flex justify-between'>
                <div className="w-[3%]">
                    <TfiGallery
                        className='cursor-pointer'
                        size={20}
                    />
                </div>
                <div className='w-[97%]'>
                    <input
                        type="text"
                        required
                        placeholder='Enter your message...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className={`${styles.input}`} />
                    <input
                        type="submit"
                        value="Send"
                        className='hidden'
                        id="send" />
                    <label htmlFor="send">
                        <AiOutlineSend size={20} className='absolute right-4 top-5 cursor-pointer' />
                    </label>
                </div>
            </form>
        </div>
    )
}

export default DashboardMessages
