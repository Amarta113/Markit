import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from '../../styles/styles';
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlistActions';
import { backend_url } from '../../server';

export default function Wishlist({ setOpenWishlist }) {
    const { wishlist } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data))
    }

    const totalPrice = wishlist.reduce((acc, item) => acc + item.qty * item.discountPrice)

    const addToCartHandler = (data) => {
        const newData = {...data, qty:1}
        dispatch(addToWishlist(newData))
        setOpenWishlist(false)
    }

    return (
        <div className='fixed top-0 left-0 w-full h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] flex flex-col justify-between shadow-sm bg-white">
                {wishlist && wishlist.length === 0 ? (
                    <div className="w-full h-screen flex items-center justify-center">
                        <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                            <RxCross1
                                siz={25}
                                className='cursor-pointer'
                                onClick={() => setOpenWishlist(false)} />
                        </div>
                        <h5>Wishlist Items is empty</h5>
                    </div>
                ) :
                   ( <div>
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
                            <h5 className='pl-2 text-[20px] font-[500]'>{wishlist && wishlist.length} items</h5>
                        </div>
                        {/* cart single item*/}
                        <br />
                        <div className="w-full border">
                            {wishlist && wishlist.map((i, index) => {
                                return <WishlistCartSingle 
                                key={index}
                                data={i} 
                                removeFromWishlistHandler={removeFromWishlistHandler}
                                addToCartHandler = {addToCartHandler}
                                />
                            })}
                        </div>
                    </div>
                   )
                }
            </div>
        </div>
    )
}

const WishlistCartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
    const [value, setValue] = useState(1)
    const totalPrice = data.discountPrice * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center relative">
                <RxCross1 
                className='cursor-pointer' 
                onClick={() => removeFromWishlistHandler(data)}
                />
                <img 
                    src={`${backend_url}${data?.image[0]}`}
                    alt="Image"
                    className="w-[130px] h-min ml-2 mr-2 rounded-[5px]" />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className='font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto'>US${totalPrice}</h4>
                </div>
                <div className="absolute top-0 right-0 mt-10">
                    <BsCartPlus
                        size={20}
                        className="cursor-pointer shadow-lg"
                        onClick={() => addToCartHandler(data)}
                        title="Add to cart" />
                </div>
            </div>
        </div>
    )
}