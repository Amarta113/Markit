import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { format } from 'timeago.js'
import { backend_url, server } from '../server.js'
import Header from '../components/Layout/Header.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const ENDPOINT = 'http://localhost:4000/'
const socketId = io(ENDPOINT, { transports: ["websocket"] })

const UserInbox = () => {
    const { user } = useSelector((state) => state.user)
    const [conversations, setConversations] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messages, setMessages] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [userData, setUserData] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const [activeStatus, setActiveStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const [images, setImages] = useState(null)

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
            currentChat?.members?.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        if (user) {
            const userId = user?._id;
            socketId.emit("addUser", userId)
            socketId.on("getUsers", (data) => {
                setOnlineUser(data)
            })
        }
    }, [user])

    const onlineCheck = (chat) => {
        const chatMembers = chat?.members.find((member) => member !== user._id)
        const online = onlineUser?.find((user) => user.userId === chatMembers)
        return online ? true : false
    }

    useEffect(() => {
        const getMessage = async () => {
            try {
                const response = await axios.get(`${server}/message/get-all-messages/:${currentChat._id}`)
                setMessages(response.data.messages)
            } catch (error) {
                console.log(error)
            }
        }
        getMessage()
    }, [currentChat])

    useEffect(() => {
        const getConversation = async () => {
            try {
                const { data } = await axios.get(`${server}/conversation/get-all-conversation-user/${user?._id}`, {
                    withCredentials: true,
                })
                setConversations(data.conversations)
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message)
            }
        }
        getConversation()
    }, [user, messages])

    const sendMessageHandler = async (e) => {
        e.preventDefault()
        const message = {
            sender: user?._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find((member) => member !== user?._id)
        socketId.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            text: newMessage
        })

        try {
            if (newMessage !== "") {
                await axios.post(`${server}/message/create-new-message`,
                    message
                ).then((res) => {
                    setMessages([...messages, res.data.message])
                    updateLastMessage()
                }).catch((error) => {
                    console.log(error)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateLastMessage = async () => {
        socketId.emit("updateLastMessage", {
            lastMessage: newMessage,
            lastMessageId: user?._id
        })

        await axios.put(
            `${server}/conversation/update-last-message/${currentChat._id}`,
            {
                lastMessage: newMessage,
                lastMessageId: user?._id
            }
        ).then((res) => {
            console.log(res.data.conversation)
            setNewMessage("")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='w-full'>
            <Header />
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
                                setCurrentChat={setCurrentChat}
                                me={user._id}
                                userData={userData}
                                setUserData={setUserData}
                                online={onlineCheck(item)}
                                setActiveStatus={setActiveStatus}
                            />
                        ))
                    }
                </>
            )}

        </div>
    )
}

const MessageList = ({
    data, key, index, setOpen, setCurrentChat,
    me,
    userData,
    setUserData,
    online,
    setActiveStatus
}) => {
    const [active, setActive] = useState(0);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`?${id}`)
    }

    useEffect(() => {
        setActiveStatus(online)
        const userId = data.members.find((user) => user != me)
        const getUser = async () => {
            try {
                const res = await axios.get(`${server}/user/user-info/${userId}`)
                setUser(res.data.user)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [me, data])

    return (
        <div
            className={`w-full flex ${active === index ? 'bg-[#000000010]' : 'bg-transparent'} p-3 px-3 cursor-pointer`}
            onClick={() => {
                setActive(index);
                handleClick(data._id);
                setCurrentChat(data);
                setUserData(user);
                setActiveStatus(online);
            }}
        >
            <div className='relative'>
                <img src={`${backend_url}${user?.avatar}`} alt='' className='w-[50%] h-[50%] rounded-full' />
                {
                    online ? (
                        <div className='w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]' />
                    ) : (
                        <div className='w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]' />
                    )
                }
            </div>
            <div className='pl-3'>
                <h1 className='text-[18px]'>{user?.name}</h1>
                <p className='text-[16px] text-[#000c]'>{
                    data?.lastMessageId !== user?.id ? "You:" : user?.name.split(" ")[0] + ": "}
                    {data?.lastMessage}
                </p>
            </div>
        </div>
    )
}

export default UserInbox
