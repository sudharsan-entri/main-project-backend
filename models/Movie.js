import mongoose from 'mongoose';
const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  durationMins: Number,
  language: String,
  certificate: String,
  genres: [String],
  posterUrl: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });
export default mongoose.model('Movie', MovieSchema);
