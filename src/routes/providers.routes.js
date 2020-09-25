module.exports = app => {
    const providers = require("../controllers/providers.controller.js");

    //Providers
    app.post("/providers", providers.create);
    app.get("/providers", providers.findAll);
    app.get("/providers/:providersId", providers.findOne);
    app.put("/providers/:providersId", providers.update);
    app.delete("/providers/:providersId", providers.delete);

};