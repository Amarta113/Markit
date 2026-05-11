import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/markit-logo.jpg'
import styles from '../../styles/styles'
import { categoriesData, productData } from "../../static/data";
import { AiOutlineSearch,AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import {IoIosArrowDown, IoIosArrowForward} from 'react-icons/io'
import {LayoutGrid} from 'lucide-react'
import { CgProfile } from 'react-icons/cg'
import DropDown from "./DropDown.jsx"
import Navbar from "./Navbar.jsx"

export default function Header({activeHeading}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchData, setSearchData] = useState(null)
    const [active, setActive] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts =  productData.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
          );
        setSearchData(filteredProducts)
    }
    useEffect(function () {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 70){
                setActive(true)
            }else {
                setActive(false)
            }
        })
    }, [])
  
    return (
        <>
        <div className={`${styles.section}`}>
            <div className="h-800px-50 my-800px-20 h-[50px] my-[20px] flex items-center justify-between">
                <div>
                    <Link to='/'>
                        <img src={logoImg} alt='logo' className='w-[140px]' />
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
                 {
                 searchData && searchData.length !== 0? (
                    <div className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'>
                        {searchData && searchData.map((i, index) => {
                            const d = i.name
                            const Product_name = d.replace(/\s+/g, "-")
                            return (
                                <Link to={`/product/${Product_name}`}>
                                    <div className="w-full flex items-start-py-3">
                                        <img src={i.image_Url[0].url} alt=''
                                         className='w-[40px] h-[40px] mr-[10px]'
                                        />
                                        <h1>{i.name}</h1>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                 ): null}
                </div>
                <div className="bg-gradient-to-r from-gray-500 to-blue-600 hover:from-dark-blue-600 hover:to-dark-blue px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
                <Link to="/seller">
                    <h1 className='text-white flex items-center'>
                        Become Seller
                        <IoIosArrowForward className='ml-1'/>
                    </h1>
                    </Link>
                </div>
            </div>
        </div>
        <div className={`${active === true? "shadow-sm fixed top-0 left-0 z-10": null} transition 800px:flex items-center justify-between w-full bg-[#ddd8ce] h-[70px]`}>
            <div className={`${styles.section} relative ${styles.normalFlex} justify-between`}>
                {/*categories */}
                    <div>
                    <div 
                    className='relative h-[60px] mt-[10px] w-[270px] 1000px:block'>
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
                        { dropDown? (
                            <DropDown 
                                categoriesData = {categoriesData}
                                setDropDown={setDropDown}
                        />) : null }
                    </div>
                    {/* navbar items */}
                    <div className={`${styles.normalFlex}`}>
                            <Navbar active={activeHeading}/>
                    </div>
                    <div className="flex">
                        <div className={`${styles.normalFlex}`}>
                            <div className="relative cursor-pointer mr-[15px]">
                                <AiOutlineHeart size={30}
                                color='rgb(255, 255, 255 / 83%)'/>
                                <span className="absolute -top-1 -right-1 rounded-full bg-[#40d132] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1</span>
                            </div>
                        </div>
                        <div className="relative cursor-pointer mr-[15px]">
                            <AiOutlineShoppingCart size={30}
                                color='rgb(255, 255, 255 / 83%)'/>
                            <span className="absolute -top-1 -right-1 rounded-full bg-[#40d132] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">1</span>
                        </div>
                        <div className="relative cursor-pointer mr-[15px]">
                            <Link to="/login">
                            <CgProfile size={30} color='rgb(255, 255, 255 / 83%)'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}