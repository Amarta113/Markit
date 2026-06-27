import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileSidebar from '../components/UserComponents/ProfileSidebar'
import ProfileContent from '../components/UserComponents/ProfileContent'


const ProfilePage = () => {
    const [active, setActive] = useState(1)
    return (
        <div>
            <Header />
            <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
                <div className='w-[50px] md:w-[335px] shrink-0 sticky md:mt-0 mt-[18%]'>
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active} />
            </div>
        </div>
    )
}

export default ProfilePage