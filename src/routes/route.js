
const express = require("express");
const router = express.Router();
const urlController =require("../controller/urlController");

//------------------urlCOntroller--------------------------------------------//
router.post("/url/shorten", urlController.createUrl);
router.get("/:urlCode", urlController.getUrl);

router.get("*", function (req,res){
    return res.status(404).send("ERROR!: page not found")
});

module.exports=router;