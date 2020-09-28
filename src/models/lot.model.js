const sql = require("../conexion");
//constructor
const Lot = function(lot){
    this.Due_Date = lot.Due_Date;
    this.Product_Id = lot.Product_Id;
};
//Creacion de CRUD
    //CREATE
Lot.create = (newLot, result) => {
    sql.query("INSERT INTO lot SET ?", newLot, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("El lote ha sido registrado correctamente!: ", {id: res.insertId, ...newLot});
        result(null, {id: res.insertId, ...newLot});
    });
};
    //BUSCAR POR ID
Lot.findById = (lote_id, result) => {
    sql.query(`SELECT * FROM lot WHERE lot_id = ${lote_id}`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Lote: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado el Lote! " }, null);
    });
};
//BUSCAR TODO
Lot.getAll = result => {
    sql.query("SELECT * FROM lot", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Lote: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Lot.updateById = (id, lot, result) => {
    sql.query("UPDATE lot SET due_date = ?, product_id = ? WHERE lot_id = ?",
      [lot.Due_Date, lot.Product_Id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Por si no se encuentra
          result({ kind: "Lote no encontrado" }, null);
          return;
        }
  
        console.log("Lote Actualizado: ", { id: id, ...lot });
        result(null, { id: id, ...lot });
      }
    );
  };

module.exports = Lot;