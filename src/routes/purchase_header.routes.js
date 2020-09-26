module.exports = app => {
    const purchase_header = require("../controllers/purchase_header.controller.js");

     app.post("/purchase_header", purchase_header.create);
     app.get("/purchase_header", purchase_header.findAll);
     app.get("/purchase_header/:Purchase_Header_Id", purchase_header.findOne);
     app.put("/purchase_header/:Purchase_Header_Id", purchase_header.update);
     app.delete("/purchase_header/:Purchase_Header_Id", purchase_header.delete);

};