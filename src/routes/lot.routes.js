const router=require('express').Router();
const lot = require("../controllers/lot.controller.js");

    router.post("/lot", lot.create);
    router.get("/lot", lot.findAll);
    router.get("/lot/:Lot_Id", lot.findOne);
    router.put("/lot/:Lot_Id", lot.update);
module.exports=router;