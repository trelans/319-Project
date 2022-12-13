const express = require('express')
const User = require("../models/user");
const router = new express.Router()
const path = require ('path');
const multer = require ('multer');


// storage engine for multer
const storageEngine = multer.diskStorage ({
    destination: './public/uploads/',
    filename: function (req, file, callback) {
        callback (
            null,
            file.fieldname + '-' + Date.now () + path.extname (file.originalname)
        );
    },
});

// file filter for multer
const fileFilter = (req, file, callback) => {
    let pattern = /jpg|png|svg/; // reqex

    if (pattern.test (path.extname (file.originalname))) {
        callback (null, true);
    } else {
        callback ('Error: not a valid file');
    }
};

// initialize multer
const upload = multer ({
    storage: storageEngine,
    fileFilter: fileFilter,
});

// routing
router.post ('/upload-excel', upload.single ('uploadedFile'), (req, res) => {
    res.json (req.file).status (200);
});

module.exports = router