
const Tours = require("../models/tours.model");

exports.getToursService = async(filters, queries) =>{
    const result = await Tours.find({})
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

    const total = await Tours.countDocuments(filters);
    const page = Math.ceil(total/queries.limit);

    return {total, page, result};
}

// get tour by id service
exports.getTourByIdService = async (id) =>{
    const tour = await Tours.findById(id);
    return tour;
}

// post method
exports.createProductService = async(data) =>{
    const tour = new Tours(data);
    return tour;
}

// update tour
exports.updateTourByIdService = async(tourId, data) =>{
    const tour = await Tours.findById(tourId);
    const result = await tour.set(data).save();
    return result;
}

// get top 3 cheapest tours
exports.getCheapestToursService = async()=>{

    const result = await Tours.find({}).limit(3).sort({price: 1});

    return result;
}