module.exports = app => {
    const debs_to_pay = require("../controllers/debs_to_pay.controller");
    app.get("/DebstoPay", debs_to_pay.findAllDebs);
    app.get("/DebstoPay/:debstopayId", debs_to_pay.findOneDebs);
};