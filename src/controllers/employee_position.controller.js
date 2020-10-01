const Employee_Position = require("../models/employee_position.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Create brand
  const employee_position = new Employee_Position({
    Name: req.body.Name,
    Description: req.body.Description
  });

  // Save employee_position
  Employee_Position.create(employee_position, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all employee_position data
    Employee_Position.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Employee_Position.findById(req.params.Employee_Position_Id, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the brand") {
          res.status(404).send({
            message: `Posicion empleado con ID no encontrado ${req.params.Employee_Position_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Posicion empleado con ID no encontrado " + req.params.Employee_Position_Id
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
        message: "El contenido no puede ir vacio!"
      });
    }
    //update employee position with your id
    Employee_Position.updateById(
      req.params.Employee_Position_Id,
      new Employee_Position(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the brand to update") {
            res.status(404).send({
              message: `Posicion empleado no encontrado ${req.params.Employee_Position_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando posicion empleado con el ID " + req.params.Employee_Position_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Employee_Position.remove(req.params.Employee_Position_Id, (err, data) => {
      if (err) {
        if (err.kind === "The brand you want to remove was not found") {
          res.status(404).send({
            message: `Posicion empleado con ID no se pudo encontrar ${req.params.Employee_Position_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puedo eliminar posicion empleado con ID " + req.params.Employee_Position_Id
          });
        }
      } else res.send({ message: `Posicion empleado eliminado exitosmente!` });
    });
  };