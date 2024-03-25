import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Collection from '@/components/shared/Collection'
import { getAllEvents } from '@/lib/actions/event.actions'


export default async function Home() {

  const allEvents = await getAllEvents({
    query: '',
    category: '',
    limit: 6,
    page: 1
  })

  // console.log("Events Data => ", allEvents)

  return (
    <div>

      <section className='bg-primary-50 ng-pattern-dotted bg-contain py-5 md:py-10 '>
        <div className='max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 '>
          <div className='flex flex-col justify-center gap-8'>
            <h1 className='font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]'>
              Plan, Connect,  <br /> Celebrate: Elevate Your Events with Our Platform!
            </h1>
            <p className='p-regular-20 md:p-regular-24'>
              Elevate your events with our platform designed for seamless hosting, effortless connection, and unforgettable celebrations.
              Join us and turn every occasion into a memorable masterpiece!
            </p>

            <Button size='lg' asChild className='rounded-full h-[54px] p-regular-16 w-full sm:w-fit' >
              <Link href='#events'>
                Events
              </Link>
            </Button>

          </div>

          <div>
            <Image
              src='/assets/images/hero.png'
              width={1000}
              height={1000}
              alt='hero'
              className='max-h-[70vh] 2xl:max-h-[50vh] object-contain object-center  '
            />
          </div>

        </div>
      </section>


      <section id='events' className='wrapper flex flex-col my-8 md:gap-12  '>
        <h2 className='h2-bold'>
          Trust by <br /> Thousands of Events
        </h2>

        <div className='w-full flex flex-col md:flex-row gap-5 '>
          search
          categoryFilter

        </div>

        <Collection
          data={allEvents?.data}
          emptyTitle={'No Events Found'}
          emptyStateSubText={"Come back later"}
          collectionType={'All_Events'}
          limit={6}
          page={1}
          totalPages={allEvents?.totalPages}
        />

      </section>

    </div>
  )
}
