const router = require("express").Router();
const user = require("../controllers/user.controller.js");
    //User
    router.post("/user", user.create);
    router.get("/user", user.findAll);
    router.get("/user/:userId", user.findOne);
    router.put("/user/:userId", user.update);
    router.delete("/user/:userId", user.delete);
module.exports=router;
