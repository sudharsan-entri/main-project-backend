import mongoose from 'mongoose';
const OtpSchema = new mongoose.Schema({
  mobile: { type: String, required: true, index: true },
  codeHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });
export default mongoose.model('OtpCode', OtpSchema);
