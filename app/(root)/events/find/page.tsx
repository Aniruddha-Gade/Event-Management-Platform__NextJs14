'use client'
import React, { useState } from 'react';
import SearchEventForm from '@/components/shared/SearchEventForm';
import { useSearchEventContext } from '@/app/context/searchEventContext';
import EventCard2 from '@/components/shared/EventCard2';



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
                        searchEventLoading ? (
                            <span className='text-7xl bg-red-800 underline text-teal-500 p-5'>
                                Loading
                            </span>
                        ) : tempData.length > 0 ? (
                            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10'>
                                {
                                    tempData.map((event) => (
                                        <EventCard2 event={event} />
                                    ))
                                }
                            </div>
                        ) : (
                            <span className='text-7xl text-red-800 underline bg-lime-500 p-5'>
                                Not Found
                            </span>
                        )
                    }
                </div>


            </section>



        </div>
    );
}

export default page;
