const router=require('express').Router();
const customers = require("../controllers/customers.controller.js");
    router.post("/customer", customers.create);
    router.get("/customer", customers.findAll);
    router.get("/customer/:Customers_Id", customers.findOne);
    router.put("/customer/:Customers_Id", customers.update);
    router.delete("/customer/:Customers_Id", customers.delete);
module.exports=router;