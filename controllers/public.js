import Movie from '../models/Movie.js';
import Theatre from '../models/Theatre.js';
import Show from '../models/Show.js';

export async function getFeaturedMovies(req,res){
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: 'i' } } : { featured: true };
  res.json(await Movie.find(filter).sort({ createdAt: -1 }).limit(24));
}

export async function getShows(req,res){
  const { movieId, city, date } = req.query;
  const filter = {};
  if(movieId) filter.movieId = movieId;
  if(date) filter.showDate = date;
  let theatres = null;
  if(city) theatres = await Theatre.find({ city });
  if(city) filter.theatreId = { $in: theatres.map(t=>t._id) };
  const shows = await (await Show.find(filter).populate('movieId theatreId')).map(s=>s);
  res.json(shows);
}

export async function getTheatres(req,res){
  res.json(await Theatre.find());
}

export async function getMovies(req,res){
  res.json(await Movie.find().sort({createdAt: -1}));
}
