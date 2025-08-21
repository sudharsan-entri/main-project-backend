import mongoose from 'mongoose';
const CustomerSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, trim: true },
  mobile: { type: String, required: true, unique: true, index: true },
}, { timestamps: true });
export default mongoose.model('Customer', CustomerSchema);
