const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.post("/login", (req, res) => {
  Controllers.userController.login(req.body, res);
});

router.post("/follow", (req, res) => {
  Controllers.userController.follow(req.body, res);
});

router.post("/unfollow", (req, res) => {
  Controllers.userController.unfollow(req.body, res);
});

router.get("/search/:username", (req, res) => {
  Controllers.userController.search(req, res);
});

router.get("/followers/:username", (req, res) => {
  Controllers.userController.followers(req, res);
});

router.get("/followees/:username", (req, res) => {
  Controllers.userController.followees(req, res);
});

module.exports = router;
