const sql = require("../conexion");

const Procedure_Sales = function(Procedure_Sales){
    this.Subtotal = Procedure_Sales.Subtotal;
    this.Quantity = Procedure_Sales.Quantity;
    this.Price = Procedure_Sales.Price;
    this.Inventory_Id = Procedure_Sales.Inventory_Id;
};

Procedure_Sales.create = (newSales, result) => {
    sql.query("CALL venta(?,?,?,?);", 
    [newSales.Subtotal,newSales.Quantity,newSales.Price,newSales.Inventory_Id], (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Procedimiento almacenado ha sido registrado correctamente!: ", {...newSales});
        result(null, {...newSales});
    });
};


module.exports = Procedure_Sales;