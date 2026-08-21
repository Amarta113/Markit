import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlistActions.js';
import { addToCart } from '../../../redux/actions/cartActions.js';

export default function Wishlist({ setOpenWishlist }) {
    const { wishlist } = useSelector(state => state.wishlist)
    const dispatch = useDispatch()

    const removeFromWishlistHandler = (data) => {
        dispatch(removeFromWishlist(data))
    }

    const totalPrice = wishlist.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)

    const addToCartHandler = (data) => {
        const newData = { ...data, qty: 1 }
        dispatch(addToCart(newData))
        dispatch(removeFromWishlist(data))
        setOpenWishlist(false)
    }

    return (
        // Full-screen overlay; click outside to close on all breakpoints
        <div
            className='fixed inset-0 w-full h-screen bg-black/40 z-30'
            onClick={() => setOpenWishlist(false)}
        >
            {/* Panel: full width on mobile, fixed 420px on sm+ */}
            <div
                className="fixed top-0 right-0 h-screen w-full sm:w-[420px] max-w-full flex flex-col bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {wishlist && wishlist.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center px-6">
                        <button
                            aria-label="Close wishlist"
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setOpenWishlist(false)}
                        >
                            <RxCross1 size={22} />
                        </button>
                        <AiOutlineHeart size={48} className="text-gray-300 mb-3" />
                        <h5 className="text-gray-500 text-base sm:text-lg text-center">
                            Your wishlist is empty
                        </h5>
                    </div>
                ) : (
                    <>
                        {/* Header — stays fixed at top of panel */}
                        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b shrink-0">
                            <div className="flex items-center">
                                <AiOutlineHeart size={22} />
                                <h5 className="pl-2 text-base sm:text-[20px] font-medium">
                                    {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                                </h5>
                            </div>
                            <button
                                aria-label="Close wishlist"
                                className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition"
                                onClick={() => setOpenWishlist(false)}
                            >
                                <RxCross1 size={22} />
                            </button>
                        </div>

                        {/* Scrollable item list — takes remaining space */}
                        <div className="flex-1 overflow-y-auto divide-y">
                            {wishlist.map((item, index) => (
                                <WishlistCartSingle
                                    key={index}
                                    data={item}
                                    removeFromWishlistHandler={removeFromWishlistHandler}
                                    addToCartHandler={addToCartHandler}
                                />
                            ))}
                        </div>

                        {/* Footer — pinned at bottom, safe-area aware on mobile */}
                        <div className="px-4 sm:px-5 py-4 border-t shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                            <div className="text-sm text-gray-500 text-center">
                                Total value: <span className="font-semibold text-[#d02222]">US${totalPrice}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const WishlistCartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
    const [value, setValue] = useState(1)
    const totalPrice = data.discountPrice * value;

    return (
        <div className="p-4">
            <div className="w-full flex items-start gap-3">
                <img
                    src={`${data?.images[0]?.url}`}
                    alt={data?.name}
                    className="w-16 h-16 sm:w-[80px] sm:h-[80px] object-cover rounded-md shrink-0"
                />

                <div className="flex-1 min-w-0">
                    <h1 className="text-sm sm:text-base font-medium truncate">{data?.name}</h1>
                    <h4 className="font-semibold text-[15px] sm:text-[17px] pt-1 text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>

                    <button
                        className="flex items-center gap-1.5 mt-2 text-xs sm:text-sm text-gray-600 hover:text-[#e44343] transition-colors"
                        onClick={() => addToCartHandler(data)}
                    >
                        <BsCartPlus size={16} />
                        Add to cart
                    </button>
                </div>

                <button
                    aria-label="Remove from wishlist"
                    className="p-1.5 rounded-full hover:bg-gray-100 transition shrink-0"
                    onClick={() => removeFromWishlistHandler(data)}
                >
                    <RxCross1 size={16} />
                </button>
            </div>
        </div>
    )
}