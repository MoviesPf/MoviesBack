const { Router } = require("express");
const {getReviews,createNewReview,getReviewByUser,  deleteReviewById, editRviewComment} = require("../Handlers/reviewsHandler.js");

const router = Router();

router.get("/review", getReviews);

router.get("/review", getReviewByUser);

router.post("/review", createNewReview);

router.delete("/review/:id", deleteReviewById);

router.patch("/review", editRviewComment);

module.exports = router;