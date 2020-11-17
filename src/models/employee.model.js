const sql = require("../conexion.js");

// constructor
const Employee = function(employee) {
  this.DPI = employee.DPI;
  this.Names = employee.Names;
  this.Last_names = employee.Last_names;
  this.Phone_number = employee.Phone_number;
  this.Cellphone_number = employee.Cellphone_number;
  this.Email = employee.Email;
  this.Gender = employee.Gender;
  this.Hire_date = employee.Hire_date;
  this.Employee_Position_Id = employee.Employee_Position_Id;
};

//CRUD
Employee.create = (newEmployee, result) => {
  sql.query("INSERT INTO Employee SET ?", newEmployee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Empleado creado: ", { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

Employee.findById = (employeeId, result) => {
  sql.query(`SELECT * FROM Employee WHERE Employee_Id = ${employeeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Empleado encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "no encontrado" }, null);
  });
};

Employee.getAll = result => {
  sql.query("SELECT *, p.Name as Posicion, CASE e.Gender WHEN 1 then 'Masculino' WHEN 0 then 'Femenino' END as SEXO FROM Employee as e INNER JOIN Employee_Position as p ON p.Employee_Position_Id = e.Employee_Position_Id ORDER BY e.Names ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Empleados: ", res);
    result(null, res);
  });
};
//Employeenonuser
Employee.getLogin = result => {
  sql.query("SELECT *, e.Employee_Id, p.Name as Posicion, CASE e.Gender WHEN 1 then 'Masculino' WHEN 0 then 'Femenino' END as SEXO FROM Employee as e INNER JOIN employee_position as p ON p.Employee_Position_Id = e.Employee_Position_Id left join user as u on u.Employee_Id = e.Employee_Id where u.Employee_Id is null ORDER BY e.Names ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Empleados: ", res);
    result(null, res);
  });
};

Employee.updateById = (id, employee, result) => {
  sql.query(
    "UPDATE Employee SET DPI = ?, Names = ?, Last_names = ?, Phone_number = ?, Cellphone_number = ?, Email = ?, Gender = ?, Hire_date = ?, Employee_Position_Id = ? WHERE Employee_Id = ?",
    [employee.DPI, employee.Names, employee.Last_names, employee.Phone_number, employee.Cellphone_number, employee.Email, employee.Gender, employee.Hire_date, employee.Employee_Position_Id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "no encontrado" }, null);
        return;
      }
      console.log("Empleado actualizado: ", { id: id, ...employee });
      result(null, { id: id, ...employee });
    }
  );
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM Employee WHERE Employee_Id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "no encontrado" }, null);
      return;
    }

    console.log("Empleado eliminado con ID: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM Employee", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Empleados ${res.affectedRows} eliminados`);
    result(null, res);
  });
};

module.exports = Employee;