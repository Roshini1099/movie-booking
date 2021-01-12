// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import router from './router';
var cors = require('cors');
mongoose
    .connect('mongodb+srv://admin-roshini:roshini1999@cluster0.oz4rg.mongodb.net/movieticket?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err))
    // and create our instances
const app = express();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3000;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());

// Use our router configuration when we call /api
app.use(router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));