const { Router } = require("express");
const {
    getReviews,
    createNewReview,
    getReviewByUser,
    deleteReviewById,
    editReviewComment
} = require("../Handlers/reviews.handler.js");

const router = Router();

router.get("/", getReviews);

router.get("/user/:id", getReviewByUser);

router.post("/", createNewReview);

router.delete("/r:id", deleteReviewById);

router.patch("/", editReviewComment);

module.exports = router;