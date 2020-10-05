module.exports = app => {
    const purchase = require("../controllers/procedure_purchase.controller.js");

      //Brands
      app.post("/procedure_purchase", purchase.create);
};