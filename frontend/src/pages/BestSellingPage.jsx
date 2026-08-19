import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { AiOutlineFire } from 'react-icons/ai'
import { ShoppingCart } from 'lucide-react';
import Footer from '../components/Layout/Footer'

export default function BestSellingPage(){
    const [data, setData] = useState([])
    const {allProducts, isLoading} = useSelector(state => state.products)

    useEffect(() => {
        const allProductsData = allProducts ? [...allProducts] : []
        const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out)
        setData(sortedData)
        window.scrollTo(0, 0)
    }, [allProducts])

    return (
        <div className="text-black bg-white min-h-screen">
            <Header activeHeading={2} />

            {/* Page header */}
            <div className="border-b border-[#00000012] bg-gradient-to-b from-[#eff5fb] to-white">
                <div className={`${styles.section} py-10`}>
                    <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-orange-600 mb-2">
                        <AiOutlineFire size={16} />
                        <span>TRENDING NOW</span>
                    </div>
                    <h1 className="text-[28px] md:text-[34px] font-bold text-[#1a1a1a]">
                        Best Selling Products
                    </h1>
                    <p className="text-[#00000073] text-[15px] mt-1">
                        {isLoading
                            ? 'Loading top picks…'
                            : `Ranked by sales — ${data?.length || 0} products found`}
                    </p>
                </div>
            </div>

            <div className={`${styles.section} py-8`}>
                {isLoading ? (
                    // loading state
                    <div className="grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-lg border border-[#0000000f] overflow-hidden"
                            >
                                <div className="bg-[#f0f0f0] aspect-square w-full" />
                                <div className="p-3 space-y-2">
                                    <div className="h-3 bg-[#f0f0f0] rounded w-4/5" />
                                    <div className="h-3 bg-[#f0f0f0] rounded w-2/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : data?.length === 0 ? (
                    // Empty state
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="text-5xl mb-3"><ShoppingCart/></div>
                        <h3 className="text-lg font-semibold text-[#1a1a1a]">No products yet</h3>
                        <p className="text-[#00000073] text-sm mt-1">
                            Check back soon — best sellers will show up here once orders come in.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {data?.map((i, index) => (
                            <div key={i._id || index} className="relative">
                                {index < 3 && (
                                    <span
                                        className={`absolute top-2 left-2 z-10 flex items-center justify-center w-7 h-7 rounded-full text-white text-[13px] font-bold shadow-md
                                            ${index === 0 ? 'bg-[#3eb489]' : index === 1 ? 'bg-[#3eb489]' : 'bg-[#C2793A]'}`}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                                <ProductCard data={i} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}