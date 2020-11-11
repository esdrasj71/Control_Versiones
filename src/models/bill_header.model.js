const sql = require("../conexion.js");
const Serie = require("./serie.model.js");

// constructor
const Bill_Header = function(bill_header) {
    this.Correlative_Number = bill_header.Correlative_Number;
    this.Date = bill_header.Date;
    this.Total = bill_header.Total;
    this.Payment_Complete = bill_header.Payment_Complete;
    this.Customers_Id = bill_header.Customers_Id;
    this.Employee_Id = bill_header.Employee_Id;
    this.Serie_Id = bill_header.Serie_Id;
};
//Generete NoFactura Bill_Header
Bill_Header.getNoFactura = (Serie_Id, result) => {
    sql.query("SELECT Cantidad_inicial FROM serie WHERE Serie_Id = ?;",Serie_Id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Encabezado de factura: ", res);
        result(null, res);
    });
};


//CRUD
Bill_Header.create = (newBill, result) => {
    sql.query("UPDATE  serie SET Cantidad_inicial = Cantidad_inicial +1 WHERE Serie_Id = ?;" ,newBill.Serie_Id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            result;
        }
        console.log("Numero de factura actualizada: ", res);
        //result(null, res);

   
    sql.query("INSERT INTO bill_header SET ?", newBill, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Encabezado de factura creada: ", { id: res.insertId, ...newBill });
        result(null, { id: res.insertId, ...newBill });
    });

    })
};

Bill_Header.findById = (Bill_Header_Id, result) => {
    sql.query(`SELECT * FROM bill_header WHERE Bill_header_Id = ${Bill_Header_Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Encabezado de factura encontrada: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "Encabezado de factura no encontrada" }, null);
    });
};

Bill_Header.getAll = result => {
    sql.query("SELECT * FROM bill_header", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Encabezado de factura: ", res);
        result(null, res);
    });
};

Bill_Header.updateById = (id, bill_header, result) => {
    sql.query(
        "UPDATE bill_header SET Correlative_Number = ?, Payment_Complete = ?,Customers_Id = ?, Employee_Id = ? WHERE Bill_Header_Id = ?, Serie_Id = ?", [bill_header.Correlative_Number, bill_header.Date, bill_header.Total, bill_header.Payment_Complete, bill_header.Customers_Id, bill_header.Employee_Id, id,bill_header.Serie_Id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "Encabezado de factura no encontrada" }, null);
                return;
            }

            console.log("Encabezado de factura actualizada: ", { id: id, ...bill_header });
            result(null, { id: id, ...bill_header });
        }
    );
};

Bill_Header.remove = (id, result) => {
    sql.query("DELETE FROM bill_header WHERE Bill_header_Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "Encabezado de factura no encontrada" }, null);
            return;
        }

        console.log("Encabezado de factura eliminada con ID: ", id);
        result(null, res);
    });
};

module.exports = Bill_Header;