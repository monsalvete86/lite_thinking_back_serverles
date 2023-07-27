const pago = require("../controllers/pago.controller.js");
const listPaymentsController = require("../controllers/listPayments.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  // Get Pagos
  app.get(
    "/api/pago",
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
    "/cancel/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPaymentsController.cancelPayment
  );

  app.delete(
    "/api/pago/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    pago.delete
  );
};
