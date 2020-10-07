module.exports = app => {
    const payment = require("../controllers/payment_purchase.controller.js");

      //Brands
      app.post("/payment_purchase", payment.create);
      app.get("/payment_purchase", payment.findAll);
      app.get("/payment_purchase/:Payment_Purchase_Id", payment.findOne);
      app.put("/payment_purchase/:Payment_Purchase_Id", payment.update);
      app.delete("/payment_purchase/:Payment_Purchase_Id", payment.delete);
      
};
