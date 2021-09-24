const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");

// Routes for SignUp and Login
router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
