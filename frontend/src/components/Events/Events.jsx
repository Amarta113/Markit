import React from 'react'
import styles from '../../styles/styles';
import EventCard from './EventCard'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const Events = () => {
    const { allEvents, isLoading } = useSelector((state) => state.events)
    return (
        <div>
            {
                !isLoading && (
                    <div className={`${styles.section}`}>
                        <div className={`${styles.heading}`}>
                            <h1 className='font-[800] text-[2rem] font-[Roboto]'>Popular Events</h1>
                        </div>
                        <div className="w-full grid mb-14">
                            <EventCard data={allEvents && allEvents[0]} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Events;