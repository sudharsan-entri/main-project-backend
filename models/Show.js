import mongoose from 'mongoose';
const ShowSchema = new mongoose.Schema({
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showDate: { type: String, required: true }, // YYYY-MM-DD
  times: [{ type: String }], // e.g., ["10:00","13:30","19:45"]
  price: { type: Number, default: 200 },
}, { timestamps: true });
export default mongoose.model('Show', ShowSchema);
