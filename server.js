import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import adminAuthRoutes from './routes/adminAuth.js';
import adminMgmtRoutes from './routes/adminMgmt.js';
import publicRoutes from './routes/public.js';
import customerAuthRoutes from './routes/customerAuth.js';
import bookingRoutes from './routes/bookings.js';
import moviesRouter from './routes/movies.js';


dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

await connectDB();

app.get('/api/health', (req,res)=>res.json({status:'ok'}));

// Routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin', adminMgmtRoutes);
app.use('/api/customer', customerAuthRoutes);
app.use('/api', publicRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/movies', moviesRouter);
// 404
app.use((req,res)=>res.status(404).json({message:'Not found'}));

// Error handler
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`API on http://localhost:${PORT}`));
