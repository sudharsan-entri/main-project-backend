import mongoose from 'mongoose';
const BookingSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: String,
  customerMobileNo: String,
  customerEmail: String,
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  theatreName: String,
  movieTitle: String,
  showDate: String,
  showTime: String,
  numberOfTickets: { type: Number, min: 1, required: true },
  status: { type: String, enum: ['active','cancelled'], default: 'active' },
}, { timestamps: true });
export default mongoose.model('Booking', BookingSchema);
