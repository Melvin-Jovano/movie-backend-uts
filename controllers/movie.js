import { sendOutput } from "../utils/util.js";

export default class MovieController {
    Database;

    constructor(database = []) {
        this.Database = database;
    }

    getAllMovies = async (req, res) => {
        try {
            res.status(200).send(sendOutput("Success", this.Database));
        } catch(error) {
            res.status(500).send(sendOutput("Internal Server Error"));
        }
    }

    getMovieById = async (req, res) => {
        try {
            let [isFound, data] = [false, null];

            for (const movie of this.Database) {
                if(movie["id"] === Number(req.params.id)){
                    isFound = true;
                    data = movie;
                    break;
                }
            }
            if(isFound) res.status(200).send(sendOutput("Success", data));
            else res.status(404).send(sendOutput("Movie Is Not Found"));
        } catch(error) {
            res.status(500).send(sendOutput("Internal Server Error"));
        }
    }

    deleteMovieById = async (req, res) => {
        try {
            let isFound = false;
            this.Database = this.Database.filter((x => {
                if(x.id == req.params.id) isFound = true;
                return x.id != req.params.id;
            }));
            if(isFound) res.status(200).send(sendOutput("Movie Deleted Successfully"));
            else res.status(404).send(sendOutput("Movie Is Not Found"));
        } catch(error) {
            res.status(500).send(sendOutput("Internal Server Error"));
        }
    }

    updateMovieById = async (req, res) => {
        try {
            let isFound = false;
            this.Database.map(movie => {
                if(movie["id"] === Number(req.params.id)) {
                    isFound = true;
                    Object.keys(req.body).forEach(prop => {
                        movie[prop] = req.body[prop];
                    });
                }
                return movie;
            });
            if(isFound) res.status(200).send(sendOutput("Movie Updated Successfully"));
            else {
                this.Database.push({id: Number(req.params.id), ...req.body});
                res.status(201).send(sendOutput("Movie Inserted Successfully", {id: Number(req.params.id)}));
            }
        } catch(error) {
            res.status(500).send(sendOutput("Internal Server Error"));
        }
    }
}