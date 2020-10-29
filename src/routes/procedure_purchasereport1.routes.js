const router=require('express').Router();
const purchasereport1 = require("../controllers/procedure_purchasereport1.controller");
    //Report 1
    router.post("/purchase_report1", purchasereport1.create);
    router.get("/purchase_report1/:purchasereport1Id", purchasereport1.detailreport1);
module.exports=router;