import mongoose from 'mongoose';
const TheatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: String,
  capacity: { type: Number, default: 100 },
}, { timestamps: true });
export default mongoose.model('Theatre', TheatreSchema);
