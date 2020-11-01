const router=require('express').Router();
const debs_to_pay = require("../controllers/debs_to_pay.controller");
    router.post("/DebstoPay", debs_to_pay.create);
    router.get("/DebstoPay", debs_to_pay.findAllDebs);
    router.get("/DebstoPay/:debstopayId", debs_to_pay.findOneDebs);
    router.get("/DebstoPayPurchase/:purchaseheaderId", debs_to_pay.findOnePurchase);
module.exports=router;