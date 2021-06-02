const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameControllers.js");
const publisherController = require("../controllers/publisherController.js");
const reviewController = require("../controllers/reviewController.js");
const userController = require("../controllers/userController.js");
router.route("/api/games")
    .get(gameController.showAll)
    .post(gameController.addGame)

router.route("/api/games/:gameID")
    .get(gameController.showOne)
    .delete(gameController.deleteByID)
    .put(gameController.fullyUpdateGame)
    .patch(gameController.partiallyUpdateGame);

router.route("/api/games/:gameID/publisher")
    .post(publisherController.addPublisher)
    .get(publisherController.showPublisher)
    .patch(publisherController.partiallyUpdatePublisher)
    .delete(publisherController.deletePublisher);

router.route("/api/games/:gameID/reviews")
    .post(reviewController.addreview)
    .get(reviewController.showreviews);

router.route("/api/games/:gameID/reviews/:reviewID")
    .delete(reviewController.deleteReview)
    .get(reviewController.showOneReview)
    .put(reviewController.fullyUpdatereview)
    .patch(reviewController.partiallyUpdatereview);

router.route("/api/users/register").post(userController.register);
router.route("/api/users/login").post(userController.login);

module.exports = router;
