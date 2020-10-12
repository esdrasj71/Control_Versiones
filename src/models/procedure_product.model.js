const sql = require("../conexion");

const Procedure_SaveProduct = function (Procedure_SaveProduct) {
    this.Name = Procedure_SaveProduct.Name;
    this.Correlative_Product = Procedure_SaveProduct.Correlative_Product;
    this.Perishable = Procedure_SaveProduct.Perishable;
    this.Brand_Id = Procedure_SaveProduct.Brand_Id;
    this.Product_Category_Id = Procedure_SaveProduct.Product_Category_Id;
    this.Statuss = Procedure_SaveProduct.Statuss;
    this.Due_Date = Procedure_SaveProduct.Due_Date;
};

Procedure_SaveProduct.create = (newSaveProduct, result) => {
    sql.query("CALL SaveProduct(?,?,?,?,?,?,?);",
        [newSaveProduct.Name, newSaveProduct.Correlative_Product, newSaveProduct.Perishable, newSaveProduct.Brand_Id, newSaveProduct.Product_Category_Id, newSaveProduct.Statuss, newSaveProduct.Due_Date], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Procedimiento almacenado ha sido registrado correctamente!: ", { ...newSaveProduct });
            result(null, { ...newSaveProduct });
        });
};


module.exports = Procedure_SaveProduct;