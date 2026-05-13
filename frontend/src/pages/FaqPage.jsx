import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import styles from '../styles/styles'

const FaqPage = () => {
    return (
        <div>
            <Header activeHeading={5} />
            <Faq/>
            <Footer/>
        </div>
    )
}

const Faq = () => {
    const [activeTab, setActiveTab] = useState(0)
    const toggleTab = (tab) => {
        if(activeTab === tab) {
            setActiveTab(0)
        }else {
            setActiveTab(tab)
        }
    }
    
    return (
        <div className={`${styles.section} my-8`}>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>FAQ</h2>
        </div>
        )
}

export default FaqPage