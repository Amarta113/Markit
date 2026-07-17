import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross1 } from 'react-icons/rx'
import { Country, State } from 'country-state-city'
import { deleteAddress, updateAddresses } from '../../../redux/actions/user'
import { toast } from 'react-toastify'

const Address = () => {
    const [open, setOpen] = useState(false)
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState()
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [addressType, setAddressType] = useState("")
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const addressTypeData = [
        { name: "Default" },
        { name: "Home" },
        { name: "Office" }
    ]
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!")
        } else {
            dispatch(updateAddresses(country, city, address1, address2, addressType))
            setOpen(false)
            setCountry("")
            setCity("")
            setZipCode(null)
            setAddress1("")
            setAddress2("")
            setAddressType("")
        }
    }

    const handleDelete = (address) => {
        dispatch(deleteAddress(address._id))
    }
    return (
        <div className='w-full px-5'>
            {
                open && (
                    <div className="fixed w-full h-screen bg-black top-0 left-0 flex items-center justify-center">
                        <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll ">
                            <div className='w-full flex justify-end p-3'>
                                <RxCross1
                                    size={30}
                                    className='cursor-pointer'
                                    onClick={() => setOpen(false)} />
                            </div>
                        </div>
                        <h1 className='text-center text-[25px] font-Poppins'>
                            Add New Address
                        </h1>
                        <div className="w-full">
                            <form
                                onSubmit={handleSubmit}
                                aria-required
                                className='w-full' >
                                <div className='w-full block p-4'>
                                    <div className="w-full pb-2">
                                        <label
                                            className='block pb-2'>
                                            Country
                                        </label>
                                        <select
                                            name="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            className='w-[95%] border h-[40px] rounded-[5px]'
                                        >
                                            <option value="" className='block border pb-2'>
                                                Choose your Country
                                            </option>
                                            {
                                                Country && Country.getAllCountries().map((item) => (
                                                    <option className='block pb-2'
                                                        key={item.isoCode}
                                                        value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="w-full pb-2">
                                        <label
                                            className='block pb-2'>
                                            City
                                        </label>
                                        <select
                                            name="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className='w-[95%] border h-[40px] rounded-[5px]'
                                        >
                                            <option value="city" className='block border pb-2'>
                                                Choose your City
                                            </option>
                                            {
                                                State && State.getStatesOfCountry(country).map((item) => (
                                                    <option className='block pb-2'
                                                        key={item.isoCode}
                                                        value={item.isoCode}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="w-full pb-2">
                                        <label
                                            className='block pb-2'>
                                            Address 1
                                        </label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address1}
                                            onChange={(e) => setAddress1(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full pb-2">
                                        <label className='block pb-2'>
                                            Address 2
                                        </label>
                                        <input
                                            type="address"
                                            className={`${styles.input}`}
                                            required
                                            value={address2}
                                            onChange={(e) => setAddress2(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full pb-2">
                                        <label className='block pb-2'>
                                            Zip Code
                                        </label>
                                        <input
                                            type="number"
                                            className={`${styles.input}`}
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full pb-2">
                                        <label
                                            className='block pb-2'>
                                            Address Type
                                        </label>
                                        <select
                                            name="addressType"
                                            value={addressType}
                                            onChange={(e) => setAddressType(e.target.value)}
                                            className='w-[95%] border h-[40px] rounded-[5px]'
                                        >
                                            <option value="" className='block border pb-2'>
                                                Select Address Type
                                            </option>
                                            {
                                                addressTypeData && addressTypeData.map((item, i) => (
                                                    <option className='block pb-2'
                                                        key={i}
                                                        value={item.name}>
                                                        {item.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='w-full pb-2'>
                                        <input
                                            type="submit"
                                            className={`${styles.input} mt-5 cursor-pointer`}
                                            required
                                            readOnly />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            <div className='flex w-full items-center justify-between'>
                <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'
                    onClick={() => setOpen(true)}
                >My Addresses</h1>
                <div className={`${styles.button} rounded-md`}>
                    <span className='text-[#fff]'>Add New</span>
                </div>
            </div>
            <br />
            {user && user.addresses.map((item, index) => (
                <div 
                    className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between"
                    key={index}
                >
                    <div className="flex items-center">
                        <h5 className='pl-5 font-[600]'>{item.addressType}</h5>
                    </div>
                    <div className="pl-8 flex items-center">
                        <h6>{item.address1} {item.address2}</h6>
                    </div>
                    <div className="pl-8 flex items-center">
                        <h6>{user && user.phoneNumber}</h6>
                    </div>
                    <div className="min-2-[10%] flex items-center pl-8">
                        <AiOutlineDelete 
                        size={25} 
                        className="cursor-pointer"
                        onClick={() => handleDelete(item)} />
                    </div>
                </div>
            )
            )}
            {
                user && user.addresses.length === 0 && (
                <h5 className='text-center pt-8 text-[18px]'>
                    You don't have any saved address...
                </h5>
                )
            }
        </div>
    )
}

export default Address
