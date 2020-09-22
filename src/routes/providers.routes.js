module.exports = app => {
    const providers = require("../controllers/providers.controller.js");
    const brand = require("../controllers/brand.controller.js");
    const product_category = require("../controllers/product_category.controller.js");
    const product = require("../controllers/product.controller.js");

    //Providers
    app.post("/providers", providers.create);
    app.get("/providers", providers.findAll);
    app.get("/providers/:providersId", providers.findOne);
    app.put("/providers/:providersId", providers.update);
    app.delete("/providers/:providersId", providers.delete);

    //Brands
    app.post("/brands", brand.create);
    app.get("/brands", brand.findAll);
    app.get("/brands/:brandId", brand.findOne);
    app.put("/brands/:brandId", brand.update);
    app.delete("/brands/:brandId", brand.delete);

    //Product categories
    app.post("/product_categories", product_category.create);
    app.get("/product_categories", product_category.findAll);
    app.get("/product_categories/:product_categoryId", product_category.findOne);
    app.put("/product_categories/:product_categoryId", product_category.update);
    app.delete("/product_categories/:product_categoryId", product_category.delete);

    //Product
    app.post("/product", product.create);
    app.get("/product", product.findAll);
    app.get("/product/:productId", product.findOne);
    app.put("/product/:productId", product.update);
    app.delete("/product/:productId", product.delete);
};