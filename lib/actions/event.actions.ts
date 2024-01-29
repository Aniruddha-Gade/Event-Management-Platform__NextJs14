'use server'


import { CreateEventParams } from '@/types'
import { connectToDatabase } from '@/lib/database'
import User from '../database/models/user.model'
import Event from '../database/models/event.model'
import Category from '@/lib/database/models/category.model'
import { handleError } from '../utils'

export const createEvent = async ({ event, userId, path }: CreateEventParams) => {
    try {

        await connectToDatabase()

        const organizer = await User.findById(userId)
        if (!organizer) {
            throw new Error('Organizer not found')
        }
        const newEvent = await Event.create({
            ...event, category: event.categoryId, organizer: userId
        })

        console.log("Event sent data =  ", newEvent)
        return JSON.parse(JSON.stringify(newEvent));
    }

    catch (error) {
        console.log("Erro while creating event ")
        handleError(error)

    }
}


const populateEvent = (query: any) => {
    return query
        .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
        .populate({ path: 'category', model: Category, select: '_id name' });
}

export const getEventDetailsById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));
        if (!event) {
            throw new Error("Event data is not found")
        }
        return JSON.parse(JSON.stringify(event));
    }
    catch (error) {
        console.log("Erro while fetching event data by Id ")
        handleError(error)
    }
}