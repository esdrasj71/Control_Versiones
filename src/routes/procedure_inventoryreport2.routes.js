const router=require('express').Router();
const inventoryreport2 = require("../controllers/procedure_inventoryreport2.controller");
    //Report 2
    router.post("/inventory_report2", inventoryreport2.create);
module.exports=router;