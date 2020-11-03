const sql = require("../conexion.js");
const Incomes = function(incomes) {
    
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
module.exports = Incomes;