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

exports.createProductService = async(data) =>{
    const tour = new Tours(data);
    return tour;
}