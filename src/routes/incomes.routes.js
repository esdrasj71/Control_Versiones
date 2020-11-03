const router=require('express').Router();
const incomes = require("../controllers/incomes.controller.js");

    router.get("/incomes", incomes.getAll);

module.exports=router;