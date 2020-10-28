const router=require('express').Router();
    const purchase = require("../controllers/procedure_purchase.controller.js");

      //Brands
      router.post("/procedure_purchase", purchase.create);
module.exports=router;