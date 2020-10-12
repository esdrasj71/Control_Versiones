module.exports = app => {
  const sale = require("../controllers/procedure_sales.controller");

  //Brands
  app.post("/procedure_sale", sale.create);
};