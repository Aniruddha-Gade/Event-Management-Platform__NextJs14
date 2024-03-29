"use server";

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, getEventsBySearchParams } from "@/types";
import { connectToDatabase } from "@/lib/database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "@/lib/database/models/category.model";
import { formatDate, formatDateTime, handleError } from "../utils";
import { revalidatePath } from "next/cache";

import axios from 'axios';

// external api
const weatherApiUrl = process.env.WEATHER_API_URL;
const distanceApiUrl = process.env.DISTANCE_API_URL;



// create Event
export const createEvent = async ({
    event,
    userId,
    path,
}: CreateEventParams) => {
    try {
        await connectToDatabase();

        console.log(`event  = ${event} , userId = ${userId} , path = ${path}`)

        const organizer = await User.findById(userId);
        console.log("organizer = ", organizer)
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
        console.log("Error while creating event ");
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


// querying events within the next 14 days from the specified date
async function findEvents(date: Date) {
    try {
        await connectToDatabase();
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14);

        // console.log({
        //     startDate:startDate,
        //     endDate:endDate
        // })

        const events = await Event.find({
            date: { $gte: startDate, $lte: endDate }
        }).sort({ date: 1 }); // Sort in ascending order of date

        return events;
    } catch (error) {
        console.log('Error querying events from the database = ', error);
    }
}

// retrieve weather data for the specified city and date
async function getWeather(city: string, date: Date) {
    try {
        // console.log(({
        //     city:city,
        //     date:date
        // }))

        const newDate = formatDate(date)
        const apiUrl = `${weatherApiUrl}&city=${city}%20Rebeccaberg&date=${newDate}`;

        const response = await axios.get(apiUrl);
        // console.log(`weather of ${city} => `, response.data.weather)
        return response.data.weather;

    } catch (error) {
        console.log('Error retrieving weather data = ', error);
    }
}

//  calculate the distance between the two locations
async function calculateDistance(userLatitude: string, userLongitude: string, eventLatitude: string, eventLongitude: string) {
    try {
        // console.log({
        //     userLatitude: userLatitude, userLongitude: userLongitude, eventLongitude: eventLongitude, eventLatitude: eventLatitude
        // })
        const apiUrl = `${distanceApiUrl}&latitude1=${userLatitude}&longitude1=${userLongitude}&latitude2=${eventLatitude}&longitude2=${eventLongitude}`;

        const response = await axios.get(apiUrl);
        // console.log("distance  = ", response.data.distance)
        return response.data.distance;

    } catch (error) {
        console.log('Error while calculating distance =', error);
    }
}


// get Events By Search
export const getEventsBySearch = async ({ searchFormValues }: getEventsBySearchParams) => {
    try {
        // console.log("searchFormValues = ", searchFormValues)
        const { userLatitude, userLongitude, date } = searchFormValues;

        const events = await findEvents(date);
        // console.log("response events = ", events)

        // For each event, make external API calls to get weather and calculate distance
        let eventDetailsPromises: Promise<any>[] = []
        if (events) {
            eventDetailsPromises = events.map(async (event) => {
                const weather = await getWeather(event.location, date);
                const distance = await calculateDistance(userLatitude, userLongitude, event.eventLatitude, event.eventLongitude);

                console.log({
                    weather: weather,
                    distance: distance,
                })

                return {
                    event_name: event.title,
                    city_name: event.location,
                    date: event.date,
                    weather,
                    distance_km: distance,
                };
            })
        }

        // Wait for all API calls to complete
        const eventDetails = await Promise.all(eventDetailsPromises);

        const response = {
            events: eventDetails,
            page: 1,
            pageSize: 10,
            totalEvents: eventDetails.length,
            totalPages: Math.ceil(eventDetails.length / 10),
        };

        // Send the response
        console.log("final response = ", response)
        return response.events
    } catch (error) {
        console.log('Error while fetching next 14 events =', error);
    }
}