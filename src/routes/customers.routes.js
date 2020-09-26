module.exports = app => {
    const customers = require("../controllers/customers.controller.js");

    app.post("/customer", customers.create);
    app.get("/customer", customers.findAll);
    app.get("/customer/:Customers_Id", customers.findOne);
    app.put("/customer/:Customers_Id", customers.update);
    app.delete("/customer/:Customers_Id", customers.delete);

};