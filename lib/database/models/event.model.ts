import mongoose from "mongoose";
import { Document } from 'mongoose'

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location: string;
    eventLatitude:string,
    eventLongitude:string,
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string, name: string }
    organizer: { _id: string, firstName: string, lastName: string }
}

// schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    eventLatitude: {
        type: String
    },
    eventLongitude: {
        type: String
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDateTime: {
        type: Date,
        default: Date.now
    },
    endDateTime: {
        type: Date,
        default: Date.now
    },
    price: {
        type: String
    },
    isFree: {
        type: Boolean
    },
    url: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})


const Event = mongoose.models?.Event || mongoose.model('Event', eventSchema)

export default Event 