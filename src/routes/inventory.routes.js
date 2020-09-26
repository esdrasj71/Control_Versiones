module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");

    app.post("/inventory", inventory.create);
    app.get("/inventory", inventory.findAll);
    app.get("/inventory/:Inventory_Id", inventory.findOne);
    app.put("/inventory/:Inventory_Id", inventory.update);
    app.delete("/inventory/:Inventory_Id", inventory.delete);

};