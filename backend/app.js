const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/auth");
const sauceRoutes = require("./routes/sauce");

// get config vars
dotenv.config();

// Database URL
const bdUrl = "mongodb+srv://dbUser:.tC4Dm6rhA_g3S.@piiquante.4zrbt.mongodb.net/piiquante?retryWrites=true&w=majority";

// Database connection
mongoose
	.connect(bdUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// Headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

app.use(express.json());

// Routes for auth, sauces and images
app.use("/api/auth", authRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
