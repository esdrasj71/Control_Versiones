module.exports = app => {
    const paymentDetail = require("../controllers/payment_detail_purchase.controller.js");

      //Brands
      app.post("/payment_detail_purchase", paymentDetail.create);
      app.get("/payment_detail_purchase", paymentDetail.findAll);
      app.get("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.findOne);
      app.put("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.update);
      app.delete("/payment_detail_purchase/:Payment_Detail_Purchase_Id", paymentDetail.delete);
      
};
