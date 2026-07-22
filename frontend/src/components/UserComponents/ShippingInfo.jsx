import React, { useState } from 'react'
import styles from '../../styles/styles'
import { Country, State } from 'country-state-city'

const ShippingInfo = ({ user, country, setCountry, city, setCity, userInfo, setUserInfo, address1, setAddress1, address2, setAddress2, zipCode, setZipCode }) => {

    return (
        <div className='w-full md:w-[95%] bg-white rounded-md p-5 pb-8'>
            <h5 className='text-[18px] font-[500]'>Shipping address</h5>
            <br />
            <form>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={user && user.name}
                            required
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Email address
                        </label>
                        <input
                            type="text"
                            required
                            value={user && user.email}
                            className={`${styles.input}`} />
                    </div>
                </div>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Phone Number
                        </label>
                        <input
                            type="number"
                            required
                            value={user && user.phoneNumber}
                            className={`${styles.input} !w-[95%]`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Zip Code
                        </label>
                        <input
                            type="number"
                            value={zipCode}
                            required
                            onChange={(e) => setZipCode(e.target.value)}
                            className={`${styles.input}`} />
                    </div>
                </div>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Country
                        </label>
                        <select
                            className='w-[95%] border h-[40px] rounded-[5px]'
                            value={country}
                            onChange={e => setCountry(e.target.value)}>
                            <option className='block pb-2'>
                                Choose your country
                            </option>
                            {
                                Country && Country.getAllCountries().map(item => (
                                    <option key={item.isoCode}
                                        value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            City
                        </label>
                        <select
                            className='w-[95%] border h-[40px] rounded-[5px]'
                            value={country}
                            onChange={e => setCountry(e.target.value)}>
                            <option className='block pb-2'>
                                Choose your City
                            </option>
                            {
                                State && State.getStatesOfCountry(country).map(item => (
                                    <option
                                        key={item.isoCode}
                                        value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="w-full flex pb-3">
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Address1
                        </label>
                        <input
                            type="address"
                            value={address1}
                            required
                            className={`${styles.input}`}
                            onChange={(e) => setAddress1(e.target.value)} />
                    </div>
                    <div className="w-[50%]">
                        <label className='block pb-2'>
                            Address2
                        </label>
                        <input
                            type="address"
                            value={address2}
                            required
                            className={`${styles.input}`}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                </div>
                <div></div>
            </form>
            <h5
                className='text-[18px] cursor-pointer inline-block'
                onClick={() => setUserInfo(!userInfo)}>
                Choose from saved address
            </h5>
            {
                userInfo && (
                    <div>
                        {
                            user && user.addresses.map((item, index) => (
                                <div className="w-full flex mt-l">
                                    <input
                                        type="checkbox"
                                        className='mr-3'
                                        value={item.addressType}
                                        onClick={() => setAddress1(item.address1) ||
                                            setAddress2(item.address2) ||
                                            setZipCode(item.zipCode) ||
                                            setCountry(item.setCountry) ||
                                            setCity(item.setCity)}
                                    />
                                    <h2>{item.addressType}</h2>
                                </div>
                            ))}
                    </div>
                )
            }
        </div>
    )
}

export default ShippingInfo
