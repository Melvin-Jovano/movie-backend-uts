import ExpressLoader from "./loaders/express.js";
import movieRoutes from './routes/movie.js';
import * as dotenv from 'dotenv';
dotenv.config();

const port = Number(process.env.PORT || 3000);

const Express = new ExpressLoader({port, endpoints: movieRoutes}, 
    () => {
        console.log(`Server Started At Port ${port}`);
    }
);

Express.startServer();