const router=require('express').Router();
const inventoryreport1 = require("../controllers/procedure_inventoryreport1.controller");
    //Report 1
    router.post("/inventory_report1", inventoryreport1.create);
module.exports=router;