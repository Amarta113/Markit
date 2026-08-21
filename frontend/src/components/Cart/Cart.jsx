import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server.js';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions.js';
import { toast } from 'react-toastify';

export default function Cart({ setOpenCart }) {
    const { cart } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const removeFromCartHandler = (data) => {
        dispatch(removeFromCart(data))
    }
    const totalPrice = cart.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
    )
    const quantityChangeHandler = (data) => {
        dispatch(addToCart(data))
    }

    return (
        // Full-screen overlay; click outside to close on all breakpoints
        <div
            className='fixed inset-0 w-full h-screen bg-black/40 z-30'
            onClick={() => setOpenCart(false)}
        >
            {/* Panel: full width on mobile, fixed 420px on sm+ */}
            <div
                className="fixed top-0 right-0 h-screen w-full sm:w-[420px] max-w-full flex flex-col bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {cart && cart.length === 0 ? (
                    <div className="w-full h-full flex flex-col items-center justify-center px-6">
                        <button
                            aria-label="Close cart"
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
                            onClick={() => setOpenCart(false)}
                        >
                            <RxCross1 size={22} />
                        </button>
                        <IoBagHandleOutline size={48} className="text-gray-300 mb-3" />
                        <h5 className="text-gray-500 text-base sm:text-lg text-center">
                            Your cart is empty
                        </h5>
                    </div>
                ) : (
                    <>
                        {/* Header stays fixed at top of panel */}
                        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b shrink-0">
                            <div className="flex items-center">
                                <IoBagHandleOutline size={22} />
                                <h5 className="pl-2 text-base sm:text-[20px] font-medium">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                </h5>
                            </div>
                            <button
                                aria-label="Close cart"
                                className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition"
                                onClick={() => setOpenCart(false)}
                            >
                                <RxCross1 size={22} />
                            </button>
                        </div>

                        {/* Scrollable item list, takes remaining space */}
                        <div className="flex-1 overflow-y-auto divide-y">
                            {cart.map((item, i) => (
                                <CartSingle
                                    key={i}
                                    item={item}
                                    quantityChangeHandler={quantityChangeHandler}
                                    removeFromCartHandler={removeFromCartHandler}
                                />
                            ))}
                        </div>

                        {/* Footer — pinned at bottom, safe-area aware on mobile */}
                        <div className="px-4 sm:px-5 py-4 border-t shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                            <Link to="/checkout" onClick={() => setOpenCart(false)}>
                                <div className="h-[48px] flex items-center justify-center w-full bg-[#e44343] hover:bg-[#d02222] transition-colors rounded-[5px]">
                                    <h1 className="text-white text-[16px] sm:text-[18px] font-semibold">
                                        Checkout Now &middot; USD ${totalPrice}
                                    </h1>
                                </div>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const CartSingle = ({ item, quantityChangeHandler, removeFromCartHandler }) => {
    const [value, setValue] = useState(item.qty)
    const totalPrice = item.discountPrice * value;

    const increment = (data) => {
        if (item.stock < value) {
            toast.error("Product stock limited!")
        } else {
            setValue(value + 1)
            quantityChangeHandler({ ...data, qty: value + 1 })
        }
    }

    const decrement = (data) => {
        const next = value === 1 ? 1 : value - 1
        setValue(next)
        quantityChangeHandler({ ...data, qty: next })
    }

    return (
        <div className="p-4">
            <div className="w-full flex items-start sm:items-center gap-3">
                {/* Product image */}
                {item?.images[0].url && (
                    <img
                        src={`${item.images[0].url}`}
                        alt={item?.name}
                        className="w-16 h-16 sm:w-[80px] sm:h-[80px] object-cover rounded-md shrink-0"
                    />
                )}

                <div className="flex-1 min-w-0">
                    <h1 className="text-sm sm:text-base font-medium truncate">{item?.name}</h1>
                    <h4 className="font-normal text-[13px] sm:text-[15px] text-gray-500">
                        ${item?.discountPrice} &times; {value}
                    </h4>
                    <h4 className="font-semibold text-[15px] sm:text-[17px] pt-1 text-[#d02222] font-Roboto">
                        US${totalPrice}
                    </h4>

                    {/* Quantity stepper */}
                    <div className="flex items-center mt-2">
                        <button
                            aria-label="Decrease quantity"
                            className="bg-[#a7abb14f] rounded-full w-[26px] h-[26px] flex items-center justify-center"
                            onClick={() => decrement(item)}
                        >
                            <HiOutlineMinus size={14} color="#7d879c" />
                        </button>
                        <span className="px-3 text-sm font-medium">{value}</span>
                        <button
                            aria-label="Increase quantity"
                            className="bg-[#e44343] rounded-full w-[26px] h-[26px] flex items-center justify-center"
                            onClick={() => increment(item)}
                        >
                            <HiPlus size={14} color="#fff" />
                        </button>
                    </div>
                </div>

                <button
                    aria-label="Remove item"
                    className="p-1.5 rounded-full hover:bg-gray-100 transition shrink-0"
                    onClick={() => removeFromCartHandler(item)}
                >
                    <RxCross1 size={16} />
                </button>
            </div>
        </div>
    )
}