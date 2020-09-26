module.exports = app => {
    const purchase_detail = require("../controllers/purchase_detail.controller.js");

    app.post("/purchase_detail", purchase_detail.create);
    app.get("/purchase_detail", purchase_detail.findAll);
    app.get("/purchase_detail/:Purchase_Detail_Id", purchase_detail.findOne);
    app.put("/purchase_detail/:Purchase_Detail_Id", purchase_detail.update);
    app.delete("/purchase_detail/:Purchase_Detail_Id", purchase_detail.delete);

};