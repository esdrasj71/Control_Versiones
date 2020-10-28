const router=require('express').Router();
const product_category = require("../controllers/product_category.controller.js");

      //Product categories
      router.post("/product_category", product_category.create);
      router.get("/product_category", product_category.findAll);
      router.get("/product_category/:product_categoryId", product_category.findOne);
      router.put("/product_category/:product_categoryId", product_category.update);
      router.delete("/product_category/:product_categoryId", product_category.delete);
module.exports=router;