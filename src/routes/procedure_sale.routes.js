const router=require('express').Router();
const sale = require("../controllers/procedure_sales.controller");

  router.post("/procedure_sale", sale.create);
module.exports=router;