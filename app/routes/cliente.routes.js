const cliente = require("../controllers/cliente.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  // Get Clientes
  app.get(
    "/api/clientes",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.findAll
  );

  app.post(
    "/api/clientes",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.create
  );

  // Get Clientes
  app.get(
    "/api/clientes-by",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.findAllByQuery
  );

  app.get(
    "/api/clientes/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.findOne
  );

  app.put(
    "/api/clientes/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.update
  );

  app.delete(
    "/api/clientes/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    cliente.delete
  );
};
