const sql = require("../conexion.js");
// constructor
const Company = function(company) {
  this.Company_Name = company.Company_Name;
  this.Address=company.Address;
  this.NIT=company.NIT;
};
//CRUD
Company.create = (newCompany, result) => {
    sql.query("INSERT INTO Company SET ?", newCompany, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created company: ", { id: res.insertId, ...newCompany });
      result(null, { id: res.insertId, ...newCompany });
    });
  };

  Company.getAll = result => {
    sql.query("SELECT * FROM Company", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Company: ", res);
      result(null, res);
    });
  };

  Company.updateById = (id, company, result) => {
    sql.query(
      "UPDATE Company SET Company_Name = ?, Address = ?, NIT = ? WHERE Company_Id = ?",
      [company.Company_Name, company.Address,company.NIT, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Provider with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated company: ", { id: id, ...company });
        result(null, { id: id, ...company });
      }
    );
  };
 
  module.exports = Company;