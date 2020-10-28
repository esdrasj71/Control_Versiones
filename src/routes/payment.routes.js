const router=require('express').Router();
const payment = require("../controllers/payment.controller.js");
      router.post("/payment", payment.create);
      router.get("/payment", payment.findAll);
      router.get("/payment/:Payment_Id", payment.findOne);
      router.put("/payment/:Payment_Id", payment.update);
      router.delete("/payment/:Payment_Id", payment.delete);
module.exports=router;
