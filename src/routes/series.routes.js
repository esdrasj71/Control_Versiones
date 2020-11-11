const router=require('express').Router();
const series = require("../controllers/serie.controller.js");
//Providers
router.post("/series", series.create);
router.get("/seriess", series.findAll);

module.exports=router;