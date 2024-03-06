const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const port = process.env.APP_PORT || 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors');
app.use(cors())

// Endpoint to fetch the last booking details
app.get(process.env.GET_REQUEST, function (req, res) {
    try {
        // Find the last entry in the database and sort by _id in descending order
        connection.findOne({}).sort({ _id: -1 })
            .then((lastEntry) => {
                // If a last entry is found, return it with status code 200
                if (lastEntry) {
                    res.status(200).json(lastEntry);
                } else {
                    // If no previous booking is found, return a 404 status with a message
                    res.status(404).json({ message: 'No previous booking found.' });
                }
            })
            .catch((error) => {
                // If an error occurs during database operation, log the error and return a 500 status with error message
                console.error(error);
                res.status(500).json({ error: error.message });
            });
    } catch (err) {
        // Catch any unexpected errors and return a 500 status with error message
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post(process.env.POST_REQUEST, async (req, res) => {
    try {
        // Create a new booking using the 'bookingModel' and the request body data.
        const booking = await connection.create(req.body);

        // Check if the booking was successfully created.
        if (!booking) {
            // If no booking is found, respond with a 400 error and a message.
            return res
                .status(400)
                .json({ message: "Failed to create booking. Please try again later." });
        }

        // If the booking is successful, respond with a 200 status (OK) and the booking details in JSON format.
        res.status(200).json(booking);
    } catch (error) {
        // If an error occurs during the process, handle and log the error.
        console.error("Error creating booking:", error);

        // Check if the error is related to validation (e.g., invalid data format).
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Invalid booking data. Please provide valid details.",
            });
        }

        // For other types of errors, respond with a generic error message and a 500 status (Internal Server Error).
        res.status(500).json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});


app.get('/', function (req, res) {
    try {
        //get last booking
        res.send("BookMyShow is live!")
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: " Server Error" });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   