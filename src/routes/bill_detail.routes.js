const router=require('express').Router();
const bill_detail = require("../controllers/bill_detail.controller.js");
      router.post("/bill_detail", bill_detail.create);
      router.get("/bill_detail", bill_detail.findAll);
      router.get("/bill_detail/:Bill_Detail_Id", bill_detail.findOne);
      router.put("/bill_detail/:Bill_Detail_Id", bill_detail.update);
      router.delete("/bill_detail/:Bill_Detail_Id", bill_detail.delete);
module.exports=router;
