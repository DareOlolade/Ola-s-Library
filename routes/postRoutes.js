const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Map endpoints to controller actions
router.get("/", postController.getHome);
router.get("/post/:slug", postController.getPostBySlug);

module.exports = router;

