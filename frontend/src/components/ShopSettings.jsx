import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url, server } from '../server'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../styles/styles'
import axios from 'axios'

const ShopSettings = () => {
    const { seller } = useSelector(state => state.seller)
    const [avatar, setAvatar] = useState()
    const [name, setName] = useState(seller & seller.name)
    const [description, setDescription] = useState(seller && seller.description ? seller.description : "")
    const [address, setAddress] = useState(seller && seller.address)
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber)
    const [zipCode, setZipCode] = useState(seller && seller.zipCode)
    const dispatch = useDispatch()

    const handleImage = async(e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setAvatar(file)
        const formData = new FormData()
        formData.append("image", e.target.files[0])
        await axios.put(`${server}/seller/shop/update-shop-avatar`, 
            formData,
        {   
            headers: {"Content-Type" : "multipart/form-data"},
            withCredentials: true
        }).then((res) => {
            dispatch(loadSeller())
            toast.success("Avatar updated Successfully!")
        }).catch((error)=> {
            toast.error(error.response.data)
        })
    }

    const updateHandler = async(e) => {
        e.preventDefault()
        await axios.put(`${server}/shop/update-seller-info`,
        {   name,
            description,
            address,
            phoneNumber,
            zipCode
        },
        { withCredentials: true}
        ).then((res) => {
            toast.success("Shop info updated succesffully!")
            dispatch(loadSeller())
        }).catch((error) => {
            toast.error(error.data.message)
        })
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center'>
            <div className="flex w-full md:w-[80%] flex-col justify-center my-4">
                <div className="w-full flex items-center justify-center">
                    <div className='relative'>
                        <img src={avatar? URL.createObjectURL(avatar) : `${backend_url}/${seller.avatar}`}
                            alt="seller avatar"
                            className='w-[200px] h-[200px] rounded-full cursor-pointer'
                        />
                        <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
                            <input type="file" id="image"
                                className='hidden'
                                onChange={handleImage} />
                            <label htmlFor="image">
                                <AiOutlineCamera />
                            </label>
                        </div>
                    </div>
                </div>

                { /* shop info */}
                <form
                    aria-aria-required={true}
                    className='flex flex-col items-center'
                    onSubmit={updateHandler}
                >
                    <div className="w-[100%] items-center md:w-[50%] mt-5 ">
                        <div className="w-full pl-[3%]">
                            <label className='block pb-2'>
                               Shop Name
                            </label>
                        </div>
                        <input
                            type="name"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={`${seller.name}`}
                        />
                    </div>
                    <div className="w-[100%] items-center md:w-[50%] mt-5 ">
                        <div className="w-full pl-[3%]">
                            <label className='block pb-2'>
                               Shop Description
                            </label>
                        </div>
                        <input
                            type="name"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value) }
                            placeholder={`${seller?.description ? seller.description : "Enter your shop description"}`}
                        />
                    </div>
                    <div className="w-[100%] items-center md:w-[50%] mt-5 ">
                        <div className="w-full pl-[3%]">
                            <label className='block pb-2'>
                               Shop Address
                            </label>
                        </div>
                        <input
                            type="name"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={`${seller?.address}`}
                        />
                    </div>
                    <div className="w-[100%] items-center md:w-[50%] mt-5 ">
                        <div className="w-full pl-[3%]">
                            <label className='block pb-2'>
                               Shop Phone Number
                            </label>
                        </div>
                        <input
                            type="number"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder={`${seller?.phoneNumber}`}
                        />
                    </div>
                    <div className="w-[100%] items-center md:w-[50%] mt-5 ">
                        <div className="w-full pl-[3%]">
                            <label className='block pb-2'>
                               Shop Zip Code
                            </label>
                        </div>
                        <input
                            type="number"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder={`${seller?.zipCode}`}
                        />
                    </div>
                    <div className="w-[100%] items-center md:w-[50%] mt-5">
                        <input
                            type="submit"
                            className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                            required
                            value="Update Shop"
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ShopSettings
