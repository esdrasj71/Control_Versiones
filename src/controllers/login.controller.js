const Login = require("../models/login.model.js");
const jwt = require("jsonwebtoken");
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY",
    });
  }
  // Create user
  const login = new Login({
    Username: req.body.Username,
    Password: req.body.Password,
    Token: req.body.Token,
  });

  // Save user
  Login.create(login, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message,
      });
    }
    else {
      if(!data)
      {
        res.json({
          mensaje: "Autenticación Incorrecta",
        });
      }else{
        const id = data.User_Id;
      login.Username = data.Username;
      login.Password = data.Password;
      login.Token = jwt.sign({ id }, "secretpass", {
        expiresIn: '1d',
      });
      //console.log("El token es: " + login.Token);
      //const cookieOptions = {
        //expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      //  httpOnly: true,
      //  secure: true,
     // };
      res.json({
        mensaje: "Autenticación correcta",
        Token: login.Token,
        User_Id: data.User_Id,
        Username: login.Username
      });
      }
    }
  });
};
