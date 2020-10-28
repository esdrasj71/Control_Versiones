const router = require('express').Router();
    const report_sales = require("../controllers/report_sales.controller");

    //Accounts_receivable

    router.post("/report_sales", report_sales.create);
    router.get("/report_sales", report_sales.Reporte3);

module.exports = router;