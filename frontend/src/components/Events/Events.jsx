import React from 'react'
import styles from '../../styles/styles';
import EventCard from './EventCard'
import { useSelector } from 'react-redux'

const Events = () => {
    const { allEvents, isLoading } = useSelector((state) => state.events)
    return (
        <div>
            {
                !isLoading && allEvents?.length > 0 && (
                    <div className={`${styles.section}`}>
                        <div className={`${styles.heading}`}>
                            <h1 className='font-[800] text-[2rem] font-[Roboto]'>Popular Events</h1>
                        </div>
                        <div className="w-full grid mb-14">
                            <EventCard data={allEvents[0]} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Events;