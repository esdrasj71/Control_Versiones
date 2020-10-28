module.exports = app => {
    const report_sales = require("../controllers/report_sales.controller");

    //Accounts_receivable
    app.post("/report_sales", report_sales.Reporte2);
    app.get("/report_sales", report_sales.Reporte3);

};