const router=require('express').Router();
const employee_pos = require("../controllers/employee_position.controller.js");
      router.post("/employee_position", employee_pos.create);
      router.get("/employee_position", employee_pos.findAll);
      router.get("/employee_position/:Employee_Position_Id", employee_pos.findOne);
      router.put("/employee_position/:Employee_Position_Id", employee_pos.update);
      router.delete("/employee_position/:Employee_Position_Id", employee_pos.delete);
module.exports=router;