const router=require('express').Router();
const paymentTypeDetail = require("../controllers/payment_type_detail.controller.js");
      router.post("/payment_type_detail", paymentTypeDetail.create);
      router.get("/payment_type_detail", paymentTypeDetail.findAll);
      router.get("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.findOne);
      router.put("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.update);
      router.delete("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.delete);
module.exports=router;
