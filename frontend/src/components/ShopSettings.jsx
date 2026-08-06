import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { backend_url } from '../server'
import { AiOutlineCamera } from 'react-icons/ai'
import styles from '../styles/styles'

const ShopSettings = () => {
    const { seller } = useSelector(state => state.seller)
    const [avatar, setAvatar] = useState()

    const handleImage = async(e) => {
        e.preventDefault()
        const file = e.target.files[0]
        setAvatar(file)
        const formData = new FormData()
        formData.append("image", e.target.files[0])
    }
    const updateHandler = async(e) => {
        e.preventDefault()
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
                            value={seller.name}
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
                            value={seller?.description? seller.description : null}
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
                            value={seller?.address}
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
                            value={seller?.phoneNumber}
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
                            value={seller?.zipCode}
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
