import mongoose from 'mongoose'

// schema
const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userame: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },

})


const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User