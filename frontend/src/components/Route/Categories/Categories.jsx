import React from 'react'
import styles from '../../../styles/styles'
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from '../../../static/data.jsx'

export default function Categories() {
  const navigate = useNavigate()

  const handleSubmit = (i) => {
    navigate(`/products?category=${i.title}`)
  }

  return (
    <>
      {/* Categories grid */}
      <section
        className={`${styles.section} bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] mb-12`}
        id="categories"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
            Shop by Category
          </h2>
          <span className="hidden sm:block text-sm text-gray-400">
            {categoriesData?.length} categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData?.map((i) => (
            <button
              type="button"
              key={i.id}
              onClick={() => handleSubmit(i)}
              className="group relative flex flex-col items-center justify-between h-[220px] sm:h-[240px] rounded-xl border border-gray-100 bg-gray-50/60 px-3 py-5 text-left transition-all duration-200 hover:border-[#0f0472]/30 hover:bg-[#0f0472]/[0.04] hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3321c8] focus-visible:ring-offset-2 cursor-pointer"
            >
              <div className="w-full flex justify-center items-center flex-1">
                <img
                  src={i.image_Url}
                  alt={i.title}
                  loading="lazy"
                  className="w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <h5 className="w-full text-center text-[14px] md:text-[15px] font-medium leading-tight text-gray-700 group-hover:text-[#3321c8] transition-colors">
                {i.title}
              </h5>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}