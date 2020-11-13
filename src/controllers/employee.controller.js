const Employee = require("../models/employee.model.js");
const Employee_Position = require("../models/employee_position.model.js");
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create Employee
  const employee = new Employee({
    DPI: req.body.DPI,
    Names: req.body.Names,
    Last_names: req.body.Last_names,
    Phone_number: req.body.Phone_number,
    Cellphone_number: req.body.Cellphone_number,
    Email: req.body.Email,
    Gender: req.body.Gender,
    Hire_date: req.body.Hire_date,
    Employee_Position_Id: req.body.Employee_Position_Id
  });

  // Save Employee
  Employee.create(employee, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all supplier data
    Employee.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error"
        });
      else res.send(data);
    });
  };
//GET Login
exports.findLogin = (req, res) => {
  //Get all supplier data
  Employee.getLogin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error"
      });
    else res.send(data);
  });
};
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the employee with its id
    Employee.findById(req.params.employeeId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado el empleado") {
          res.status(404).send({
            message: `Empleado no encontrado con ID ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "Empleado no encontrado con ID " + req.params.employeeId
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
        message: "El contenido no puede ir vacio"
      });
    }
    //update Employee with your id
    Employee.updateById(
      req.params.employeeId,
      new Employee(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado el empleado a actualizar") {
            res.status(404).send({
              message: `Empleado no encontrado con ID ${req.params.employeeId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando el empleado con ID " + req.params.employeeId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Employee.remove(req.params.employeeId, (err, data) => {
      if (err) {
        if (err.kind === "El Empleado que se quiere eliminar no ha sido encontrado") {
          res.status(404).send({
            message: `Empleado no encontrado con ID ${req.params.employeeId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar el empleado con ID" + req.params.employeeId
          });
        }
      } else res.send({ message: `Empleado eliminado exitosamente` });
    });
  };