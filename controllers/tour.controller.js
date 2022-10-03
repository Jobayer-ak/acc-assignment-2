const mongoose = require("mongoose");
const Tours = require("../models/tours.model");
const {
  getToursService,
  createProductService,
  getTourByIdService,
  updateTourByIdService,
  getCheapestToursService,
} = require("../services/tour.services");

// get all tours
exports.getTours = async (req, res) => {
  try {
    console.log(req.query);
    let filters = { ...req.query };

    const queries = {};

    

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 3 } = req.query;

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

// get product by id
exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getTourByIdService(id);

    res.status(200).json({
      status: "Success",
      message: "Successfully got the desire tour!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Didn't get get your desire tour!",
      error: error.message,
    });
  }
};

// create single tour
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

// update single tour
exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateTourByIdService(id, req.body);

    res.status(200).json({
      status: "Success",
      message: "Tour is updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Data is not inserted!",
      error: error.message,
    });
  }
};

// get top 3 cheapest tours
exports.getCheapestTours = async(req,res)=>{
  try {

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if(req.query.limit){
      const {limit=1} = req.query;
      queries.limit = parseInt(limit);
    }

    const tours = await getCheapestToursService();

    res.status(200).json({
      status: "Success",
      message: "Cheapest Tours!",
      data: tours
    });
    
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Didn't get data!",
      error: error.message,
    });
  }
}
