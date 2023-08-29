const { Router } = require("express");
const {getReviews,createNewReview,getReviewByUser,  deleteReviewById, editRviewComment} = require("../Handlers/reviews.handler.js");

const router = Router();

router.get("/", getReviews);

router.get("/", getReviewByUser);

router.post("/", createNewReview);

router.delete("/r:id", deleteReviewById);

router.patch("/", editRviewComment);

module.exports = router;