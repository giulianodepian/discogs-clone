import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app = express();
const mongouri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/discogsdb`;

mongoose.connect(mongouri, (err) => {
    if (err) {
        console.log("Error trying to connect to the database")
    } else {
        console.log("Connection to database succeful")
    }
});

app.use(cors());

app.get('/', function (req: Request, res: Response) {
    return res.send({message: 'Hello NPM!'});
});

app.listen(process.env.PORT || 8080);