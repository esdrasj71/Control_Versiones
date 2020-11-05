const sql = require("../conexion.js");
const Estado_resultado = function(status_result) {
    this.fechainicio = status_result.fechainicio;
    this.fechafin = status_result.fechafin;
};
//Generete NoFactura Bill_Header
Estado_resultado.getEstadoResult = (newEstado, result) => {
    console.log(newEstado);

    sql.query("CALL estadoResultados(?,?);",
    [newEstado.fechainicio, newEstado.fechafin], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Estado resultados correctamente: ", { ...res });
        result(null, { ...res });
       
    });
};

module.exports = Estado_resultado;