const router=require('express').Router();
const purchasereport2 = require("../controllers/procedure_purchasereport2.controller");
    //Report 2
    router.post("/purchase_report2", purchasereport2.create);
module.exports=router;