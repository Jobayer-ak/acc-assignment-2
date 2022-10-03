const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router.route("/").get(tourController.getTours).post(tourController.createTour);
router.route("/cheapest").get(tourController.getCheapestTours);

// dynamic :id always should be bottom
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById);

module.exports = router;
