import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// GET /api/movies/:id - Get movie by ID (including posterUrl)
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie); // movie.posterUrl will be included if present in schema
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;