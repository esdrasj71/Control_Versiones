const router = require('express').Router();
    const balance_sheet = require("../controllers/balance_sheet.controller");

    router.post("/balance", balance_sheet.create);
   
module.exports = router;