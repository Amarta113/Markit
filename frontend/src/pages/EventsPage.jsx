import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import EventCard from '../components/Events/EventCard'
import styles from '../styles/styles.js'

export default function EventsPage() {
    const { allEvents, isLoading } = useSelector((state) => state.events)

    return (
        <div>
            <Header activeHeading={4} />
            <main className={`${styles.section} max-w-6xl py-10 pb-16 px-4 sm:px-0`}>
                {allEvents?.length !== 0 &&
                    allEvents &&
                    allEvents.map((event, i) => (
                        <EventCard data={event} key={i} active={true} isLoading={isLoading} />
                    ))}
                {allEvents?.length === 0 && <h4>No Product Events Running!</h4>}
            </main>
            <Footer />
        </div>
    )
}

