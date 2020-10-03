const Brand = require("../models/brand.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "Campos vacios"
    });
  }
  // Create brand
  const brand = new Brand({ 
    Name: req.body.Name
  });

  // Save brand
  Brand.create(brand, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrio un error"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all brand data
    Brand.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocurrio un error"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Brand.findById(req.params.brandId, (err, data) => {
      if (err) {
        if (err.kind === "No se ha encontrado la marca") {
          res.status(404).send({
            message: `Marca con ID no encontrada ${req.params.brandId}.`
          });
        } else {
          res.status(500).send({
            message: "Marca con ID encontrada" + req.params.brandId
          });
        }
      } else res.send(data);
    });
  };
//UPDATE
  exports.update = (req, res) => {
    // Validating request
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede ir vacio"
      });
    }
    //update brand with your id
    Brand.updateById(
      req.params.brandId,
      new Brand(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "No se ha encontrado la marca a actualizar") {
            res.status(404).send({
              message: `Marca con ID no encontrada ${req.params.brandId}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando marca con ID " + req.params.brandId
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Brand.remove(req.params.brandId, (err, data) => {
      if (err) {
        if (err.kind === "La marca a eliminar no ha sido encontrada") {
          res.status(404).send({
            message: `Marca con ID no encontrada ${req.params.brandId}.`
          });
        } else {
          res.status(500).send({
            message: "No se puede eliminar marca con ID " + req.params.brandId
          });
        }
      } else res.send({ message: `Marca eliminada exitosamente` });
    });
  };