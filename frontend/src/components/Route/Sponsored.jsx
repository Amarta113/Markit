import React from 'react'
import styles from '../../styles/styles'
import { brandingData } from '../../static/data'


export default function Sponsored() {
    const sponsors = [
        { name: "Apple", logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg" },
        { name: "Sony", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg" },
        { name: "Nike", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
        { name: "Adidas", logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
        { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
    ]
    return (<>
    
        <div className={`${styles.section} hidden sm:block bg-white py-14 px-20 mb-12 cursor-pointer rounded-xl`}>
            <div className="flex justify-between w-full">
                {sponsors.map((sponsor) => (
                    <div key={sponsor.name} className="flex items-center justify-center">
                        <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="h-10 object-contain transition duration-300"
                        />
                    </div>
                ))}
            </div>
        </div>
        {/* Branding strip */}
        <div className={`${styles.section} hidden sm:block`}>
            <div className="branding my-12 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                {brandingData?.map((i, idx) => (
                    <div
                        className={`flex items-start gap-3 ${idx !== 0 ? 'lg:pl-6 lg:border-l lg:border-gray-100' : ''
                            }`}
                        key={i.id}
                    >
                        <div className="flex-shrink-0 text-[#3321c8]">{i.icon}</div>
                        <div>
                            <h3 className="font-semibold text-sm md:text-base text-gray-900 tracking-tight">
                                {i.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 mt-0.5 leading-snug">
                                {i.Description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}