module.exports = app => {
    const savelot = require("../controllers/procedure_lot.controller");
    //Product
    app.post("/procedure_lot", savelot.create);
};