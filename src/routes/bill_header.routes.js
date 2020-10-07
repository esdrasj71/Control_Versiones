module.exports = app => {
    const bill_header = require("../controllers/bill_header.controller.js");

      //Bill header
      app.post("/bill_header", bill_header.create);
      app.get("/bill_header", bill_header.findAll);
      app.get("/bill_header/:Bill_header_Id", bill_header.findOne);
      app.put("/bill_header/:Bill_header_Id", bill_header.update);
      app.delete("/bill_header/:Bill_header_Id", bill_header.delete);
};
