module.exports = app => {
    const savedebs = require("../controllers/procedure_debstopay.controller");
    //Debs to pay
    app.post("/procedure_debs", savedebs.create);
};