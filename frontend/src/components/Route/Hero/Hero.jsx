import React from 'react'
import styles from '../../../styles/styles'
import studioImg from '../../../assets/look-studio.jpg'
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
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
          <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
            Trending fashion Collection 
          </h1>
          <p className='pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]'>
            Discover handpicked styles made for everyday confidence, <br/> from timeless essentials to
            fresh seasonal drops.<br/>Shop quality fashion at great prices and refresh <br/>your wardrobe
            with pieces you will love to wear.
          </p>
          <Link to='/products'>
          <div className={`${styles.button} mt-5`}>
            <span className='text-[#fff] font-[Poppins] text-[18px]'>Shop Now</span>
          </div>
          </Link>
        </div>
      </div>
    )
}
