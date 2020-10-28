const router=require('express').Router();
    const product = require("../controllers/product.controller.js");

    //Product
    router.post("/product", product.create);
    router.get("/product", product.findAll);
    router.get("/product/:productId", product.findOne);
    router.put("/product/:productId", product.update);
    router.delete("/product/:productId", product.delete);
    module.exports=router;