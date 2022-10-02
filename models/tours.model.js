const mongoose = require("mongoose");

// schema design
const toursSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name!"],
      unique: true,
      minLength: [3, "Name must me at least 3 characters!"],
      maxLength: [100, "Name is too large!"],
    },
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative!"],
    },
    viewCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

//
const Tour = mongoose.model("Tour", toursSchema);

module.exports = Tour;
