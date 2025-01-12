const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
// matches GET requests sent to /api/users
// (the prefix from server.js)
router.get("/", (req, res) => {
  Controllers.postController.getUsersPost(res);
});
// matches POST requests sent to /api/users/create
router.post("/create", (req, res) => {
  Controllers.postController.createPost(req.body, res);
});
router.put("/:id", (req, res) => {
  Controllers.postController.updatePost(req, res);
});
// matches DELETE requests to /api/users/123 (123 in id param)
router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});
router.post("/tweet", (req, res) => {
  Controllers.postController.tweet(req.body, res);
});
router.get("/tweets/:username", (req, res) => {
  Controllers.postController.tweets(req, res);
});
module.exports = router;
