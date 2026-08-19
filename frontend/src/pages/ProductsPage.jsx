import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import Footer from '../components/Layout/Footer'
import { PackageSearch } from 'lucide-react'

export default function ProductsPage() {
    const [searchParams] = useSearchParams()
    const categoryData = searchParams.get("category")
    const { allProducts, isLoading } = useSelector((state) => state.products)
    const [data, setData] = useState([])

    useEffect(() => {
        if (categoryData === null) {
            setData(allProducts || [])
        } else {
            setData(allProducts ? allProducts.filter(i => i.category === categoryData) : [])
        }
    }, [categoryData, allProducts])

    return (
        <div className="text-black bg-white-300 min-h-screen flex flex-col">
            <Header activeHeading={3} />

            {/* Page header */}
             <div className="border-b border-[#00000012] bg-gradient-to-b from-[#eff5fb] to-white">
                <div className={`${styles.section} py-10`}>                    
                    <h1 className="text-[28px] md:text-[34px] font-semibold text-[#1a1a1a]">
                        {categoryData ? categoryData : "Check All Products"}
                    </h1>
                    {!isLoading && (
                        <p className="text-gray-500 text-sm mt-2">
                            {data.length} {data.length === 1 ? "product" : "products"} found
                        </p>
                    )}
                </div>
            </div>

            <div className={`${styles.section} py-8 flex-1`}>
                {isLoading ? (
                    // loading state
                    <div className="grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[300px] rounded-lg bg-gray-100 animate-pulse"
                            />
                        ))}
                    </div>
                ) : data && data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-[20px] md:gap-[25px] lg:grid-cols-4 xl:grid-cols-5 xl:gap-[30px] mb-12">
                        {data.map((i, index) => (
                            <ProductCard data={i} key={i._id || index} />
                        ))}
                    </div>
                ) : (
                    // Empty state
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 rounded-full p-5 mb-4">
                            <PackageSearch size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-[20px] font-medium text-gray-700 mb-1">
                            No products found
                        </h2>
                        <p className="text-gray-500 text-sm max-w-sm">
                            {categoryData
                                ? `We couldn't find any products in "${categoryData}". Try browsing another category.`
                                : "There are no products available right now. Check back soon!"}
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}