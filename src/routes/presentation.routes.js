module.exports = app => {
    const presentation = require("../controllers/presentation.controller.js");

    app.post("/presentation", presentation.create);
    app.get("/presentation", presentation.findAll);
    app.get("/presentation/:Presentation_Id", presentation.findOne);
    app.put("/presentation/:Presentation_Id", presentation.update);
    app.delete("/presentation/:Presentation_Id", presentation.delete);

};