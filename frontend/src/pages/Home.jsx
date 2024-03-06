import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "../components/data";
import axios from "axios";

const Home = () => {
    
    // State for selected movie, slot, and seats
    const [selectedMovie, setSelectedMovie] = useState(
        localStorage.getItem("selectedMovie") || null
    );
    const [selectedSlot, setSelectedSlot] = useState(
        localStorage.getItem("selectedSlot") || null
    );
    const [selectedSeats, setSelectedSeats] = useState(
        JSON.parse(localStorage.getItem("selectedSeats")) || []
    );
    // State for tracking the total seats selected
    const [totalSeat, setTotalSeat] = useState({
        A1: 0,
        A2: 0,
        A3: 0,
        A4: 0,
        D1: 0,
        D2: 0,
    });

    // State for storing the last booking details
    const [bookingData, setBookingData] = useState({
        movie: "",
        slot: "",
        seats: {
            A1: 0,
            A2: 0,
            A3: 0,
            A4: 0,
            D1: 0,
            D2: 0,
        },
    });

    // Effect to fetch last booking details on component mount
    useEffect(() => {
        // Load last booking details from the backend on component mount
        const fetchLastBookingData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_LOCAL_PATH);
                if (response.status === 200) {
                    const lastBookingData = response.data;
                    setBookingData(lastBookingData);
                } else {
                    console.error("Failed to fetch last booking details");
                }
            } catch (error) {
                console.error("An error occurred while fetching last booking details:", error);
            }
        };

        fetchLastBookingData();

        // Clear selections after reload
        setSelectedMovie(null);
        setSelectedSlot(null);
        setSelectedSeats([]);

    }, []);

    // Handle movie selection
    const handleMovieSelect = (movie) => {
        setSelectedMovie(prevMovie => (prevMovie === movie ? null : movie));
        localStorage.setItem("selectedMovie", selectedMovie === movie ? null : movie);
    };

    // Handle slot selection
    const handleSlotSelect = (slot) => {
        setSelectedSlot(prevSlot => (prevSlot === slot ? null : slot));
        localStorage.setItem("selectedSlot", selectedSlot === slot ? null : slot);
    };


    // Handle seat selection
    const handleSeatSelect = (seat, quantity) => {
        // Limit the selection to a maximum of 10 tickets for each seat type
        quantity = Math.min(quantity, 10);

        // Check if the seat is already selected
        const existingSeatIndex = selectedSeats.findIndex(
            (selectedSeat) => selectedSeat.seat === seat
        );

        // Toggle selection
        if (existingSeatIndex === -1) {
            // If the seat is not already selected and quantity > 0, add it to the selectedSeats array
            if (quantity > 0) {
                setSelectedSeats([...selectedSeats, { seat, quantity }]);
            }
        } else {
            // If the seat is already selected, update its quantity
            const updatedSeats = [...selectedSeats];
            if (quantity > 0) {
                updatedSeats[existingSeatIndex].quantity = quantity;
            } else {
                // If quantity is 0, remove the seat from selectedSeats
                updatedSeats.splice(existingSeatIndex, 1);
            }
            setSelectedSeats(updatedSeats);
        }

        // Save selected seats to localStorage
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    };



    // Handle the booking process
    const handleBookNow = async () => {
        try {
            // Check if all required data is selected
            if (selectedMovie && selectedSlot && selectedSeats.length > 0) {
                // Calculate total seats based on selected seats
                const updatedTotalSeat = { ...totalSeat };
                selectedSeats.forEach(({ seat, quantity }) => {
                    updatedTotalSeat[seat] += quantity;
                });

                // Prepare data for the POST request
                const bookingData = {
                    movie: selectedMovie,
                    slot: selectedSlot,
                    seats: updatedTotalSeat,
                };

                // Make a POST request to the server
                const response = await fetch(process.env.REACT_APP_API_LOCAL_PATH, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                });

                if (response.ok) {
                    // If the booking is successful, fetch the last booking details
                    const lastBookingResponse = await fetch(process.env.REACT_APP_API_LOCAL_PATH);
                    const lastBookingData = await lastBookingResponse.json();

                    // Update the state with the last booking details
                    setBookingData(lastBookingData);
                    // Reset selectedSeats after successful booking
                    setSelectedSeats([]);


                    // Clear selections after successful booking
                    setSelectedMovie(null);
                    setSelectedSlot(null);
                    setSelectedSeats([]);
                    // Clear selections in localStorage after successful booking
                    localStorage.setItem("selectedMovie", null);
                    localStorage.setItem("selectedSlot", null);
                    localStorage.setItem("selectedSeats", JSON.stringify([]));

                    alert("Booking Success");
                } else {
                    alert("Booking failed");
                }
            } else {
                alert("Please select a movie, slot, and at least one seat.");
            }
        } catch (error) {
            console.error("An error occurred while booking:", error);
            alert("Booking failed. Please try again.");
        }
    };

    const handleSeatClick = (data, quantity) => {
        // Check if the quantity is greater than 0
        if (quantity > 0) {
            // Toggle seat selection
            handleSeatSelect(data, quantity);
        }
    };


    return (
        <>
            <div className="container">
                <h2 className="mt-5 mb-3">Book That Show!!</h2>
                <div className="d-flex justify-content-between mflex">
                    {/* movie selection  */}
                    <div className="">
                        {/* select movie  */}
                        <div className="movie-row">
                            <h3>Select movie</h3>
                            {movies.map((data, i) => (
                                <button
                                    key={i}
                                    className={`movie-column ${selectedMovie === data ? "movie-column-selected" : ""
                                        }`}
                                    onClick={() => handleMovieSelect(data)}
                                >
                                    <h6>{data} </h6>
                                </button>
                            ))}
                        </div>
                        {/* select slot  */}
                        <div className="slot-row">
                            <h3>Select Time slot</h3>
                            {slots.map((data, i) => (
                                <button
                                    key={i}
                                    className={`slot-column ${selectedSlot === data ? "slot-column-selected" : ""
                                        }`}
                                    onClick={() => handleSlotSelect(data)}
                                >
                                    <h6>{data}</h6>
                                </button>
                            ))}
                        </div>
                        {/* select seats  */}
                        <div className="seat-row">
                            <h3>Select seats</h3>
                            {seats.map((data, i) => (
                                <button
                                    key={i}
                                    className={`seat-column ${selectedSeats.some(
                                        (selectedSeat) => selectedSeat.seat === data
                                    )
                                        ? "seat-column-selected"
                                        : ""
                                        }`}

                                >
                                    <h6> Type {data} </h6>
                                    <input
                                        type="number"
                                        min="0"
                                        max="10"
                                        value={parseInt(selectedSeats.find(seat => seat.seat === data)?.quantity || 0)}
                                        onChange={(e) =>
                                            handleSeatClick(data, parseInt(e.target.value))
                                        }
                                    />
                                </button>
                            ))}
                        </div>

                        <button onClick={handleBookNow} className="book-button mt-3">
                            Book Now
                        </button>
                    </div>

                    {/* booking details  */}
                    <div className="last-order booking">
                        {bookingData.movie ? (
                            <div className="">
                                <h5>Last Booking Details</h5>
                                <p className="p-height">
                                    <strong>Seats:-</strong>
                                </p>

                                <p>
                                    <strong className="pright-5">A1:</strong>
                                    {bookingData.seats.A1}
                                </p>
                                <p>
                                    <strong className="pright-5">A2:</strong>
                                    {bookingData.seats.A2}
                                </p>
                                <p>
                                    <strong className="pright-5">A3:</strong>
                                    {bookingData.seats.A3}
                                </p>
                                <p>
                                    <strong className="pright-5">A4:</strong>
                                    {bookingData.seats.A4}
                                </p>
                                <p>
                                    <strong className="pright-5">D1:</strong>
                                    {bookingData.seats.D1}
                                </p>
                                <p>
                                    <strong className="pright-5">D2:</strong>
                                    {bookingData.seats.D2}
                                </p>
                                <p className="p-height">
                                    <strong className="pright-5">Slot:</strong>
                                    {bookingData.slot}
                                </p>
                                <p className="p-height">
                                    <strong className="pright-5">Movie:</strong>
                                    {bookingData.movie}
                                </p>
                            </div>
                        ) : (
                            <h4>No previous booking found</h4>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;