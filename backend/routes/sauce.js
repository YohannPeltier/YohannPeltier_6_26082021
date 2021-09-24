const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const sauceCtrl = require("../controllers/sauce");

// Routes for get, add, update, delete and like sauces
router.get("/", auth, sauceCtrl.getAllSauces); // get all sauces
router.get("/:id", auth, sauceCtrl.getOneSauce); // get a sauce
router.post("/", auth, multer, sauceCtrl.createSauce); // add a sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce); // update a sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce); // delete a sauce
router.post("/:id/like", auth, sauceCtrl.likeSauce); // add like or dislike to a sauce

module.exports = router;
