const router=require('express').Router();
const cuenta_cobrar = require("../controllers/procedure_cuentas_cobrar.controller");

    router.post("/procedure_cuentas_cobrar", cuenta_cobrar.create);
module.exports=router;