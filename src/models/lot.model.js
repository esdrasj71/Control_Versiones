const sql = require("../conexion");
//constructor
const Lot = function(lot){
    this.Due_Date = lot.Due_Date;
    this.Product_Id = lot.Product_Id;
};
//Creacion de CRUD
    //CREATE
Lot.create = (newLot, result) => {
    sql.query("INSERT INTO Lot SET ?", newLot, (err, res)=>{
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
    sql.query(`SELECT l.Lot_Id,p.Product_Id, p.Name as Product,concat(p.Name,', ',b.Name, ', ',pc.Name) as Complete, p.Correlative_Product, l.Due_Date FROM Lot as l inner join Product as p on l.Product_Id = p.Product_Id inner join Brand as b on b.Brand_Id = p.Product_Id inner join Product_Category as pc on pc.Product_Category_Id=p.Product_Id WHERE Lot_Id = ${lote_id}`, (err,res)=>{
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
    sql.query("SELECT l.Lot_Id, l.Product_Id, p.Name as Product, l.Due_Date, concat(p.Name, ', ' ,b.Name, ', ', pc.Name) as Complete FROM Lot as l inner join Product as p on l.Product_Id = p.Product_Id inner join Brand as b on p.Brand_Id = b.Brand_Id inner join Product_Category as pc on p.Product_Category_Id = pc.Product_Category_Id ORDER BY YEAR(l.Due_Date) DESC, MONTH(l.Due_Date) DESC, DAY(l.Due_Date) ASC, p.Name ASC", (err, res) => {
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
    sql.query("UPDATE Lot SET Due_Date = ?, Product_Id = ? WHERE Lot_Id = ?",
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