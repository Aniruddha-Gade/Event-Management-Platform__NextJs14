import React from 'react';
import SearchEventForm from '@/components/shared/SearchEventForm';



const page = () => {




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
            </section>



        </div>
    );
}

export default page;
