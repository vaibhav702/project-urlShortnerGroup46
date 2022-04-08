const express = require("express");
const router = express.Router();
const urlController =require("../controller/urlController");

//------------------urlCOntroller--------------------------------------------//
//create shortUrl
router.post("/url/shorten", urlController.createUrl);
//get shortUrl
router.get("/:urlCode", urlController.getUrl);

//page not found
router.get("*", function (req,res){
    return res.status(404).send("ERROR!: page not found")
});

module.exports=router;
