const router = require("express").Router();
const login = require("../controllers/login.controller.js");

//login
router.post("/login", login.create);
module.exports = router;
