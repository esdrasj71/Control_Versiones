const router = require('express').Router();
    const estado_result = require("../controllers/status_result.controller");

    router.post("/estadoresultado", estado_result.create);

    
module.exports = router;