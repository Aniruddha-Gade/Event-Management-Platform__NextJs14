"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from 'next/image'

import { Form, FormControl, FormField, FormItem, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { searchEventDefaultValues } from '../../constants/index'
import { searchEventFormSchema } from '@/lib/validator'
import { getEventsBySearch } from "@/lib/actions/event.actions"
import { useSearchEventContext } from "@/app/context/searchEventContext"



const SearchEventForm = () => {

    const { setSearchEventLoading, setSearchEventData } = useSearchEventContext()

    const initialValues = searchEventDefaultValues;

    const form = useForm<z.infer<typeof searchEventFormSchema>>({
        resolver: zodResolver(searchEventFormSchema),
        defaultValues: initialValues
    })

    // handle location acesss
    const handleLocationAccess = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // console.log(`latitude = ${latitude} , longitude = ${longitude}`)

                    // Set latitude and longitude in form data
                    form.setValue("userLatitude", latitude.toString());
                    form.setValue("userLongitude", longitude.toString());
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    // handle form SUBMIT
    async function onSubmit(values: z.infer<typeof searchEventFormSchema>) {
        // console.log("submited search-form values => ", values)
        setSearchEventLoading(true)

        const data = await getEventsBySearch({
            searchFormValues: { ...values }
        })
        if (data && data.events && data.events.length > 0) {
            setSearchEventData(data);
            // console.log("searched data => ", data.events)
        } else {
            console.log("Data not found")
            setSearchEventData({
                events: [], page: 0, pageSize: 0, totalEvents: 0, totalPages: 0
            });
        }
        setSearchEventLoading(false)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center gap-5 bg-primary/10 w-full p-6 rounded-3xl">
                <div className='flex flex-col gap-5 md:gap-3 md:flex-row '>

                    {/* latitude, longitude */}
                    <div className='flex-center flex-co gap-2 md:flex-row '>
                        <FormField
                            control={form.control}
                            name="userLatitude"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="latitude"
                                                className='input-field'
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userLongitude"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                            <Input
                                                {...field}
                                                type="number"
                                                placeholder="longitude"
                                                className='input-field' />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="button"
                            size='default'
                            disabled={form.formState.isSubmitting}
                            onClick={handleLocationAccess}
                        >
                            Get location
                        </Button>
                    </div>
                </div>

                {/* date */}
                <div className='flex flex-col gap-5 md:flex-row '>
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                        <Image
                                            src='/assets/icons/calendar.svg'
                                            width={24}
                                            height={24}
                                            alt='calendar'
                                            className='filter-grey'
                                        />

                                        <p className='ml-3 whitespace-nowrap text-grey-600 '>Date :</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            // showTimeSelect
                                            // timeInputLabel="Time:"
                                            dateFormat="dd/MM/yyyy"
                                            wrapperClassName="datePicker cursor-pointer"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>


                <Button
                    type="submit"
                    size='lg'
                    disabled={form.formState.isSubmitting}
                    className='button col-span-2 w-full'
                >
                    Search Events
                </Button>
            </form>
        </Form>
    );
}

export default SearchEventForm;
