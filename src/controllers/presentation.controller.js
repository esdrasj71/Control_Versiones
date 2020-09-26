const Presentation = require("../models/presentation.model.js")
//SAVE
exports.create = (req, res) => {
  //Validate the request
  if (!req.body) {
    res.status(400).send({
      message: "VIENE VACIO"
    });
  }
  // Create brand
  const presentation = new Presentation({
    Name: req.body.Name
  });

  // Save brand
  Presentation.create(presentation, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error!"
      });
    else res.send(data);
  });
};
//GET ALL
exports.findAll = (req, res) => {
    //Get all brand data
    Presentation.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ha ocurrido un error!"
        });
      else res.send(data);
    });
  };
//GET ONE
  exports.findOne = (req, res) => {
    //We obtain the brand with its id
    Presentation.findById(req.params.Presentation_Id, (err, data) => {
      if (err) {
        if (err.kind === "we have not found the brand") {
          res.status(404).send({
            message: `Presentacion con ID no encontrado ${req.params.Presentation_Id}.`
          });
        } else {
          res.status(500).send({
            message: "Presentacion con ID no encontrado " + req.params.Presentation_Id
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
        message: "El contenido no puede ir vacio!"
      });
    }
    //update brand with your id
    Presentation.updateById(
      req.params.Presentation_Id,
      new Presentation(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "We can't find the brand to update") {
            res.status(404).send({
              message: `Presentacion no encontrado ${req.params.Presentation_Id}.`
            });
          } else {
            res.status(500).send({
              message: "Actualizando presentacion con el ID " + req.params.Presentation_Id
            });
          }
        } else res.send(data);
      }
    );
  };
//DELETE
  exports.delete = (req, res) => {
    Presentation.remove(req.params.Presentation_Id, (err, data) => {
      if (err) {
        if (err.kind === "The brand you want to remove was not found") {
          res.status(404).send({
            message: `Presentacion con ID no se pudo encontrar ${req.params.Presentation_Id}.`
          });
        } else {
          res.status(500).send({
            message: "No se puedo eliminar presentacion con ID " + req.params.Presentation_Id
          });
        }
      } else res.send({ message: `Presentacion eliminado exitosmente!` });
    });
  };