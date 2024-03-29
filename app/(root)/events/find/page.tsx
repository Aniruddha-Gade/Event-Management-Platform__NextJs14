'use client'
import React, { useState } from 'react';
import SearchEventForm from '@/components/shared/SearchEventForm';
import { useSearchEventContext } from '@/app/context/searchEventContext';
import EventCard2 from '@/components/shared/EventCard2';


// Loading Skeleton
const LoadingSkeleton = () => {
    return (
        <div className="min-h-[380px] md:min-h-[438px] w-full max-w-[400px] flex flex-col gap-4 rounded-xl shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-3 bg-white hover:cursor-wait">
            <div className="skeleton w-full rounded-xl h-[200px] "></div>

            <div className="skeleton rounded-xl w-20 h-5"></div>
            <div className="skeleton rounded-xl w-56 h-5"></div>
            <div className="skeleton rounded-xl w-32 h-5"></div>
        </div>
    )
}


const page = () => {

    const { searchEventData, searchEventLoading } = useSearchEventContext()
    console.log("from context searchEventData = ", searchEventData)
    const tempData = [
        {
            event_name: 'Smart India Hackathon 2024',
            city_name: 'Delhi',
            date: '2024-04-05T11:00:53.000Z',
            weather: 'Sunny, 18C',
            distance_km: '1143.6432140846102',
            imageUrl: 'https://utfs.io/f/e673ddfd-10c3-4034-a6c5-041d52a9d0ba-5hcmx7.png',
            eventId: '66069fdf1f3cdea91919cbe7'
        },
        {
            event_name: 'Patna Festival 2024',
            city_name: 'Patna',
            date: '2024-04-06T11:00:53.000Z',
            weather: 'Sunny, 18C',
            distance_km: '1443.9477535510216',
            imageUrl: 'https://utfs.io/f/9a245f91-fda6-4f98-ad30-e29551526f56-5hcnlf.png',
            eventId: '6606a03b1f3cdea91919cbef'
        }
    ]


    return (
        <div className='bg-primary-50 p-5 md:px-10 mx-auto w-full'>

            <section className='ng-pattern-dotted bg-contain py-5 md:py-10 '>
                <div className='max-w-7xl  w-full flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col justify-center gap-8'>
                        <h1 className='font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]'>
                            Discover, Organize,<br /> Connect: Elevate Your Event Experience Today!
                        </h1>

                    </div>

                    <SearchEventForm />
                </div>
            </section>

            <section>
                <h3 className='text-4xl text-primary py-5 md:py-10 font-bold'>Events </h3>

                <div>
                    {
                        // display loading until data not loaded
                        searchEventLoading ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                                {Array.from({ length: 6 }, (_, index) => <LoadingSkeleton key={index} />)}
                            </div>
                        ) : tempData.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                                {
                                    tempData.map((event) => (
                                        <EventCard2 event={event} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-500/20 py-28 text-center'>
                                <h3 className='p-bold-20 md:h5-bold'>Events Not Found..!</h3>
                                <p className='p-regular-14'>Please update date</p>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
}

export default page;
