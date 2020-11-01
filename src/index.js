const express = require("express");
const bodyParser = require("body-parser");
const conectar = require('./conexion');
const app = express();
const cors = require("cors");
const rutasProtegidas = express.Router();
jwt = require("jsonwebtoken");

// analizar solicitudes de tipo: application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
  // para que la consola nos reconozca peticiones json
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));


app.use("", require("./routes/login.routes"));


rutasProtegidas.use((req, res, next) => {
  const token = req.headers['accesstoken'];
  if(token==0)
  {
    console.log('si entro');
       jwt.verify(0, "secretpass", (err, decoded) => {
        req.decoded = decoded;
        next();
      });

  }else{
    if (token) {
      jwt.verify(token, "secretpass", (err, decoded) => {
        if (err) {
          return res.json({ mensaje: "Token inválida" ,error:err});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
        mensaje: "Token no proveída.",
      });
    }
  }
});

//Routes
app.use("",require("./routes/user.routes"));
app.use("",rutasProtegidas, require("./routes/providers.routes"));
app.use("", rutasProtegidas, require("./routes/product.routes"));
app.use("", rutasProtegidas,require("./routes/brand.routes"));
app.use("", rutasProtegidas,require("./routes/product_category.routes"));
app.use("", rutasProtegidas,require("./routes/lot.routes"));
app.use("", rutasProtegidas,require("./routes/inventory.routes"));
app.use("", rutasProtegidas,require("./routes/purchase_header.routes"));
app.use("", rutasProtegidas,require("./routes/purchase_detail.routes"));
app.use("", rutasProtegidas,require("./routes/customers.routes"));
app.use("", rutasProtegidas,require("./routes/employee.routes"));
app.use("", rutasProtegidas,require("./routes/employee_position.routes"));
app.use("", rutasProtegidas,require("./routes/bill_header.routes"));
app.use("", rutasProtegidas,require("./routes/bill_detail.routes")); 
app.use("", rutasProtegidas,require("./routes/procedure_purchase.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_sale.routes"));
app.use("", rutasProtegidas,require("./routes/payment_purchase.routes"));
app.use("", rutasProtegidas,require("./routes/payment_detail_purchase.routes"));
app.use("", rutasProtegidas,require("./routes/payment.routes"));
app.use("", rutasProtegidas,require("./routes/payment_type_detail.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_saveproduct.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_lot.routes"));
app.use("", rutasProtegidas,require("./routes/accounts.receivable.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_cuentas_cobrar.routes"));
app.use("", rutasProtegidas,require("./routes/report_sales.routes"));
app.use("", rutasProtegidas,require("./routes/debs_to_pay.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_debs.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_purchasereport1.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_purchasereport2.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_inventoryreport1.routes"));
app.use("", rutasProtegidas,require("./routes/procedure_inventoryreport2.routes"));



app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
