const router=require('express').Router();
    const saveproduct = require("../controllers/procedure_product.controller");
    //Product
    router.post("/procedure_product", saveproduct.create);
module.exports=router;