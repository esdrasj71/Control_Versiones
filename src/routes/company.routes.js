const router=require('express').Router();
const company = require("../controllers/company.controller.js");
      router.get("/company", company.findAll);
      router.post("/company", company.create);
      router.put("/company/:companyId", company.update);
module.exports=router;