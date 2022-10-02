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

// db connection
dbConnection();

app.listen(port, ()=>{
    console.log(`App is running on port ${port}`.yellow.bold)
});