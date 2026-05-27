import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from '../../styles/styles';
import { BsCartPlus } from "react-icons/bs";

export default function Wishlist({ setOpenWishlist }) {
    const cartData = [
        {
            name: "Iphone 14 Pro Max",
            description: "test",
            price: 231,
        },

        {
            name: "Iphone 14 Pro ",
            description: "test",
            price: 231,
        },

        {
            name: "Iphone",
            description: "test",
            price: 231,
        }

    ]

    const totalItems = cartData.length
    const totalAmount = cartData.reduce((sum, item) => sum + item.price, 0)

    return (
        <div className='fixed top-0 left-0 w-full h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] flex flex-col justify-between shadow-sm bg-white">
                <div>
                    <div className="flex w-full justify-end pt-5 pr-5">
                        <RxCross1
                            size={25}
                            className="cursor-pointer"
                            onClick={() => setOpenWishlist(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.normalFlex} p-4`}>
                        <AiOutlineHeart size={25} />
                        <h5 className='pl-2 text-[20px] font-[500]'>{totalItems} items</h5>
                    </div>
                    {/* cart single item*/}
                    <br />
                    <div className="w-full border-t">
                        {cartData && cartData.map((i, index) => {
                            return <CartSingle key={index} data={i} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1)
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center relative">
                <RxCross1 className='cursor-pointer'/>
                 <img src="https://img.drz.lazcdn.com/static/pk/p/9196fe02e9a05424ba5f01d04a3e63cd.jpg_400x400q75.avif"
                            alt="Image"
                            className="w-[80px] h-min ml-2 mr-2 rounded-[5px]" />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>
                <div className="absolute top-0 right-0 mt-10">
                    <BsCartPlus size={20} className="cursor-pointer shadow-lg" title="Add to cart"/>
                </div>
            </div>
        </div>
    )
}