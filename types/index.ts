// USER
export type CreateUserParams = {
    clerkId: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    image: string
}

export type UpdateUserParams = {
    username: string
    firstName: string,
    lastName: string,
    image: string
}



//  EVENT 
export type CreateEventParams = {
    userId: string
    event: {
        title: string
        description: string
        location: string
        imageUrl: string
        date: Date
        categoryId: string
        price: string
        isFree: boolean
        url: string
    }
    path: string
}

export type UpdateEventParams = {
    userId: string
    event: {
        _id: string
        title: string
        imageUrl: string
        description: string
        location: string
        date: Date
        categoryId: string
        price: string
        isFree: boolean
        url: string
    }
    path: string
}

export type DeleteEventParams = {
    eventId: string
    path: string
}

export type GetAllEventsParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type GetEventsByUserParams = {
    userId: string
    limit?: number
    page: number
}

export type GetRelatedEventsByCategoryParams = {
    categoryId: string
    eventId: string
    limit?: number
    page: number | string
}

export type Event = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    date: Date
    url: string
    organizer: {
        _id: string
        firstName: string
        lastName: string
    }
    category: {
        _id: string
        name: string
    }
}

//  CATEGORY PARAMS
export type CreateCategoryParams = {
    categoryName: string
}

//  ORDER PARAMS
export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
}

export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
}

export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
}

export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
}

//  URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export type getEventsBySearchParams = {
    searchFormValues: {
        userLatitude: string,
        userLongitude: string,
        date: Date
    }
}

export type EventData = {
    event_name: string;
    city_name: string;
    date: Date;
    weather: string;
    distance_km: string;
    imageUrl: string,
    eventId: string,
}

export type SearchEventData = {
    events: EventData[],
    page: number,
    pageSize: number,
    totalEvents: number,
    totalPages: number,
}