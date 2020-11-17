const User = require("../models/user.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "COMES EMPTY"
    });
  }
  // Create user
  let fecha = new Date;
  const user = new User({
    Username: req.body.Username,
    Password: req.body.Password,
    Date_Created: fecha,
    Usertype:req.body.Usertype,
    Employee_Id:req.body.Employee_Id
  });

  // Save user
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "An error has occurred!"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all supplier data
    User.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "An error has occurred!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the provider with its id
    User.findById(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the supplier") {
          res.status(404).send({
            message: `User with id not found ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "User with id not found " + req.params.userId
          });
        }
      } else res.send(data);
    });
  };
//UPDATE
  exports.update = (req, res) => {
    // Validating request
    if (!req.body) {
      res.status(400).send({
        message: "The content cannot go empty!"
      });
    }
    //update provider with your id
    User.updateById(
      req.params.userId,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the provider to update") {
            res.status(404).send({
              message: `Provider with id not found ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Updating provider with id " + req.params.userId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
      if (err) {
        if (err.kind === "The User you want to remove was not found") {
          res.status(404).send({
            message: `User with id not found ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not remove provider with id" + req.params.userId
          });
        }
      } else res.send({ message: `User has been successfully removed!` });
    });
  };