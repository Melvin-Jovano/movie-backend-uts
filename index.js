import express, { json } from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const [port, app] = [Number(process.env.PORT), express()];

const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
let allMovies = JSON.parse(getMovieFile);



app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});