const router=require('express').Router();
const savedebs = require("../controllers/procedure_debstopay.controller");
    //Debs to pay
    router.post("/procedure_debs", savedebs.create);
module.exports=router;

