module.exports = app => {
    const employee = require("../controllers/employee.controller.js");

      //Employee
      app.post("/employee", employee.create);
      app.get("/employee", employee.findAll);
      app.get("/employee/:employeeId", employee.findOne);
      app.put("/employee/:employeeId", employee.update);
      app.delete("/employee/:employeeId", employee.delete);
      
};