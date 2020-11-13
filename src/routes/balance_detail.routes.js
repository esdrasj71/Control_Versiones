const router=require('express').Router();
    const balance_detail = require("../controllers/balance_detail.controller");

    //Balance detail
    router.post("/balance_detail", balance_detail.createBalance);
  
module.exports=router;