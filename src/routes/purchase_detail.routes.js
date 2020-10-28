const router = require("express").Router();
const purchase_detail = require("../controllers/purchase_detail.controller.js");

    router.post("/purchase_detail", purchase_detail.create);
    router.get("/purchase_detail", purchase_detail.findAll);
    router.get("/purchase_detail/:Purchase_Detail_Id", purchase_detail.findOne);
    router.put("/purchase_detail/:Purchase_Detail_Id", purchase_detail.update);
    router.delete("/purchase_detail/:Purchase_Detail_Id", purchase_detail.delete);
    module.exports=router;