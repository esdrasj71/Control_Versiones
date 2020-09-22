module.exports = app => {
    const providers = require("../controllers/providers.controller.js");
    //Crear proveedor
    app.post("/providers", providers.create);
    // Retrieve all Customers
    app.get("/providers", providers.findAll);

    // Retrieve a single Customer with customerId
    app.get("/providers/:providersId", providers.findOne);

    // Update a Customer with customerId
    app.put("/providers/:providersId", providers.update);

    // Delete a Customer with customerId
    app.delete("/providers/:providersId", providers.delete);

};