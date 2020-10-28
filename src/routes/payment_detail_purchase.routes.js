const router=require('express').Router();
const paymentDetail = require("../controllers/payment_detail_purchase.controller.js");
      router.post("/payment_detail_purchase", paymentDetail.create);
      router.get("/payment_detail_purchase", paymentDetail.findAll);
      router.get("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.findOne);
      router.put("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.update);
      router.delete("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.delete);
module.exports=router;
