const router=require('express').Router();
const payment = require("../controllers/payment_purchase.controller.js");
      router.post("/payment_purchase", payment.create);
      router.get("/payment_purchase", payment.findAll);
      router.get("/payment_purchase/:Payment_Purchase_Id", payment.findOne);
      router.put("/payment_purchase/:Payment_Purchase_Id", payment.update);
      router.delete("/payment_purchase/:Payment_Purchase_Id", payment.delete);
module.exports=router;
