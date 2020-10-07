module.exports = app => {
    const paymentTypeDetail = require("../controllers/payment_type_detail.controller.js");

      //Brands
      app.post("/payment_type_detail", paymentTypeDetail.create);
      app.get("/payment_type_detail", paymentTypeDetail.findAll);
      app.get("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.findOne);
      app.put("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.update);
      app.delete("/payment_type_detail/:Type_Detail_Id", paymentTypeDetail.delete);
      
};
