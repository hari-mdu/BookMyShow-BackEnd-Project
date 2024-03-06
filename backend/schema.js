const { Schema } = require('mongoose');

/**
 * Schema for booking a movie.
 * Represents the structure of a booking document in the database.
 */
const bookMovieSchema = new Schema({
    /**
     * The name of the movie being booked.
     */
    movie: Schema.Types.String,

    /**
     * The time slot for the movie booking.
     */
    slot: Schema.Types.String,

    /**
     * The number of seats booked for each seat type.
     * Contains counts for seats labeled A1, A2, A3, A4, D1, and D2.
     */
    seats: {
        A1: Schema.Types.Number,
        A2: Schema.Types.Number,
        A3: Schema.Types.Number,
        A4: Schema.Types.Number,
        D1: Schema.Types.Number,
        D2: Schema.Types.Number
    }

}, { versionKey: false });

// Export the schema
exports.bookMovieSchema = bookMovieSchema;

