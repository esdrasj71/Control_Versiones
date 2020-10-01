module.exports = app => {
    const employee_pos = require("../controllers/employee_position.controller.js");

      //Employee
      app.post("/employee_position", employee_pos.create);
      app.get("/employee_position", employee_pos.findAll);
      app.get("/employee_position/:Employee_Position_Id", employee_pos.findOne);
      app.put("/employee_position/:Employee_Position_Id", employee_pos.update);
      app.delete("/employee_position/:Employee_Position_Id", employee_pos.delete);
      
};