const router=require('express').Router();
const providers = require("../controllers/providers.controller.js");
//Providers
router.post("/providers", providers.create);
router.get("/providers", providers.findAll);
router.get("/providers/:providersId", providers.findOne);
router.put("/providers/:providersId", providers.update);
router.delete("/providers/:providersId", providers.delete);
module.exports=router;
