const sql = require("../conexion");
//constructor
const Employee_Position = function(employee_position){
    this.Name = employee_position.Name;
    this.Description = employee_position.Description;
};
//Creacion de CRUD
    //CREATE
Employee_Position.create = (newPosition, result) => {
    sql.query("INSERT INTO Employee_Position SET ?", newPosition, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("El posicion del empleado ha sido registrado correctamente!: ", {id: res.insertId, ...newPosition});
        result(null, {id: res.insertId, ...newPosition});
    });
};
    //BUSCAR POR ID
Employee_Position.findById = (employee_position_id, result) => {
    sql.query(`SELECT * FROM Employee_Position WHERE Employee_Position_Id = ${employee_position_id}`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Posicion Empleado: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado el Posicion del Empleado! " }, null);
    });
};
//BUSCAR TODO
Employee_Position.getAll = result => {
    sql.query("SELECT * FROM Employee_Position ORDER BY Name ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Posicion Empleado: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Employee_Position.updateById = (id, position, result) => {
    sql.query("UPDATE Employee_Position SET Name = ?, Description = ? WHERE Employee_Position_Id = ?",
      [position.Name, position.Description, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Por si no se encuentra
          result({ kind: "Posicion empleado no encontrado" }, null);
          return;
        }
  
        console.log("Posicion Empleado Actualizado: ", { id: id, ...position });
        result(null, { id: id, ...position });
      }
    );
  };

  Employee_Position.remove = (id, result) => {
    sql.query("DELETE FROM Employee_Position WHERE Employee_Position_Id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Brand with the id
        result({ kind: "Posicion empleado no_encontrado" }, null);
        return;
      }
  
      console.log("Posicion empleado eliminado con ID: ", id);
      result(null, res);
    });
  };

module.exports = Employee_Position;