const router=require('express').Router();
const expenditures = require("../controllers/expenditures.controller.js");
      router.post("/expenditures", expenditures.create);
      router.get("/expenditures", expenditures.findAll);
      router.get("/expenditures/:expendituresId", expenditures.findOne);
      router.put("/expenditures/:expendituresId", expenditures.update);
      router.delete("/expenditures/:expendituresId", expenditures.delete);
module.exports=router;