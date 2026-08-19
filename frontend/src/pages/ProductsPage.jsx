import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import Footer from '../components/Layout/Footer'
import { AiOutlineFire } from 'react-icons/ai'
import { StretchHorizontal } from 'lucide-react'

export default function ProductsPage() {
    const [searchParams] = useSearchParams()
    const categoryData = searchParams.get("category")
    const {allProducts, isLoading} = useSelector((state) => state.products)
    const [data, setData] = useState([])

    useEffect(() => {
        if(categoryData === null){
            const data = allProducts
            setData(data)
        }else {
            const data = allProducts && allProducts.filter(i => i.category === categoryData)
            setData(data)
        }
    }, [categoryData, allProducts])

    return (
        <div className="text-black">
            <Header activeHeading={3} />
            <div className="border-b border-[#00000012] bg-gradient-to-b bg-[#fff] text-center">
                <div className={`${styles.section} py-10`}>
                    <h1 className="text-[28px] md:text-[34px] text-[#1a1a1a]">
                        Check All Products
                    </h1>
                </div>
            </div>
            <br />
            <div className={`${styles.section} py-8`}>
                <div className="grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                    {
                       data && data?.map((i, index) => <ProductCard data={i} key={index} />)
                    }
                </div>
                {
                    data?.length === 0 ? (
                    <div className="">
                        <StretchHorizontal size={28} /> 
                        <h1 className='text-center w-full pb-[10px] text-[20px]'>No products found!</h1>
                    </div>
                    ) : null
                }
            </div>
            <Footer/>
        </div>
    )
}