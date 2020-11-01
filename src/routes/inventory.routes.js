const router=require('express').Router();
const inventory = require("../controllers/inventory.controller.js");

    router.post("/inventory", inventory.create);
    router.get("/inventory", inventory.findAll);
    router.get("/inventory/:Inventory_Id", inventory.findOne);
    router.put("/inventory/:Inventory_Id", inventory.update);
    router.delete("/inventory/:Inventory_Id", inventory.delete);
    router.get("/inventoryNoPerishable",inventory.findNoPerishable);
module.exports=router;