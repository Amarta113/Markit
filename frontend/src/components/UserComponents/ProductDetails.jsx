import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../../redux/actions/wishlistActions"
import { addToCart } from "../../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({ data }) => {
    const [count, setCount] = useState(1)
    const [click, setClick] = useState(false)
    const [select, setSelect] = useState()
    const navigate = useNavigate()

    const incrementCount = () => {
        setCount(count + 1)
    }
    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }
    const handleMessageSubmit = () => {
        navigate('/inbox?conversation=507ebjver884ehfdjeriv84')
    }
    return (
        <div className="bg-white">
            {data ? (
                <div className={`${styles.section} w-[90%] width-80per-800px`}>
                    <div className='w-full py-5'>
                        <div className="block w-full flex-800px">
                            <div className='w-full width-800px-50'>
                                <img
                                    src={data.image_Url?.[select]?.url}
                                    alt="img"
                                    className='w-[80%] cursor-pointer'
                                />
                                <div className='w-full flex'>
                                    {data &&
                                        data?.images.map((img, i) => (
                                            <div className={`cursor-pointer`} key={i}>
                                                <img
                                                    src={`${img?.url}`}
                                                    alt="Images"
                                                    className="h-[200px] overflow-hidden mr-3 mt-3"
                                                    onClick={() => setSelect(i)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                {/* closing dev*/}
                            </div>
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        {data.discount_price}
                                    </h4>
                                    <h3 className={`${styles.price}`}>
                                        {data.price ? data.price + "$" : null}
                                    </h3>
                                </div>
                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button
                                            className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                            onClick={decrementCount}>
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[8px]">{count}</span>
                                        <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                            onClick={incrementCount}>
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => removeFromWishListhandler(data)}
                                                color={click ? "red" : "#333"}
                                                title="Remove from wishlist"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => addToWishListhandler(data)}
                                                color={click ? "red" : "#333"}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}>
                            <span className='text-white flex items-center'>
                                Add to cart <AiOutlineShoppingCart className='ml-1' />
                            </span>
                        </div>
                        <div className="flex items-center pt-8">
                            <img src={data.shop.shop_avatar.url} alt="shop avatar"
                                className='w-[50px] h-[50px] rounded-full mr-2' />
                            <div className='pr-8'>
                                <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                    {data.shop.name}
                                </h3>
                                <h5 className='pb-3 text-[15px]'>
                                    ({data.shop.ratings}) Ratings
                                </h5>
                            </div>
                            <div className={`${styles.button} !bg-[#6443d1] mt-4 !rounded !h-11`}
                                onClick={handleMessageSubmit}>
                                <span className='text-white flex items-center'>
                                    Send Message <AiOutlineMessage className='ml-1' />
                                </span>
                            </div>
                        </div>
                    </div>
                    <ProducDetailsInfo data={data} />
                    <br />
                    <br />
                </div>)
                : null
            }
        </div>
    )
}

const ProducDetailsInfo = () => {
    const [active, setActive] = useState(1)

    return (
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded'>
            <div className="w-full flex justify-between-border-b pt-10 pb-2">
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'}
                        onClick={() => setActive(1)}>
                        Product Details
                    </h5>
                    {
                        active === 1 ? (
                            <div className={`${styles.active_indicator}`} />

                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'}
                        onClick={() => setActive(2)}>
                        Product Reviews
                    </h5>
                    {
                        active === 2 ? (
                            <div className={`${styles.active_indicator}`} />

                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className={'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'}
                        onClick={() => setActive(3)}>
                        Seller Information
                    </h5>
                    {
                        active === 3 ? (
                            <div className={`${styles.active_indicator}`} />

                        ) : null
                    }
                </div>
            </div>
            {
                active === 1 ? (
                    <>
                        <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                            This premium product is manufactured using high-quality materials and
                            undergoes strict quality checks to ensure customer satisfaction. Its
                            modern design, durability, and ease of use make it suitable for everyday
                            use. Whether you're purchasing it for personal use or as a gift, it offers
                            outstanding performance and excellent value. For best results, follow the
                            recommended usage instructions and care guidelines provided by the seller
                        </p>
                        <p className='py-2 text-[18px] leading-8 pb-10 whitespace-pre-line'>
                            This product is carefully selected to provide excellent quality,
                            durability, and value for money. Designed with customer
                            satisfaction in mind, it offers reliable performance and a
                            user-friendly experience. Review the product specifications,
                            images, and seller information before placing your order.
                        </p>
                    </>
                ) : null
            }

            {
                active === 2? (
                    <div className='w-full justify-center min-h-[40vh] flex items-center'>
                    <p>No Reviews Yet</p>
                    </div>
                ): null
            }
            
            {
                active === 3? (
                    <></>
                ): null
            }
        </div>
    )
}

export default ProductDetails;