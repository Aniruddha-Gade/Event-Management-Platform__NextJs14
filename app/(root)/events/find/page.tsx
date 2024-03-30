'use client'
import React, { useState } from 'react';
import SearchEventForm from '@/components/shared/SearchEventForm';
import { useSearchEventContext } from '@/app/context/searchEventContext';
import EventCard2 from '@/components/shared/EventCard2';
import Image from 'next/image';


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
    if(searchEventData.events.length > 0)
    console.log("search Event Data = ", searchEventData)


    return (
        <div className='bg-primary-50 p-5 md:px-10 mx-auto w-full'>

            <section className='ng-pattern-dotted bg-contain py-5 md:py-10 '>
                <div className='max-w-7xl  w-full flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col justify-center gap-8 w-full'>
                        <h1 className='font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]'>
                            Discover, Organize,<br /> Connect: Find Your Next 14 Events!
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
                        ) : searchEventData?.events?.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                                {
                                    searchEventData.events.map((event) => (
                                        <EventCard2 event={event} key={event.eventId}/>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-500/20 py-28 text-center'>
                                <div className='flex items-center gap-3 p-bold-20 md:h5-bold'>
                                    <p>Events Not Found..!</p>
                                    <Image
                                        src="/assets/icons/sad.png"
                                        width={40}
                                        height={40}
                                        alt="sad emoji"
                                        className='object-contain'
                                    />
                                </div>
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
