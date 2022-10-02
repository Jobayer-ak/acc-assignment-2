const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const dbConnection = require("./db");

const app = express();
const port = process.env.PORT || 8080;



// middlewares
app.use(express.json());
app.use(cors());

// routes

// db connection
dbConnection();

// api calling
app.use("/api/v1/tours")

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`.yellow.bold)
});