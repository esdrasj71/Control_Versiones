const router=require('express').Router();
const billtype = require("../controllers/bill_type.controller.js");
      router.post("/billtype", billtype.create);
      router.get("/billtype", billtype.findAll);
      router.get("/billtype/:billtypeId", billtype.findOne);
      router.put("/billtype/:billtypeId", billtype.update);
      router.delete("/billtype/:billtypeId", billtype.delete);
module.exports=router;