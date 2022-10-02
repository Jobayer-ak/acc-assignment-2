const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router.route("/").get().post();

// dynamic :id always should be bottom
router.route("/:id").patch();

module.exports = router;