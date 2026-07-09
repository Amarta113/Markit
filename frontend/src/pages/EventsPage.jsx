import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import EventCard from '../components/Events/EventCard'
import styles from '../styles/styles'

export default function EventsPage() {
    const { allEvents } = useSelector((state) => state.events)

    return (
        <div>
            <Header activeHeading={4} />
            <main className={`${styles.section} max-w-6xl py-10 pb-16 px-4 sm:px-0`}>
            <EventCard active={true} data={allEvents?.[0]} />
            </main>
            <Footer />
        </div>
    )
}

