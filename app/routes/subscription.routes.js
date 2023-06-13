const subscription = require("../controllers/subscription.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  // Get Products
  app.get(
    "/api/subscriptions",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.findAll
  );

  app.post(
    "/api/subscriptions",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.create
  );

  app.get(
    "/api/subscriptions/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.findOne
  );

  app.put(
    "/api/subscriptions/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.update
  );

  app.delete(
    "/api/subscriptions/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.delete
  );
};
