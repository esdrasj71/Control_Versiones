const router=require('express').Router();
const brand = require("../controllers/brand.controller.js");
      router.post("/brands", brand.create);
      router.get("/brands", brand.findAll);
      router.get("/brands/:brandId", brand.findOne);
      router.put("/brands/:brandId", brand.update);
      router.delete("/brands/:brandId", brand.delete);
module.exports=router;
