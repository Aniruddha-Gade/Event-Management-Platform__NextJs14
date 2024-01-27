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


import { eventDefaultValues } from '../../constants/index'
import { eventFormSchema } from '@/lib/validator'
import { useUploadThing } from '@/lib/uploadthing'
import { IEvent } from "@/lib/database/models/event.model"

import DropDown from '@/components/shared/DropDown'
import { FileUploader } from "./FileUploader"
import { createEvent } from '../../lib/actions/event.actions'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// type
type EventFormProps = {
    userId: string,
    type: 'Create' | 'Update',
    event?: IEvent,
    eventId?: string
}

const EventForm = ({ userId, type }: EventFormProps) => {

    const [files, setFiles] = useState<File[]>([])
    const [startDate, setStartDate] = useState(new Date());
    const initialValues = eventDefaultValues;
    const { startUpload } = useUploadThing('imageUploader')
    const router = useRouter()


    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues
    })

    // submit handler
    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        console.log(values)
        const eventDate = values;
        let uploadImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadImages = await startUpload(files)
            if (!uploadImages) { return }

            uploadImageUrl = uploadImages[0].url;
        }

        if (type === 'Create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadImageUrl },
                    userId,
                    path: '/profile'
                });
                console.log("Event created successfully 🎉", newEvent)
                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log('Error while creating event:', error);
            }
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                {/* event name - category */}
                <div className='flex flex-col gap-5 md:flex-row'>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <Input placeholder="Event title" {...field} className='input-field' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <DropDown
                                        onChangeHandler={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* description- image upload */}
                <div className='flex flex-col gap-5 md:flex-row '>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl className='h-72'>
                                    <Textarea placeholder="Description" {...field} className='textarea rounded-2xl' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl className='h-72'>
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* location */}
                <div className='flex flex-col gap-5 md:flex-row '>
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                        <Image
                                            src='/assets/icons/location-gray.svg'
                                            width={24}
                                            height={24}
                                            alt='location'
                                        />

                                        <Input placeholder="Event location or online" {...field} className='input-field' />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* start date */}
                <div className='flex flex-col gap-5 md:flex-row '>
                    <FormField
                        control={form.control}
                        name="startDateTime"
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


                    {/* end date */}
                    <FormField
                        control={form.control}
                        name="endDateTime"
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

                                        <p className='ml-3 whitespace-nowrap text-grey-600 '>End Date:</p>
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

                {/* price */}
                <div className='flex flex-col gap-5 md:flex-row '>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                        <Image
                                            src="/assets/icons/dollar.svg"
                                            alt="dollar"
                                            width={24}
                                            height={24}
                                            className="filter-grey"
                                        />
                                        <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />

                                        {/* is free */}
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className='flex items-center '>
                                                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                Free Ticket
                                                            </label>
                                                            <Checkbox
                                                                id={'isFree'}
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value}
                                                                className='mr-2 w-5 h-5 border-2 border-primary-500 '
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* link */}
                    <div className='flex flex-col gap-5 md:flex-row '>
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <div className='flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2'>
                                            <Image
                                                src='/assets/icons/link.svg'
                                                width={24}
                                                height={24}
                                                alt='location'
                                            />

                                            <Input placeholder="URL" {...field} className='input-field' />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>



                <Button
                    type="submit"
                    size='lg'
                    disabled={form.formState.isSubmitting}
                    className='button col-span-2 w-full'
                >
                    {form.formState.isSubmitting ? 'submitting...' : `${type} Event`}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm