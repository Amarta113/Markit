import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

export default function Navbar({active, mobile}) {
    return (
        <div className={`${mobile ? "flex flex-col" : styles.normalFlex}`}>
            {navItems && navItems.map((i, index) => (
                <div className="flex" key={index}>
                    <Link to={i.url}
                    className={`${active === index + 1 ? "text-black" : "text-gray-500"} font-[500] px-6 py-3 cursor-pointer`}>
                        {i.title}
                    </Link>
                </div>
            ))}
        </div>
    )
}