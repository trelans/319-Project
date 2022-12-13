const express = require('express')
const User = require("../models/user");
const router = new express.Router()
const mongoose = require('mongoose');
const path = require("path");
const multer = require("multer");
const File = require("../models/file");

// destination /server/server.js
const storage = multer.diskStorage({
    destination: "./public/",
    filename: function(req, file, cb){
        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).single("myfile");

const obj =(req,res) => {
    upload(req, res, () => {
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);//Here you get file.
        const file = new File();
        file.meta_data = req.file;
        file.save().then(()=>{
            res.send({message:"uploaded successfully"})
        })
        /*Now do where ever you want to do*/
    });
}

router.post("/upload-excel", obj);

module.exports = router