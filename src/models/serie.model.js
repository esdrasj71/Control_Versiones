const sql = require("../conexion.js");

const Serie = function(series){
    this.Nombre = series.Nombre;
    this.Cantidad_inicial = series.Cantidad_inicial;
    this.Cantidad_limite = series.Cantidad_limite;
}
Serie.create = (newSeries, result) => {
    sql.query("INSERT INTO Serie SET ?", newSeries, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created serie: ", { id: res.insertId, ...newSeries });
      result(null, { id: res.insertId, ...newSeries});
    });
  };

  Serie.getAll = result => {
    sql.query("SELECT * FROM Serie", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Series: ", res);
      result(null, res);
    });
  };

  module.exports = Serie;