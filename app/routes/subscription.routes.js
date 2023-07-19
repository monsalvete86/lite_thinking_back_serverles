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

  app.get(
    "/api/subscriptions/daily-list/:dailyListId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.findAllByDailyList
  );

  app.get(
    "/api/subscriptions-pagos",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.findAllWithPayments
  );

  app.post(
    "/api/subscriptions/bulk-create",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    subscription.bulkCreate
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
