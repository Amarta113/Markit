import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-toastify"
import styles from "../../styles/styles.js"
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../server.js'

export default function ShopCreate() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [avatar, setAvatar] = useState()
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("phoneNumber", phoneNumber);
            formData.append("zipCode", zipCode);
            formData.append("address", address);
            formData.append("file", avatar);

            const { data } = await axios.post(
                `${server}/seller/create-seller`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (data?.success) {
                toast.success("Shop Registration is successful! Please check your email for the verification code.")
                setName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setPhoneNumber();
                setZipCode(0);
                setAvatar(null);
                setIsLoading(false)
            } else {
                setIsLoading(false)
                toast.error(data?.message || "Registration failed")
            }
        }
        catch (error) {
            const errorMessage = error?.response?.data?.message || error?.message || "An error occurred"
            toast.error(errorMessage)
            console.error("Error during signup: ", error)
        }
        finally {
            setIsLoading(false)
        }
    }

    function handleFileInputChange(e) {
        const file = e.target.files[0]
        setAvatar(file)
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
                                className='block text-sm font-medium text-gray-700' >
                                Shop Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder='Shop name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='email'
                                className='block tex-sm font-medium text-gray-700' >
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="email"
                                    required
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm palceholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor='phone number'
                                className='block text-sm font-medium text-gray-700' >
                                Phone Number</label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    name="phone-number"
                                    required
                                    placeholder="e.g: +92231241213"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
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
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700' >Password</label>
                            <div className="mt-1 relative">
                                <input type={visible ? "text" : "password"} name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text' />
                                {visible ? (
                                    <AiOutlineEye className="absolute right-2 top-2 cursor-pointer" size={25}
                                        onClick={() => setVisible(false)} />
                                ) : (
                                    <AiOutlineEyeInvisible className="absolute right-2 top-2 cursor-pointer" size={25}
                                        onClick={() => setVisible(true)} />
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="avatar"
                                className='block text-sm font-medium text-gray-700'></label>
                            <div className='mt-2 flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden' >
                                    {
                                        avatar ?
                                            (<img src={URL.createObjectURL(avatar)} alt='avatar' className="h-full w-full object-cover rounded-full" />) :
                                            (<RxAvatar className='h-8 w-8' />)
                                    }
                                </span>
                                <label htmlFor='file-input' className='ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 bg:white hover:bg-gray-50 '>
                                    <span>Upload a file</span>
                                    <input type='file' name='avatar' id='file-input' accept='.jpg, .jpeg, .png'
                                        onChange={handleFileInputChange}
                                        className='sr-only '
                                    />
                                </label>
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

