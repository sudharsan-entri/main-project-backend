import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createBooking, getBookingById } from '../controllers/bookings.js';

const router = Router();
router.post('/', requireAuth, createBooking);
router.get('/:id', requireAuth, getBookingById);

export default router;
