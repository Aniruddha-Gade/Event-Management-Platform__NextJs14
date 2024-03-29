import mongoose from 'mongoose';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
// console.log("MONGODB_URI === ", MONGODB_URI)

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
    dbName: 'eventify',
    bufferCommands: false,
  })

  cached.conn = await cached.promise;

  console.log("Database Connected Successfully 🟢🟢")
  return cached.conn;
}