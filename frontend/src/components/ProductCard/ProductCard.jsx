import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailsCard from '../ProductDetailsCard/ProductDetailsCard.jsx'

const ProductCard = ({data}) => {
    const [click, setClick] = useState(false)
    const [open, setOpen] = useState(false)
    const d = data.name;
    const product_name = d.replace(/\s+/g, "-")
    return(
        <>
        <div className='bg-white shadow w-full h-[370px] rounded-lg shadow-sm p-3 relative cursor-pointer'>
            <div className="flex justify-end">
            </div>
            <Link to={`/products/${product_name}`}>
            <img src={data.image_Url[0].url} alt=""
            className='w-full h-[170px] object-contain'/>
            </Link>
            <Link to="/">
                <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
            </Link>
            <Link to={`/products/${product_name}`}>
                <h4 className='pb-3 font-[500]'>
                    {data.name.length > 40? data.name.slice(0, 40) + "...." : data.name}
                </h4>
                <div className='flex'>
                    <AiFillStar className='mr-2 cursor-pointer' size={20} color='#F6BA00'/>
                    <AiFillStar className='mr-2 cursor-pointer' size={20}  color='#F6BA00'/>
                    <AiFillStar className='mr-2 cursor-pointer' size={20}  color='#F6BA00'/>
                    <AiFillStar className='mr-2 cursor-pointer' size={20}  color='#F6BA00'/>
                    <AiOutlineStar className='mr-2 cursor-pointer' size={20}  color='#F6BA00'/>
                </div>
                <div className="py-2 flex items-center justify-between">
                    <div className='flex'>
                        <h5 className={`${styles.productDiscountPrice}`}>
                            {data.price === 0? data.price : data.discount_price} $
                        </h5>
                        <h4 className={`${styles.price}`}>
                            {data.price? data.price + " $": null}
                        </h4>
                    </div>
                    <span className='font-[400] text-[17px] text-[#68d284]'>
                        {data.total_sell}sold
                    </span>
                </div>
            </Link>
                {/* side options — stacked so heart and eye don’t overlap */}
                <div className="absolute right-2 top-2 flex flex-col items-center gap-2">
                    <button
                        type="button"
                        className="cursor-pointer border-0 bg-transparent p-0 leading-none"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setClick((c) => !c)
                        }}
                        title={click ? 'Remove from wishlist' : 'Add to wishlist'}
                        aria-pressed={click}
                    >
                        {click ? (
                            <AiFillHeart size={22} color="red" />
                        ) : (
                            <AiOutlineHeart size={22} color="#333" />
                        )}
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer border-0 bg-transparent p-0 leading-none text-[#333]"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setOpen((o) => !o)
                        }}
                        title="Quick view"
                        aria-pressed={open}
                    >
                        <AiOutlineEye size={22} color="#333" />
                    </button>
                    <button 
                    type="button"
                    className="cursor-pointer border-0 bg-transparent p-0 leading-none text-[#444]"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpen((o) => !o)
                    }}
                    title="Add to cart"
                    aria-pressed={open}
                    >
                    <AiOutlineShoppingCart size={25} color="#444" />
                    </button>
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
        </div>
        </>
    )
}

export default ProductCard;