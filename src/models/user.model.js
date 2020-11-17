const sql = require("../conexion.js");
const bcrypt = require("bcryptjs");
// constructor
const User = function(user) {
  this.Username = user.Username;
  this.Password= user.Password;
  this.Date_Created=user.Date_Created;
  this.Usertype	=user.Usertype;
  this.Employee_Id=user.Employee_Id;
};
//CRUD

User.create = async (newUser, result) => {
    newUser.Password= await bcrypt.hash(newUser.Password, 8);
    //console.log(newpassword);
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Usuario creado: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM User WHERE User_id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Usuario encontrado: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Provider with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.getAll = result => {
    sql.query("SELECT a.Date_Created,a.User_Id,a.Username,a.Password, CASE a.Usertype WHEN 1 then 'Administrador' WHEN 0 then 'Usuario Normal' END as Tipo, concat(p.Names, ', ' ,p.Last_names) as Nombre FROM User as a INNER JOIN Employee as p on a.Employee_Id=p.Employee_Id ORDER BY a.Date_Created DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Usuario: ", res);
      result(null, res);
    });
  };

  User.updateById = async (id, user, result) => {
    user.Password= await bcrypt.hash(user.Password, 8);
    sql.query(
      "UPDATE User SET Username = ?, Password = ? WHERE User_Id = ?",
      [user.Username, user.Password, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Provider with the id
          result({ kind: "no encontrado" }, null);
          return;
        }
  
        console.log("actualizando usuario: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };

  User.remove = (id, result) => {
    sql.query("DELETE FROM User WHERE User_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // No se encontro el proveedor a eliminar
        result({ kind: "no encontrado: " }, null);
        return;
      }
  
      console.log("Usuario eliminado: ", id);
      result(null, res);
    });
  };
  module.exports = User;