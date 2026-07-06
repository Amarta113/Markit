import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/markit-logo.jpg'
import styles from '../../styles/styles'
import { categoriesData, productData } from "../../static/data";
import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart, AiFillProduct } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { LayoutGrid, TreeDeciduous } from 'lucide-react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import { CgProfile } from 'react-icons/cg'
import DropDown from "./DropDown.jsx"
import Navbar from "./Navbar.jsx"
import { useSelector } from "react-redux"
import { backend_url } from '../../server.js';
import Cart from '../Cart/Cart.jsx';
import Wishlist from '../Wishlist/Wishlist.jsx';

export default function Header({ activeHeading }) {
    const { isAuthenticated, user, loading } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [active, setActive] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const [openWishlist, setOpenWishlist] = useState(false)
    const [open, setOpen] = useState(false)
    const { cart } = useSelector(state => state.cart)
    const { wishlist } = useSelector(state => state.wishlist)
    const {allProducts} = useSelector(state => state.products)

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts = allProducts.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchData(filteredProducts)
    }
    useEffect(function () {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 70) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    }, [])

    return (
        <> {
            loading ? (
                null
            ) :
                (<>
                        <div className={`${styles.section} hidden md:block`}>
                            <div className="h-[50px] my-[20px] flex items-center justify-between">
                                <div>
                                    <Link to='/'>
                                        <img src={logoImg} alt='logo' className='w-[140px] bg-transparent' />
                                    </Link>
                                </div>
                                {/* search bar */}
                                <div className='w-[50%] relative'>
                                    <input type='text'
                                        placeholder='Search for products...'
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className='h-[40px] w-full text-sm px-2 border-[2px] border-dark-blue-300 rounded-full '
                                    />
                                    <AiOutlineSearch
                                        size={30}
                                        className='absolute right-2 top-1.5 cursor-pointer'
                                    />
                                    {searchData && searchData.length !== 0 ? (
                                            <div className='absolute min-h-[30vh] bg-slate-70 shadow-sm z-[9] p-4'>
                                                        {searchData && searchData.map((i, index) => {
                                                            const d = i.name
                                                            const Product_name = d.replace(/\s+/g, "-")
                                                            return (
                                                                <Link to={`/products/${Product_name}`} key={index}>
                                                                    <div className="w-full flex items-start py-3">
                                                                        <img 
                                                                            src={`${backend_url}${i.images[0]}`} 
                                                                            alt='product image'
                                                                            className='w-[40px] h-[40px] mr-[10px]'
                                                                        />
                                                                        <h1>{i.name}</h1>
                                                                    </div>
                                                                </Link>
                                                            )})}
                                            </div>
                                        ) : null}
                                </div>
                                <div className="bg-black text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
                                    <Link to="/shop-create">
                                        <h1 className='text-white font-bold font-italic flex items-center'>
                                            Become Seller
                                            <IoIosArrowForward className='ml-1' />
                                        </h1>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""} transition hidden md:flex items-center justify-between w-full bg-[#ddd8ce] h-[70px]`}>
                            <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
                                {/*categories */}
                                <div>
                                    <div className='relative h-[60px] mt-[10px] w-[270px] 1000px:block'>
                                        <button className={`h-[100%] w-full flex justify-between items-center pl-12 bg-white font-sans text-lg font-[600] select-none rounded-t-md`}>
                                            <span className='flex items-center gap-2'>
                                                <LayoutGrid size={22} />
                                                <span>All Categories</span>
                                            </span>
                                            <IoIosArrowDown
                                                size={22}
                                                className='absolute right-2 top-5 cursor-pointer'
                                                onClick={() => setDropDown(!dropDown)}
                                            />
                                        </button>
                                    </div>
                                    {dropDown ? (
                                        <DropDown
                                            categoriesData={categoriesData}
                                            setDropDown={setDropDown}
                                        />) : null}
                                </div>
                                {/* navbar items */}
                                <div className={`${styles.normalFlex}`}>
                                    <Navbar active={activeHeading} />
                                </div>
                                <div className={`${styles.normalFlex}`}>
                                    <div className={`${styles.normalFlex}`}>
                                        <div className="relative cursor-pointer mr-[15px]"
                                            onClick={() => setOpenWishlist(true)}>
                                            <AiOutlineHeart size={30} color='rgb(255, 255, 255 / 83%)' />
                                            <span className="absolute -top-1 -right-1 rounded-full bg-[#40d132] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1</span>
                                        </div>
                                    </div>
                                    <div className="relative cursor-pointer mr-[15px]"
                                        onClick={() => setOpenCart(true)}>
                                        <AiOutlineShoppingCart
                                            size={30}
                                            className='cursor-pointer'
                                            color='rgb(255, 255, 255 / 83%)' />
                                        <span className="absolute -top-1 -right-1 rounded-full bg-[#40d132] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1</span>
                                    </div>
                                    <div className="relative cursor-pointer mr-[15px]">
                                        {!isAuthenticated ? (
                                            <div className='bg-white border border-gray-300 hover:bg-gray-50 shadow-sm rounded-md px-2 py-1'>
                                                <Link
                                                    to={"/login"}
                                                    className="cursor-pointer text-[18px] pr-[10px] text-[#000000b7]"
                                                >
                                                    Login |
                                                </Link>
                                                <Link
                                                    to={"/sign-up"}
                                                    className="text-[18px] pr-[10px] text-[#000000b7]"
                                                >
                                                    Sign up
                                                </Link>
                                            </div>
                                        ) : (
                                            <div>
                                                <Link to={"/profile"}>
                                                    <img
                                                        src={`${user?.avatar?.url}`}
                                                        alt="Image"
                                                        className="w-[60px] rounded-full h-[60px] border-[3px] border-white cursor-pointer"
                                                    />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    {/* cart popup */}
                                    {
                                        openCart ? (
                                            <Cart setOpenCart={setOpenCart} />
                                        ) : null
                                    }
                                    {/* wishlist popup */}
                                    {
                                        openWishlist ? (
                                            <Wishlist setOpenWishlist={setOpenWishlist} />
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Mobile header*/}
                        <div className={`${active === true ? "shadow-sm fixed top-0 left-0 z-10" : ""} 
                            w-full h-[70px] flex md:hidden items-center justify-between px-4 bg-[#fff] z-50 top-0 left-0 shadow-sm`}>
                            <div>
                                <BiMenuAltLeft
                                    size={40}
                                    className="ml-4 cursor-pointer"
                                    onClick={() => setOpen(true)}
                                />
                            </div>
                            <div>
                                <Link to="/">
                                    <img src={logoImg} className='w-[140px] bg-transparent'  />
                                </Link>
                            </div>
                            <div>
                                <div className="relative mr-[20px] cursor-pointer"
                                    onClick={() => setOpenCart(true)}>
                                    <AiOutlineShoppingCart size={30} className='cursor-pointer' />
                                    <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                                        {cart && cart.length}
                                    </span>
                                </div>
                            </div>
                            {/* cart popup*/}
                            {openCart ? (<Cart setOpenCart={setOpenCart} />) : null}
                            {/* wishlist popup */}
                            {openWishlist ? (<Wishlist setOpenWishlist={setOpenWishlist} />) : null}
                        </div>
                        {/* Header sidebar */}
                        {open && (
                            <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
                                <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                                    <div className="flex w-full justify-between p-4">
                                        <div>
                                            <div className='relative mr-[15px] cursor-pointer'
                                                onClick={() => { setOpenWishlist(true); setOpen(false); }}>
                                                <AiOutlineHeart size={30} className='mt-5 ml-3 cursor-pointer' />
                                                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                                                    {wishlist && wishlist.length}
                                                </span>
                                            </div>
                                        </div>
                                        <RxCross1 size={30}
                                            className="ml-4 mt-5 cursor-pointer"
                                            onClick={() => setOpen(false)}
                                        />
                                    </div>
                                    <div className="my-8 w-[92%] m-auto h-[40px] relative">
                                        <input type="search"
                                            placeholder='Search products...'
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className='w-full h-[40px] px-2 border-[2px] border-[#3597db] rounded-md'
                                        />
                                        {searchData && (
                                            <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                                                {searchData.map((prod, i) => {
                                                    return (
                                                        <Link to={`/products/${prod._id}`} key={prod._id || i}>
                                                            <div className="flex items-center cursor-pointer">
                                                                <img src={prod?.images?.[0]?.url}
                                                                    alt="product img"
                                                                    className='w-[50px] mr-2' />
                                                                <h5>{prod.name}</h5>
                                                            </div>
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    <Navbar active={activeHeading} mobile={true}/>
                                    <div className={`${styles.button} ml-4 rounded-xl text-[20px] text-white`}>
                                        <Link to="/shop-create">
                                            Become Seller
                                        </Link>
                                    </div>
                                    <div className="flex w-full justify-center my-[30px]">
                                        {
                                            !isAuthenticated ? (<>
                                                <Link
                                                    to={"/login"}
                                                    className="cursor-pointer text-[18px] pr-[10px] text-[#000000b7]"
                                                >
                                                    Login /
                                                </Link>
                                                <Link
                                                    to={"/sign-up"}
                                                    className="text-[18px] pr-[10px] text-[#000000b7]"
                                                >
                                                    Sign up
                                                </Link>
                                            </>) : (<div>
                                                <Link to={"/profile"}>
                                                    <img
                                                        src={`${user?.avatar?.url}`}
                                                        alt="Image"
                                                        className="w-[60px] rounded-full h-[60px] border-[3px] border-[#14febc] cursor-pointer"
                                                    />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
        }
        </>
    )
}