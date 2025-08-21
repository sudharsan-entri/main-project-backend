import { Router } from 'express';
import { getFeaturedMovies, getShows, getTheatres, getMovies } from '../controllers/public.js';
const router = Router();
router.get('/featured', getFeaturedMovies);
router.get('/shows', getShows);
router.get('/theatres', getTheatres);
router.get('/movies', getMovies);
export default router;
