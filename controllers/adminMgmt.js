import Movie from '../models/Movie.js';
import Theatre from '../models/Theatre.js';
import Show from '../models/Show.js';

export async function listMovies(req,res){ res.json(await Movie.find().sort({createdAt:-1})); }
export async function createMovie(req,res){ const doc = await Movie.create(req.body); res.status(201).json(doc); }
export async function updateMovie(req,res){ const doc = await Movie.findByIdAndUpdate(req.params.id, req.body, {new:true}); if(!doc) return res.status(404).json({message:'Not found'}); res.json(doc); }
export async function deleteMovie(req,res){ const ok = await Movie.findByIdAndDelete(req.params.id); if(!ok) return res.status(404).json({message:'Not found'}); res.json({ok:true}); }

export async function listTheatres(req,res){ res.json(await Theatre.find().sort({createdAt:-1})); }
export async function createTheatre(req,res){ const doc = await Theatre.create(req.body); res.status(201).json(doc); }
export async function updateTheatre(req,res){ const doc = await Theatre.findByIdAndUpdate(req.params.id, req.body, {new:true}); if(!doc) return res.status(404).json({message:'Not found'}); res.json(doc); }
export async function deleteTheatre(req,res){ const ok = await Theatre.findByIdAndDelete(req.params.id); if(!ok) return res.status(404).json({message:'Not found'}); res.json({ok:true}); }

export async function listShows(req,res){ 
  const shows = await Show.find().populate('movieId theatreId').sort({createdAt:-1});
  const result = shows.map(show => ({
    _id: show._id,
    showDate: show.showDate,
    times: show.times,
    price: show.price,
    movieTitle: show.movieId?.title || '',
    theatreName: show.theatreId?.name || '',
    movieId: show.movieId?._id || '',
    theatreId: show.theatreId?._id || '',
    createdAt: show.createdAt,
    updatedAt: show.updatedAt
  }));
  res.json(result);
}
export async function createShow(req,res){ 
  const doc = await Show.create(req.body); 
  res.status(201).json(doc); 
}
export async function updateShow(req,res){ 
  const doc = await Show.findByIdAndUpdate(req.params.id, req.body, {new:true}); 
  if(!doc) return res.status(404).json({message:'Not found'}); 
  res.json(doc); 
}
export async function deleteShow(req,res){ 
  const ok = await Show.findByIdAndDelete(req.params.id); 
  if(!ok) return res.status(404).json({message:'Not found'}); 
  res.json({ok:true}); 
}
