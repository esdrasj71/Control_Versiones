const router=require('express').Router();
    const savelot = require("../controllers/procedure_lot.controller");
    //Product
    router.post("/procedure_lot", savelot.create);
module.exports=router;