const router=require('express').Router();
const costs = require("../controllers/costs.controller.js");
      router.post("/costs", costs.create);
      router.get("/costs", costs.findAll);
      router.get("/costs/:costsId", costs.findOne);
      router.put("/costs/:costsId", costs.update);
      router.delete("/costs/:costsId", costs.delete);
module.exports=router;