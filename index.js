import express from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();



const [port, app] = [Number(process.env.PORT), express()];

app.get('/', (req, res) => {
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    res.send(allMovies);
});

app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});