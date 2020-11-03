const sql = require("../conexion.js");

// constructor
const Expenditures = function (expenditures) {
    this.Date = expenditures.Date;
    this.Amount = expenditures.Amount;
    this.Bill_Type_Id = expenditures.Bill_Type_Id;
    this.No_Bill = expenditures.No_Bill;
    this.Cheque = expenditures.Cheque;
    this.No_Cheque = expenditures.No_Cheque;
    this.Expenses_Id = expenditures.Expenses_Id;
    this.Cost_Id = expenditures.Cost_Id;
    this.Bank_Id = expenditures.Bank_Id;
    this.Providers_Id = expenditures.Providers_Id;
};

//CRUD
Expenditures.create = (newExpenditures, result) => {
    sql.query("INSERT INTO expenditures SET ?", newExpenditures, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Egreso creado: ", { id: res.insertId, ...newExpenditures });
        result(null, { id: res.insertId, ...newExpenditures });
    });
};

Expenditures.findById = (expendituresId, result) => {
    sql.query(`SELECT a.Expenditures_Id, b.Expenses_Id, c.Cost_Id, d.Bill_Type_Id, e.Bank_Id, f.Providers_Id,
    a.Date, a.Amount, d.Name as Bill, a.No_Bill, a.Cheque, a.No_Cheque, b.Name as Expense, c.Name as Cost,
    e.Bank_Name as Bank, f.Fiscal_Name as FiscalName 
    FROM expenditures as a
    inner join Expenses as b on b.Expenses_Id = a.Expenses_Id 
    inner join Costs as c on c.Cost_Id = a.Cost_Id
    inner join Bill_Type as d on d.Bill_Type_Id = a.Bill_Type_Id
    inner join Bank as e on e.Bank_Id = a.Bank_Id
    inner join providers as f on f.Providers_Id = a.Providers_Id
    where a.Expenditures_Id = ${expendituresId}
    ORDER BY Date desc`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Egreso encontrado: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Expenditures with the id
        result({ kind: "Egreso no encontrado" }, null);
    });
};

Expenditures.getAll = result => {
    sql.query("SELECT a.Expenditures_Id, b.Expenses_Id, c.Cost_Id, d.Bill_Type_Id, e.Bank_Id, f.Providers_Id, a.Date, a.Amount, d.Name as Bill, a.No_Bill, a.Cheque, a.No_Cheque, b.Name as Expense, c.Name as Cost, e.Bank_Name as Bank, f.Fiscal_Name as FiscalName FROM expenditures as a inner join Expenses as b on b.Expenses_Id = a.Expenses_Id inner join Costs as c on c.Cost_Id = a.Cost_Id inner join Bill_Type as d on d.Bill_Type_Id = a.Bill_Type_Id inner join Bank as e on e.Bank_Id = a.Bank_Id inner join providers as f on f.Providers_Id = a.Providers_Id ORDER BY Date desc", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Egresos: ", res);
        result(null, res);
    });
};

Expenditures.updateById = (id, expenditures, result) => {
    sql.query(
        "UPDATE expenditures SET date = ?, amount = ?, bill_type_id = ?, no_bill = ?, cheque = ?, no_cheque = ?, expenses_id = ?, cost_id = ?, bank_id = ?, providers_id = ? WHERE expenditures_id = ?",
        [expenditures.Date, expenditures.Amount, expenditures.Bill_Type_Id, expenditures.No_Bill, expenditures.Cheque, expenditures.No_Cheque, expenditures.Expenses_Id, expenditures.Cost_Id, expenditures.Bank_Id, expenditures.Providers_Id, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Expenditures with the id
                result({ kind: "Egreso no encontrado" }, null);
                return;
            }

            console.log("Egreso actualizado: ", { id: id, ...expenditures });
            result(null, { id: id, ...expenditures });
        }
    );
};

Expenditures.remove = (id, result) => {
    sql.query("DELETE FROM expenditures WHERE expenditures_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Expenditures with the id
            result({ kind: "Egreso no encontrado" }, null);
            return;
        }

        console.log("Egreso eliminado con ID: ", id);
        result(null, res);
    });
};

module.exports = Expenditures;