const express = require("express");
const router = express.Router({mergeParams: true});

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.route("/")
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)


module.exports = router;