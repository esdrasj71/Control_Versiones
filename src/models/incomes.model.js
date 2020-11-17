const sql = require("../conexion.js");
const Inventory = require("./inventory.model.js");
const Incomes = function(incomes) {
 this.Branch_Office1 = incomes.Branch_Office1;
 this.Branch_Office2 = incomes.Branch_Office2;
 this.Branch_Office3 = incomes.Branch_Office3;
 this.Income_Date = incomes.Income_Date;
 this.Total = incomes.Total;
};

Incomes.getingresos = result => {
    sql.query("CALL ingresos();", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Ingresos generado correctamente: : ", res);
      result(null, res);
    });
  };
Incomes.getALL = result=>{
  sql.query("SELECT Income_Id, Branch_Office1, Branch_Office2, Branch_Office3, MONTH(Income_Date) as Income_Date, Total FROM Incomes WHERE  YEAR(Income_Date) = YEAR(NOW());", (err,res)=>{
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Ingresos: ", res);
    result(null, res);
  });
};

Incomes.getEmpresa = result=>{
  sql.query("SELECT * FROM Company;", (err,res)=>{
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Empresa: ", res);
    result(null, res);
  });
};

Incomes.create = (newIngreso, result)=>{
  sql.query("INSERT INTO Incomes SET ? ", newIngreso, (err,res)=>{
    if(err){
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Ingresos creado: ", {id: res.insertId, ...newIngreso});
    result(null, {id: res.insertId, ...newIngreso});
  })
}
Incomes.updateById = (mes, ingreso, result) => {
  sql.query(
      "UPDATE Incomes SET Branch_Office1 = ?, Branch_Office2 = ?, Branch_Office3 = ?, Total = ? WHERE MONTH(Income_Date) = ?", [ingreso.Branch_Office1, ingreso.Branch_Office2, ingreso.Branch_Office3, ingreso.Total, mes],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
          }

          if (res.affectedRows == 0) {
              // not found Product with the id
              result({ kind: "no_encontrado" }, null);
              return;
          }

          console.log("Actualizar ingreso: ", { mes: mes, ...ingreso });
          result(null, { mes: mes, ...ingreso });
      }
  );
};
module.exports = Incomes;