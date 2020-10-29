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
    Usertype: req.body.Usertype,
    Employee_Id: req.body.Employee_Id,
  });

  // Save user
  Login.create(login, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      if (!data) {
        res.json({
          mensaje: "Autenticación Incorrecta",
        });
      } else {
        console.log(data);
        const id = data.User_Id;
        login.Username = data.Username;
        login.Password = data.Password;
        login.Usertype = data.Usertype;
        login.Employee_Id = data.Employee_Id;
        login.Token = jwt.sign({ id }, "secretpass", {
          expiresIn: "1d",
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
          Username: login.Username,
          Usertype: login.Usertype,
          Employee_Id: login.Employee_Id
        });
      }
    }
  });
};
