const sql = require("../conexion");
//constructor
const Presentation = function(presentation){
    this.Name = presentation.Name;
};
//Creacion de CRUD
    //CREATE
Presentation.create = (newPresentation, result) => {
    sql.query("INSERT INTO presentation SET ?", newPresentation, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("La presentacion ha sido registrado correctamente!: ", {id: res.insertId, ...newPresentation});
        result(null, {id: res.insertId, ...newPresentation});
    });
};
    //BUSCAR POR ID
Presentation.findById = (PresentationId, result) => {
    sql.query(`SELECT * FROM presentation WHERE Presentation_Id = ${PresentationId}`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Presentacion: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado la presentacion! " }, null);
    });
};
//BUSCAR TODO
Presentation.getAll = result => {
    sql.query("SELECT * FROM presentation", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Presentacion: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Presentation.updateById = (id, presentation, result) => {
    sql.query("UPDATE presentation SET Name = ? WHERE Presentation_Id = ?",
      [presentation.Name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Por si no se encuentra
          result({ kind: "Presentacion no encontrado" }, null);
          return;
        }
  
        console.log("Presentacion Actualizado: ", { id: id, ...presentation });
        result(null, { id: id, ...presentation });
      }
    );
  };

  Presentation.remove = (id, result) => {
    sql.query("DELETE FROM presentation WHERE Presentation_Id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "Presentacion no encontrado" }, null);
        return;
      }
  
      console.log("Presentacion: ", id, " ha sido eliminado");
      result(null, res);
    });
  };

module.exports = Presentation;