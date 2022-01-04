// router
const express = require("express");
const router = express.Router();
const { authChecker } = require("../middlewares/userAuth");

const picController = require("../controllers/picControllers");

//add new pic
router.route("/new").post(authChecker, picController.newPic);

//get list of pics
router.route("/all").get(picController.allPics)

//get single pic
router.route("/:picID").get(picController.singlePic)

//delete a pic
router.route("/delete/:picID").delete(authChecker, picController.deletePic)

module.exports = router;
