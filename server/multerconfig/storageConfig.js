const multer = require("multer");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const filefilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("Only .png .jpg & .jpeg formatted Allowed"))
    }
}

const upload = multer({ storage: storage, fileFilter: filefilter });

module.exports = upload;
