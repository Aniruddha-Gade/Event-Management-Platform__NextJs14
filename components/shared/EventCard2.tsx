import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { EventData } from '@/types/index'

const EventCard2 = ({ event }: { event: EventData }) => {
    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] group">
            <Link
                href={`/events/${event.eventId}`}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 group-hover:scale-105 duration-300"
            />

            <div className="flex min-h-[230px] flex-col gap-2 p-5">
                <p className="p-medium-16 p-medium-18 text-grey-500">
                    Date: {formatDateTime(event.date).dateOnly}
                </p>

                <Link href={`/events/${event.eventId}`}>
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 hover:text-primary-500 text-black">{event.event_name}</p>
                </Link>

                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2 '>
                        <Image
                            src='/assets/icons/location.png'
                            width={20}
                            height={20}
                            alt="location"
                            className='object-contain'
                        />
                        <span className='font-medium'>Location: </span>
                        {event.city_name}
                    </div>
                    <div className='flex items-center gap-2 '>
                        <Image
                            src='/assets/icons/umbrella.png'
                            width={20}
                            height={20}
                            alt="location"
                            className='object-contain'
                        />
                        <span className='font-medium'>Weather: </span>
                        {event.weather}
                    </div>
                    <div className='flex items-center gap-2 '>
                        <Image
                            src='/assets/icons/car.gif'
                            width={20}
                            height={20}
                            alt="location"
                            className='object-contain'
                        />
                        <span className='font-medium'>Distance from you: </span>
                        {parseFloat(event.distance_km).toFixed(2) + ' km'}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCard2;