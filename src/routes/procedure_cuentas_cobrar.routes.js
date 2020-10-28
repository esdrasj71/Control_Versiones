module.exports = app => {
    const cuenta_cobrar = require("../controllers/procedure_cuentas_cobrar.controller");

    app.post("/procedure_cuentas_cobrar", cuenta_cobrar.create);
};