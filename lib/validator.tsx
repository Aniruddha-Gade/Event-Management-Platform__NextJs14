import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(400, 'Description must be less than 400 characters'),

  location: z.string().min(3, 'Location must be at least 3 characters').max(400, 'Location must be less than 400 characters'),
  // eventLatitude: z.number().min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90'),
  // eventLongitude: z.number().min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180'),
  eventLatitude: z.string().min(2, 'Latitude must be at least 2').max(50, 'Latitude must be at most 50'),
  eventLongitude: z.string().min(2, 'Longitude must be at least 2').max(50, 'Longitude must be at most 50'),

  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
})


// search events by date ,user Latitude,  user Longitude
export const searchEventFormSchema = z.object({
  date: z.date(),
  userLatitude: z.string().min(2, 'Latitude must be at least 2').max(50, 'Latitude must be at most 50'),
  userLongitude: z.string().min(2, 'Longitude must be at least 2').max(50, 'Longitude must be at most 50'),
})