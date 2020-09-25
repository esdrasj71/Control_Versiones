module.exports = app => {
    const brand = require("../controllers/brand.controller.js");

      //Brands
      app.post("/brands", brand.create);
      app.get("/brands", brand.findAll);
      app.get("/brands/:brandId", brand.findOne);
      app.put("/brands/:brandId", brand.update);
      app.delete("/brands/:brandId", brand.delete);
      
};
