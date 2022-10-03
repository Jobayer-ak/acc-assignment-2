const mongoose = require("mongoose");
const Tours = require("../models/tours.model");
const {
  getToursService,
  createProductService,
} = require("../services/tour.services");

// get method
exports.getTours = async (req, res) => {
  try {
    console.log(req.query);
    let filters = { ...req.query };

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 2 } = req.query;

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getToursService(filters, queries);
    res.status(200).json({
      status: "Success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Could not get the tours data!",
    });
  }
};

// post method
exports.createTour = async (req, res) => {
  try {
    const tour = await createProductService(req.body);
    const result = await tour.save();

    // result.logger();

    res.status(200).json({
      status: "Success",
      message: "Tour is inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted!",
      error: error.message,
    });
  }
};
