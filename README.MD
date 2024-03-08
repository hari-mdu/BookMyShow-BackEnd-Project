# AlmaBetter Backend Capstone Project

## BookMyShow

BookMyShow is a MERN stack application designed to streamline the process of booking movie tickets. The system provides users with a user-friendly interface to select movies, time slots, and seats, make bookings, and view their previous bookings. It consists of three main servers: frontend, backend, and database.

## Table of Contents

* Features
* Prerequisites
* Folder Structure
* Dependencies
* Installation
* Environment Variables
* API Documentation
* Deployment Links

### Features

* Movie Selection: Users can browse through available movies and select their preferred movie.
* Time Slot Selection: Choose from available time slots for the selected movie.
* Seat Selection: Select seats for the chosen movie and time slot.
* Booking: Make bookings for the selected movie, time slot, and seats.
* View Bookings: Users can view their previous bookings.

### Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js and npm installed.
* MongoDB database setup.

### Folder Structure
    
* frontend = Contains the React frontend.
* backend = Contains the Express backend.

### Dependencies

This project uses the following major libraries and frameworks:

- ReactJS (frontend)
- NodeJS & ExpressJS (backend)
- MongoDB (database)
- Bootstrap (styling)

For a full list of dependencies, please check the package.json files in both the client and server directories.

### Installation

Clone the repository

```
git clone https://github.com/hari-mdu/BookMyShow-Backend-Project.git
```

open this project on you local IDE and in the terminal enter these commands

- For Frotend
```
cd frontend

npm install

npm start
```
- For backend 
```
cd backend

npm install

npm start 
```
 This will start you frontend part in http://localhost:3000 and backend part running in http://localhost:8080 




### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Note : your mongodb cluster connect key 

MONGODBLIVE : mongodb+srv://user_name:<password>@cluster0.adfedxd.mongodb.net/<database_name>?retryWrites=true&w=majority



### API Documentation

#### Base URL
https://bookmyshow-backend-project.onrender.com/

#### Booking

Returns a list of last booking stored in the database in JSON format.

```http
  GET /api/booking
```
Add booking details to the database

```http
  post /api/booking
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `movie` | `string` | **Required**. your selected movie |
| `slots ` | `string` | **Required**. your selected time|
| `Seats ` | `number` | **Required**. no of seats you have seleacted|

Returns the newly created booking in JSON format



### Deployment Links

click on the link to view the project website

Frontend on netlify.com

 - https://book-my-show-backend.netlify.app/

Backend on render.com

 - https://bookmyshow-backend-project.onrender.com/api/booking
