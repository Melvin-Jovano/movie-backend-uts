import MovieController from '../controllers/movie.js';
import fs from 'fs';

const database = JSON.parse(fs.readFileSync('assets/tmdb_movies.json'));
const movieController = new MovieController(database);

const movieRoutes = (app) => {
  app.get("/api/movies", movieController.getAllMovies);
  app.get("/api/movie/:id", movieController.getMovieById);
  app.delete("/api/movie/:id", movieController.deleteMovieById);
  app.put("/api/movie/:id", movieController.updateMovieById);
};

export default movieRoutes;