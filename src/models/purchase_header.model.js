const sql = require("../conexion");
//constructor
const Purchase_Header = function(purchase_header){
    this.date = purchase_header.date;
    this.correlative_number = purchase_header.correlative_number;
    this.total = purchase_header.total;
    this.refund = purchase_header.refund;
    this.observations = purchase_header.observations;
    this.id_providers = purchase_header.id_providers;
};
//Creacion de CRUD
    //CREATE
Purchase_Header.create = (newPurchaseHeader, result) => {
    sql.query("INSERT INTO purchase_header SET ?", newPurchaseHeader, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Encabezado de Compras ha sido registrado correctamente!: ", {id: res.insertId, ...newPurchaseHeader});
        result(null, {id: res.insertId, ...newPurchaseHeader});
    });
};
    //BUSCAR POR ID
Purchase_Header.findById = (PurchaseHeaderId, result) => {
    sql.query('SELECT * FROM purchase_header WHERE id = ${PurchaseHeaderId}', (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Encabezado Compras: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado! " }, null);
    });
};
//BUSCAR TODO
Purchase_Header.getAll = result => {
    sql.query("SELECT * FROM purchase_header", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Encabezado Compras: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Purchase_Header.updateById = (id, purchaseHeader, result) => {
    sql.query("UPDATE purchase_header SET date = ?, correlative_number = ?, total = ?, refund = ?, observations = ?, id_providers = ?  WHERE id = ?",
      [purchaseHeader.date, purchaseHeader.correlative_number, purchaseHeader.total, purchaseHeader.refund, purchaseHeader.observations, purchaseHeader.id_providers, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // Por si no se encuentra
          result({ kind: "No encontrado" }, null);
          return;
        }
  
        console.log("Encabezado Compras Actualizado: ", { id: id, ...purchaseHeader });
        result(null, { id: id, ...purchaseHeader });
      }
    );
  };

  Purchase_Header.remove = (id, result) => {
    sql.query("DELETE FROM purchase_header WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "No encontrado" }, null);
        return;
      }
  
      console.log("Encabezado Compras: ", id, " ha sido eliminado");
      result(null, res);
    });
  };

module.exports = Purchase_Header;