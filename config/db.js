import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/theatre_mgmt';
  await mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
  console.log('Mongo connected');
};
export default connectDB;
