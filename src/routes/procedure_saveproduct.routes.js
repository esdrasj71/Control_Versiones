module.exports = app => {
    const saveproduct = require("../controllers/procedure_product.controller");
    //Product
    app.post("/procedure_product", saveproduct.create);
};