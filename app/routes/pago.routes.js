const pago = require("../controllers/pago.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  // Get Pagos
  app.get(
    "/api/pago/:paymentStateFilter",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.findAll
  );

  app.get(
    "/api/pago-subscription/:subscriptionId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.pagoSubscription
  );

  app.post(
    "/api/pago",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.create
  );

  app.get(
    "/api/pago/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.findOne
  );

  app.put(
    "/api/pago/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.update
  );

  app.delete(
    "/api/pago/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.delete
  );
};
