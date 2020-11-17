const sql = require("../conexion");
//constructor
const Purchase_Detail = function(purchase_detail){
    this.Quantity = purchase_detail.Quantity;
    this.Unit_Price = purchase_detail.Unit_Price;
    this.Subtotal = purchase_detail.Subtotal;
    this.Purchase_Header_Id = purchase_detail.Purchase_Header_Id;
    this.Inventory_Id = purchase_detail.Inventory_Id;
};
//Creacion de CRUD
    //CREATE
Purchase_Detail.create = (newPurchaseDetail, result) => {
    sql.query("INSERT INTO Purchase_Detail SET ?", newPurchaseDetail, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Detalle de compras ha sido registrado correctamente!: ", {id: res.insertId, ...newPurchaseDetail});
        result(null, {id: res.insertId, ...newPurchaseDetail});
    });
};
    //BUSCAR POR ID
Purchase_Detail.findById = (PurchaseDetailId, result) => {
    sql.query(`SELECT * FROM Purchase_Detail WHERE Purchase_Detail_Id = ${PurchaseDetailId}`, (err,res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }   

        if (res.length) {
            console.log("Detalle de Compras: ", res[0]);
            result(null, res[0]);
            return;
          }

          result({ kind: "No se ha encontrado! " }, null);
    });
};
//BUSCAR TODO
Purchase_Detail.getAll = result => {
    sql.query("SELECT * FROM Purchase_Detail", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Detalle de Compras: ", res);
      result(null, res);
    });
  };

//ACTUALIZA ID
Purchase_Detail.updateById = (id, purchaseDetail, result) => {
    sql.query("UPDATE Purchase_Detail SET Quantity = ?, Unit_Price = ?, Subtotal = ?, Purchase_Header_Id = ?, Inventory_Id = ?  WHERE Purchase_Detail_Id = ?",
      [purchaseDetail.Quantity, purchaseDetail.Unit_Price, purchaseDetail.Subtotal, purchaseDetail.Purchase_Header_Id , purchaseDetail.Inventory_Id, id],
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
  
        console.log("Encabezado Compras Actualizado: ", { id: id, ...purchaseDetail });
        result(null, { id: id, ...purchaseDetail });
      }
    );
  };

  Purchase_Detail.remove = (id, result) => {
    sql.query("DELETE FROM Purchase_Detail WHERE Purchase_Detail_Id = ?", id, (err, res) => {
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

module.exports = Purchase_Detail;