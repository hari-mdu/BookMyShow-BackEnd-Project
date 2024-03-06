const express = require("express");
const app = express(); 
const mongodb = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

const mongoURI = process.env.MONGODBLIVE

let mongoose = require('mongoose');
const { bookMovieSchema } = require('./schema')


mongoose.connect(mongoURI)
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
let collection_connection = mongoose.model(process.env.COLLECTION_NAME, bookMovieSchema)


exports.connection = collection_connection;
