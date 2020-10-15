const sql = require("../conexion");
//constructor
const Purchase_Header = function(purchase_header){
    this.Correlative_Number = purchase_header.Correlative_Number;
    this.Serie = purchase_header.Serie;
    this.Date_Purchase = purchase_header.Date_Purchase;
    this.Total = purchase_header.Total;
    this.Refund = purchase_header.Refund; 
    this.Annulment_State = purchase_header.Annulment_State;
    this.Payment_Complete = purchase_header.Payment_Complete;
    this.Observations = purchase_header.Observations;
    this.Providers_Id = purchase_header.Providers_Id;
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
    sql.query(`SELECT * FROM purchase_header WHERE Purchase_Header_Id = ${PurchaseHeaderId}`, (err,res)=>{
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
    sql.query("UPDATE purchase_header SET Correlative_Number = ?, Serie = ? Date_Purchase = ?, Total = ?, Refund = ?, Annualment_State =?,Payment_Complete =?, Observations = ?, Providers_Id = ?  WHERE Purchase_Header_Id = ?",
      [purchaseHeader.Correlative_Number, purchaseHeader.Serie, purchaseHeader.Date_Purchase, purchaseHeader.Total, purchaseHeader.Refund, purchaseHeader.Annulment_State,purchaseHeader.Payment_Complete ,purchaseHeader.Observations, purchaseHeader.Providers_Id, id],
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
    sql.query("DELETE FROM purchase_header WHERE Purchase_Header_Id = ?", id, (err, res) => {
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