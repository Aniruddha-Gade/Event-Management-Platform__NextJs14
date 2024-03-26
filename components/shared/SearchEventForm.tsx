
"use client"

import { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"


import { searchEventDefaultValues } from '../../constants/index'
import { searchEventFormSchema } from '@/lib/validator'
import { useUploadThing } from '@/lib/uploadthing'
import { IEvent } from "@/lib/database/models/event.model"

import DropDown from '@/components/shared/DropDown'
import { FileUploader } from "./FileUploader"
import { createEvent } from '../../lib/actions/event.actions'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link'





const SearchEventForm = () => {

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
        console.log("submited search-form values => ", values)
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

                                        <p className='ml-3 whitespace-nowrap text-grey-600 '>Start Date:</p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
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

// <Button size='lg' asChild className='rounded-full h-[54px] p-regular-16 w-full sm:w-fit' >
//     <Link href='#events'>
//         Search Event
//     </Link>
// </Button>
export default SearchEventForm;
