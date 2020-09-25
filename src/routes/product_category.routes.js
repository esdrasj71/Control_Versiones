module.exports = app => {
    const product_category = require("../controllers/product_category.controller.js");

      //Product categories
      app.post("/product_categories", product_category.create);
      app.get("/product_categories", product_category.findAll);
      app.get("/product_categories/:product_categoryId", product_category.findOne);
      app.put("/product_categories/:product_categoryId", product_category.update);
      app.delete("/product_categories/:product_categoryId", product_category.delete);
      
};