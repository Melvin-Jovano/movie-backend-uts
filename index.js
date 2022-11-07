import express, { json } from "express";
import * as dotenv from 'dotenv';
import fs from 'fs';
import { type } from "os";
dotenv.config();

const [port, app] = [Number(process.env.PORT), express()];
app.use(express.json())

app.get('/movies', (req, res) => {
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    res.send(allMovies);
});

app.get("/movie/:id", (req, res)=>{
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    allMovies.forEach(movie => {
        if(movie["id"] === Number(req.params.id)){
            res.send(movie)
        }
    });
    res.status(404).json({"message" : "Movie is not found"})
})

app.put("/movie/:id", (req, res)=>{
    const getMovieFile = fs.readFileSync('assets/tmdb_movies.json');
    const allMovies = JSON.parse(getMovieFile);
    allMovies.forEach(movie => {
        if(movie["id"] === Number(req.params.id)){
            movie["budget"] = req.body.budget
            fs.writeFileSync('assets/tmdb_movies.json', JSON.stringify(allMovies))
            res.json({"id" : movie["id"], "budget" : movie["budget"]})
        }
    });
    res.status(404).json({"message" : "Movie is not found"})
})

app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});