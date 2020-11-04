const router=require('express').Router();
const incomes = require("../controllers/incomes.controller.js");

    router.get("/incomes", incomes.getAll);
    router.get("/empresa", incomes.finEmpresa);
    router.post("/incomes", incomes.create);
    router.get("/incomess", incomes.finAll);
    router.put("/incomesactualiza/:Income_Date", incomes.update);

module.exports=router;