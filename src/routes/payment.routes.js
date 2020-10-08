module.exports = app => {
    const payment = require("../controllers/payment.controller.js");

      //Brands
      app.post("/payment", payment.create);
      app.get("/payment", payment.findAll);
      app.get("/payment/:Payment_Id", payment.findOne);
      app.put("/payment/:Payment_Id", payment.update);
      app.delete("/payment/:Payment_Id", payment.delete);
      
};
