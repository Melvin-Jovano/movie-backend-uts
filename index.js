import express from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();



const [port, app] = [Number(process.env.PORT), express()];

app.get('/movies', (req, res) => {
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    res.send(allMovies);
});

app.get("/movie/:id", (req, res)=>{
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    allMovies.forEach(movie => {
        if(movie["id"] === parseInt(req.params.id)){
            res.send(movie)
        }
    });
    res.status(404).json({"message" : "Movie is not found"})
})

app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});