const router=require('express').Router();
const bill_header = require("../controllers/bill_header.controller.js");
    router.post("/bill_header", bill_header.create);
    router.get("/bill_header", bill_header.findAll);
    router.get("/nofactura", bill_header.findNoFactura);
    router.get("/bill_header/:Bill_header_Id", bill_header.findOne);
    router.put("/bill_header/:Bill_header_Id", bill_header.update);
    router.delete("/bill_header/:Bill_header_Id", bill_header.delete);
module.exports=router;