const router = require("express").Router();
const purchase_header = require("../controllers/purchase_header.controller.js");

     router.post("/purchase_header", purchase_header.create);
     router.get("/purchase_header", purchase_header.findAll);
     router.get("/purchase_header/:Purchase_Header_Id", purchase_header.findOne);
     router.put("/purchase_header/:Purchase_Header_Id", purchase_header.update);
     router.delete("/purchase_header/:Purchase_Header_Id", purchase_header.delete);
     
module.exports=router;