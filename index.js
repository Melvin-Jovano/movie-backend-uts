import express, { json } from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const [port, app] = [Number(process.env.PORT), express()];

const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
let allMovies = JSON.parse(getMovieFile);

// delete movie
app.delete('/movie/:id', (req, res) => {
    let isFound = false;
    allMovies = allMovies.filter((x => {
        if(x.id == req.params.id) isFound = true;
        return x.id != req.params.id;
    }));
    if(isFound) res.status(200).json({"message": "Movie deleted successfull", "data": allMovies});
    else res.status(200).json({"message": "Movie is not found", "data": allMovies});
})

app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});