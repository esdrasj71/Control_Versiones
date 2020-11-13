const router=require('express').Router();
const employee = require("../controllers/employee.controller.js");
      router.post("/employee", employee.create);
      router.get("/employee", employee.findAll);
      router.get("/employeelogin", employee.findLogin);
      router.get("/employee/:employeeId", employee.findOne);
      router.put("/employee/:employeeId", employee.update);
      router.delete("/employee/:employeeId", employee.delete);
module.exports=router;