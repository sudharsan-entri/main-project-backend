import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listMovies, createMovie, updateMovie, deleteMovie, listTheatres, createTheatre, updateTheatre, deleteTheatre, listShows, createShow, updateShow, deleteShow } from '../controllers/adminMgmt.js';
import { listBookings, cancelByTicketId } from '../controllers/bookings.js';

const router = Router();
router.use(requireAuth, requireRole('admin'));

router.get('/movies', listMovies);
router.post('/movies', createMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

router.get('/theatres', listTheatres);
router.post('/theatres', createTheatre);
router.put('/theatres/:id', updateTheatre);
router.delete('/theatres/:id', deleteTheatre);

router.get('/shows', listShows);
router.post('/shows', createShow);
router.put('/shows/:id', updateShow);
router.delete('/shows/:id', deleteShow);

router.get('/bookings', listBookings);
router.delete('/bookings/:ticketId', cancelByTicketId);

export default router;
