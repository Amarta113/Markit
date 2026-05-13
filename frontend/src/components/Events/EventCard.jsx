import React from 'react'
import mobile from "../../assets/mobile-img.jpg"
import styles from '../../styles/styles'
import CountDown from "./CountDown.jsx"

export default function EventCard({active}){

    return(
        <div className={`w-full block bg-white ${active? "unset": "mb-12"} rounded-lg lg:flex p-2`}>
            <div className='w-full lg:w-[50%] m-auto mr-3'>
                <img src={mobile} alt="product" />
            </div>
            <div className='w-full lg:[w-50%] m-auto flex flex-col justify-center'>
                <h2 className={`${styles.productTitle}`}>Iphone 17pro Max</h2>
                <p className="text-gray-600 text-md">
                    Experience the pinnacle of smartphone innovation with the iPhone 17 Pro Max. 
                    <br/>Featuring a stunning Super Retina XDR display, next-gen A19 Pro chip, and a 
                    revolutionary camera system, this device redefines what a phone can do. 
                    <br/>Available for a limited time at an exclusive event price — don't miss out!
                </p>
                <div className="flex py-2 justify-between">
                    <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                        1099$
                    </h5>
                    <h5 className='font-bold text-[20px] text-[#333] font-Roboto'>999$</h5>
                </div>
                <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>
                    120 Sold
                </span>
                <CountDown/>
            </div>
            
        </div>
    )
}