const listPayments = require("../controllers/listPayments.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  // Get ListPayments
  app.get(
    "/api/listPayments"   [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPayments.findAll
  );

  app.post(
    "/api/listPayments"   [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPayments.create
  );

  app.get(
    "/api/listPayments",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPayments.findOne
  );

  app.put(
    "/api/listPayments",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPayments.update
  );

  app.delete(
    "/api/listPayments",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    listPayments.delete
  );
};
