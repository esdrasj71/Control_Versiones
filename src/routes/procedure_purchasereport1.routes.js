const router=require('express').Router();
const purchasereport1 = require("../controllers/procedure_purchasereport1.controller");
    //Report 1
    router.post("/purchase_report1", purchasereport1.create);
    router.get("/purchase_report3", purchasereport1.detaildebs);
module.exports=router;