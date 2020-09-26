module.exports = app => {
    const lot = require("../controllers/lot.controller.js");

    app.post("/lot", lot.create);
    app.get("/lot", lot.findAll);
    app.get("/lot/:Lot_Id", lot.findOne);
    app.put("/lot/:Lot_Id", lot.update);

};