import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import account from './src/routes/account';
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import MongoStore from 'connect-mongo';

dotenv.config();
const app = express();
const mongouri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/discogsdb`;



mongoose.connect(mongouri, (err) => {
    if (err) {
        console.log("Error trying to connect to the database")
    } else {
        console.log("Connection to database succeful")
    }
});

app.disable('x-powered-by');
app.enable('trust proxy');
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.urlencoded());
app.use(express.json());
app.use(
    session({
    secret: 'superdupersecret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        mongoUrl: mongouri
    })
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/account', account);

app.listen(process.env.PORT || 8080);