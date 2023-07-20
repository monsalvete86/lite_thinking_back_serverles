const pago = require("../controllers/pago.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  // Get Pagos
  app.get(
    "/api/pagos",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.findAll
  );

  app.get(
    "/api/pagos-subscription/:subscriptionId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.pagoSubscription
  );

  app.post(
    "/api/pagos",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.create
  );

  app.get(
    "/api/pagos/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.findOne
  );

  app.put(
    "/api/pagos/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.update
  );

  app.delete(
    "/api/pagos/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.delete
  );
};
