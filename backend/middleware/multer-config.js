const multer = require("multer");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images"); // Image storage folder
	},
	filename: (req, file, callback) => {
		const fileName = file.originalname.split(".")[0].split(" ").join("_");
		const fileMimetype = MIME_TYPES[file.mimetype];
		callback(null, `${fileName}.${fileMimetype}`);
	},
});

module.exports = multer({ storage }).single("image");
