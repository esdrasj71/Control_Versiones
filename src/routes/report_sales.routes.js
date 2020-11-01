const router = require('express').Router();
    const report_sales = require("../controllers/report_sales.controller");

    router.post("/report_sales", report_sales.create);
    router.get("/report_sales", report_sales.Reporte3);
    router.post("/report_sales1", report_sales.create1);
    router.get("/series", report_sales.Series);
    
module.exports = router;