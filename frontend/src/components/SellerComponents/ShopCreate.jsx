import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {toast} from "react-toastify"
import styles from "../../styles/styles.js"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../server.js'

export default function ShopCreate () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [shopName, setShopName] = useState()
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState()
    const [avatar, setAvatar] = useState()
    const [phoneNumber, setPhoneNumber] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios
        .post(`${server}/user/login-user`, {
            email, password
        },
        {
          withCredentials: true,
        })
        .then((res) => {
            toast.success("Login successful!")
            console.log(res.data)
            navigate("/")
            window.location.reload();

        })
        .catch(err => {
            toast.error("Login failed!")
            console.log(err)
        })

    }

    const handleFileInputChange= (e) => {

    }
    return (
        <div className="min-h-screen bg-slate-700 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Register as a Seller
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]'>
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name' 
                                className='block tex-sm font-medium text-gray-700' >
                                Shop Name 
                            </label>
                            <div className="mt-1">
                                <input 
                                type="text" 
                                name="name" 
                                required 
                                placeholder='Shop name'
                                value={shopName} 
                                onChange={(e) => setShopName(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text'/>
                            </div>
                        </div>
                        <div>
                            <label 
                            htmlFor='email' 
                            className='block text-sm font-medium text-gray-700' >
                                Phone Number</label>
                            <div className="mt-1">
                                <input type="number" name="phone-number" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text'/>
                            </div>
                        </div>
                        <div>
                            <label 
                            htmlFor='address' 
                            className='block text-sm font-medium text-gray-700' >
                                Address</label>
                            <div className="mt-1">
                                <input 
                                type="text" 
                                name="text" 
                                placeholder='Shop address'
                                required 
                                value={address} onChange={(e) => setAddress(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text'/>
                            </div>
                        </div>
                         <div>
                            <label 
                            htmlFor='zip-code' 
                            className='block text-sm font-medium text-gray-700' >
                                Zip Code</label>
                            <div className="mt-1">
                                <input 
                                type="number" 
                                name="zip-code" 
                                placeholder='54000'
                                required 
                                value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text'/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700' >Password</label>
                            <div className="mt-1 relative">
                                <input type={visible? "text" : "password"}  name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text'/>
                                {visible? (
                                    <AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={25} 
                                    onClick={() => setVisible(false)} />
                                ): (
                                    <AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={25} 
                                onClick={() => setVisible(true)} />
                                )}
                            </div>
                        </div>
                        <div className={`${styles.normalFlex} justify-between`}>
                            <div className={`${styles.normalFlex}`}>
                                <input type='checkbox' name='remember-me' id="remember-me" 
                                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'/>
                                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                                    Remember Me
                                </label>
                            </div>
                            <div className='text-sm'>
                                <a href='.forget-password'
                                    className='font-medium text-blue-600 hover:text-blue-500'
                                >Forget your password?</a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-700 f'>Submit</button>
                        </div>
                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to="/shop-login" className='text-blue-600 pl-2'>Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

