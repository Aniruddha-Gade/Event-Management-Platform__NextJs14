"use server";

import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "@/types";
import { connectToDatabase } from "@/lib/database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";


// create Event
export const createEvent = async ({
    event,
    userId,
    path,
}: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);
        if (!organizer) {
            throw new Error("Organizer not found");
        }
        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId,
        });

        revalidatePath(path)

        console.log("Event sent data =  ", newEvent);
        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log("Erro while creating event ");
        handleError(error);
    }
};

const populateEvent = (query: any) => {
    return query
        .populate({
            path: "organizer",
            model: User,
            select: "_id firstName lastName",
        })
        .populate({ path: "category", model: Category, select: "_id name" });
};


// getEvent Details By Id
export const getEventDetailsById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));
        if (!event) {
            throw new Error("Event data is not found");
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        console.log("Erro while fetching event data by Id ");
        handleError(error);
    }
};


// Get all Events
export const getAllEvents = async ({
    query,
    limit = 6,
    page,
    category,
}: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const conditions = {};

        const eventsQuery = await Event.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(0)
            .limit(limit)
            .populate({
                path: "organizer",
                model: User,
                select: "_id firstName lastName",
            })
            .populate({ path: "category", model: Category, select: "_id name" });


        // const allEvents = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        // console.log('allEvents => ', eventsQuery)
        // console.log('eventsCount => ', eventsCount)

        return {
            data: JSON.parse(JSON.stringify(eventsQuery)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        console.log("Error while fetching all events");
        console.log("error => ", error);
        handleError(error);
    }
};


// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
        await connectToDatabase();

        const deletedEvent = await Event.findByIdAndDelete(eventId)

        if (deletedEvent) {
            console.log("Event deleted successfully 🟢")
            revalidatePath(path)
        }
    } catch (error) {
        console.log("Error while deleting event");
        console.log("error => ", error);
        handleError(error);
    }
}

