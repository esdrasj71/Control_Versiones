const router=require('express').Router();
const bank = require("../controllers/bank.controller.js");
      router.post("/bank", bank.create);
      router.get("/bank", bank.findAll);
      router.get("/bank/:bankId", bank.findOne);
      router.put("/bank/:bankId", bank.update);
      router.delete("/bank/:bankId", bank.delete);
module.exports=router;