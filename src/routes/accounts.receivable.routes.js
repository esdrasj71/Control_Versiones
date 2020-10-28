module.exports = app => {
    const accounts_receivable = require("../controllers/accounts_receivable.controller");

    //Accounts_receivable
    app.post("/accounts_receivable", accounts_receivable.create);
    app.get("/accounts_receivable", accounts_receivable.findAll);
    app.get("/accounts_receivable/:Customers_Id", accounts_receivable.getOne);
    app.get("/accounts_receivablee/:Bill_header_Id", accounts_receivable.getDetalle);
    //app.put("/bill_detail/:Bill_Detail_Id", bill_detail.update);
    //app.delete("/bill_detail/:Bill_Detail_Id", bill_detail.delete);
};