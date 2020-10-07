module.exports = app => {
    const bill_detail = require("../controllers/bill_detail.controller.js");

      //Bill detail
      app.post("/bill_detail", bill_detail.create);
      app.get("/bill_detail", bill_detail.findAll);
      app.get("/bill_detail/:Bill_Detail_Id", bill_detail.findOne);
      app.put("/bill_detail/:Bill_Detail_Id", bill_detail.update);
      app.delete("/bill_detail/:Bill_Detail_Id", bill_detail.delete);
};
