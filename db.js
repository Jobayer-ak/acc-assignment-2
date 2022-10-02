const mongoose = require("mongoose");
const colors = require("colors");

// database connection 
const dbConnection = () =>{
    const url = process.env.URL;
    mongoose.connect(url).then(()=>{
        console.log(`Database connection is successful`.red.bold);
    });
};

module.exports = dbConnection;