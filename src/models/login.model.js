const sql = require("../conexion.js");
const bcrypt = require("bcryptjs");

// constructor
const Login = function (log) {
  this.Username = log.Username;
  this.Password = log.Password;
  this.Token = log.Token;
  this.Usertype=log.Usertype;
  this.Employee_Id=log.Employee_Id;
};

Login.create = async (newLog, result) => {
  try {
    if (!newLog.Username || !newLog.Password) {
      return result({ message: "Porfavor introduzca su usuario y contraseña" });
    }
    sql.query(
      "SELECT * from User WHERE Username = ?",
      [newLog.Username],
      async (err, res) => {
        //console.log(res.length);
        if(res.length==0){
          return result(null,{ message: "El usuario o contraseña son incorrectos" });
         }
        if (!res || !(await bcrypt.compare(newLog.Password, res[0].Password))) {
          return result(null, {
            message: "El usuario o contraseña son incorrectos",
          });
        }
        else {
          result(null,res[0]);
        }
      },(error)=>{
         result(error,error);  
      }
    );
  } catch (err) {
    result(null, err);
  }

  /*let newpassword= await bcrypt.hash(newUser.Password, 8);
    newUser.Password=newpassword;
    console.log(newpassword);
    sql.query("INSERT INTO User SET ?", {Username:newUser.Username, Password:newpassword, Date_Created:newUser.Date_Created, Usertype:newUser.Usertype,Employee_Id:newUser.Employee_Id}, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Usuario creado: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });*/
};

module.exports = Login;
