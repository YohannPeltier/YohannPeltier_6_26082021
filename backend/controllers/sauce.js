const Sauce = require("../models/Sauce");
const fs = require("fs");

// Get data of all the sauces
exports.getAllSauces = (req, res, next) => {
	Sauce.find()
		.then((sauces) => res.status(200).json(sauces))
		.catch((error) => res.status(400).json({ error: error }));
};

// Get data from one sauce
exports.getOneSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => res.status(200).json(sauce))
		.catch((error) => res.status(400).json({ error: error }));
};

// Create a sauce
exports.createSauce = (req, res, next) => {
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce({
		...sauceObject,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	});
	sauce
		.save()
		.then(() => res.status(201).json({ message: "Sauce enregistrée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Update a sauce
exports.modifySauce = (req, res, next) => {
	const sauceObject = req.file
		? {
				...JSON.parse(req.body.sauce),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
		  }
		: { ...req.body };
	Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Sauce modifiée !" }))
		.catch((error) => res.status(400).json({ error }));
};

// Deleta a sauce
exports.deleteSauce = (req, res, next) => {
	Sauce.findOne({ _id: req.params.id })
		.then((sauce) => {
			const filename = sauce.imageUrl.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Sauce.deleteOne({ _id: req.params.id })
					.then(() => res.status(200).json({ message: "Sauce supprimée !" }))
					.catch((error) => res.status(400).json({ error: error }));
			});
		})
		.catch((error) => res.status(500).json({ error }));
};

// Like or dislike a sauce
exports.likeSauce = (req, res, next) => {
	if (req.body.like === 0) {
		Sauce.findOne({ _id: req.params.id })
			.then((sauce) => {
				const action = sauce.usersLiked.includes(req.body.userId) ? "liked" : "disliked";
				const usersAction = "users" + action.charAt(0).toUpperCase() + action.substr(1);
				Sauce.updateOne(
					{ _id: req.params.id },
					{ $inc: { [action]: -1 }, $pull: { [usersAction]: req.body.userId } }
				)
					.then(() => {
						res.status(200).json({ message: `${action} supprimé !` });
					})
					.catch((error) => res.status(400).json({ error }));
			})
			.catch((error) => res.status(400).json({ error }));
	} else {
		const action = req.body.like === 1 ? "liked" : "disliked";
		const usersAction = "users" + action.charAt(0).toUpperCase() + action.substr(1);
		Sauce.updateOne({ _id: req.params.id }, { $inc: { [action]: 1 }, $push: { [usersAction]: req.body.userId } })
			.then(() => res.status(200).json({ message: `${action} ajouté !` }))
			.catch((error) => res.status(400).json({ error }));
	}
};
