const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Route for user login
router.post("/login", userController.loginUser);

// Route for user registration
router.post("/register", userController.registerUser);

// Route for handling forgotten password
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
