// router
const express = require("express");
const router = express.Router();

const {authChecker} = require("../middlewares/userAuth")

const userController = require("../controllers/userControllers");

//register a user
router.route("/register").post(userController.registerUser);

//login a user
router.route("/login").post(userController.login)

//update user details
router.route("/update").put(authChecker,userController.updateUser)

//logout a user
router.route("/logout").get(authChecker,userController.logout)

//list of all users
router.route("/users").get(userController.getAllUsers)

//delete a user
router.route("/delete").delete(authChecker, userController.deleteUser)

module.exports = router;
