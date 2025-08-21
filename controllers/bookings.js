import { nanoid } from 'nanoid';
import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
import Customer from '../models/Customer.js';
import { sendTicketEmail } from '../utils/mail.js';

export async function createBooking(req,res){
  const { showId, showTime, numberOfTickets } = req.body;
  if(!showId || !showTime || !numberOfTickets) return res.status(400).json({message:'Missing fields'});

  const show = await Show.findById(showId).populate('movieId theatreId');
  if(!show) return res.status(404).json({message:'Show not found'});
  if(!show.times.includes(showTime)) return res.status(400).json({message:'Invalid show time'});

  const customerId = req.user?.sub;
  const customer = await Customer.findById(customerId);
  if(!customer) return res.status(401).json({message:'Unauthorized'});

  const ticketId = 'TCKT-' + nanoid(8).toUpperCase();
  const booking = await Booking.create({
    ticketId,
    customerId,
    customerName: customer.name,
    customerMobileNo: customer.mobile,
    customerEmail: customer.email || '',
    showId,
    theatreName: show.theatreId.name,
    movieTitle: show.movieId.title,
    showDate: show.showDate,
    showTime,
    numberOfTickets: Number(numberOfTickets),
  });

  if(customer.email){
    const html = `
    <h2>Your Ticket</h2>
    <p>Ticket ID: <b>${booking.ticketId}</b></p>
    <p>Movie: <b>${booking.movieTitle}</b></p>
    <p>Theatre: <b>${booking.theatreName}</b></p>
    <p>Show: <b>${booking.showDate} ${booking.showTime}</b></p>
    <p>Tickets: <b>${booking.numberOfTickets}</b></p>
    <p>Booked for: <b>${booking.customerName} (${booking.customerMobileNo})</b></p>
    <hr/><p>Enjoy your show!</p>`;
    try { await sendTicketEmail({ to: customer.email, subject: `Your Ticket ${booking.ticketId}`, html }); } catch(e){ console.error('Email error', e.message); }
  }

  res.status(201).json(booking);
}

export async function listBookings(req,res){
  const docs = await Booking.find().sort({createdAt:-1});
  res.json(docs);
}

export async function cancelByTicketId(req,res){
  const { ticketId } = req.params;
  const doc = await Booking.findOneAndUpdate({ ticketId }, { $set: { status: 'cancelled' }}, {new:true});
  if(!doc) return res.status(404).json({message:'Not found'});
  res.json(doc);
}

export async function getBookingById(req,res){
  const { id } = req.params;
  const doc = await Booking.findById(id);
  if(!doc) return res.status(404).json({message:'Not found'});
  res.json(doc);
}
