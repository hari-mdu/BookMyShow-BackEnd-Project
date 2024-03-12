// Import necessary modules
const express = require("express");
const app = express(); 
const mongodb = require('mongodb');// MongoDB driver
const dotenv = require("dotenv");// For handling environment variables
dotenv.config();// Load environment variables from .env file

// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGODBLIVE

// Import Mongoose for MongoDB object modeling
let mongoose = require('mongoose');

// Import bookMovieSchema from schema.js file
const { bookMovieSchema } = require('./schema')

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });

// Create a Mongoose model using the bookMovieSchema
let collection_connection = mongoose.model(process.env.COLLECTION_NAME, bookMovieSchema)

// Export the Mongoose model for use in other modules
exports.connection = collection_connection;
