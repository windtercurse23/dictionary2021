const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controllers");
const validate = require("../validate/user.validate");
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });

router.get("/", controller.index);
router.get("/create", controller.getCreate);
router.get("/cookie", function (req, res, next) {
  res.cookie("user-id", 12345);
  res.send(`hello `);
});

router.post(
  "/create",
  upload.single("avatar"),
  validate.postCreate,
  controller.postCreate
);
router.get("/search", controller.search);
router.get("/:id", controller.findUser);
router.get("/search", controller.search);

module.exports = router;
