import express from "express";
import cors from 'cors';

export default class ExpressLoader {
    server;
    port;
    app;
    callback;

    constructor ({port, endpoints = () => {}}, callback = () => {}) {
        this.port = port;
        this.callback = callback;
        
        const app = express();

        app.use(cors());
        app.use(express.json());
        
        endpoints(app);
        
        this.app = app;
    }

    startServer() {
        this.server = this.app.listen(this.port, () => {
            this.callback();
        });
    }
}