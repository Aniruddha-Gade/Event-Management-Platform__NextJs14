'use server'


import { CreateEventParams } from '@/types'
import { connectToDatabase } from '@/lib/database'
import User from '../database/models/user.model'
import Event from '../database/models/event.model'

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
        console.log(error)

    }
}