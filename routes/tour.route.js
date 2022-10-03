const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");
const viewCount = require("../viewCount/viewCount");

router.route("/").get(tourController.getTours).post(tourController.createTour);

// dynamic :id always should be bottom
router.route("/:id").get(viewCount,tourController.getTourById).patch(tourController.updateTourById);

module.exports = router;