import React from 'react'
import styles from '../../../styles/styles'
import studioImg from '../../../assets/free-stock.jpg'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
      <div
        className={`relative min-h-[75vh] min-800-h w-full bg-cover bg-center bg-no-repeat ${styles.normalFlex}`}
        style={{
          backgroundImage:
            `url(${studioImg})`
        }}
      >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] bg-transparent`}>
          <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
            Trending fashion Collection 
          </h1>
          <p className='pt-5 text-[20px] font-[Poppins] font-[400] text-white w-[90%] 800px:w-[80%] bg-black/40 shadow-sm p-2 rounded'>
          Discover handpicked styles made for everyday confidence, from timeless essentials to
          fresh seasonal drops.
          </p>
          <Link to='/products'>
          <div className={`${styles.button} mt-5 rounded`}>
            <span className='text-[#fff] font-[Poppins] text-[18px]'>Shop Now</span>
          </div>
          </Link>
        </div>
      </div>
    )
}
