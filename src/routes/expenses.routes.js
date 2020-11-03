const router=require('express').Router();
const expenses = require("../controllers/expenses.controller.js");
      router.post("/expenses", expenses.create);
      router.get("/expenses", expenses.findAll);
      router.get("/expenses/:expensesId", expenses.findOne);
      router.put("/expenses/:expensesId", expenses.update);
      router.delete("/expenses/:expensesId", expenses.delete);
module.exports=router;