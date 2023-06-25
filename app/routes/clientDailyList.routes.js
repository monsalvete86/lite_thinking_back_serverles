const clientDailyList = require("../controllers/clientDailyList.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  app.get(
    "/api/client-daily-lists",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.findAll
  );

  app.get(
    "/api/client-daily-lists/list/:dailyListId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.findAllByDailyList
  );

  app.post(
    "/api/client-daily-lists",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.create
  ); 

  app.post(
    "/api/client-daily-lists/bulk-create",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.bulkCreate
  ); 

  app.put(
    "/api/client-daily-lists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.update
  );

  app.delete(
    "/api/client-daily-lists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.delete
  );

  app.get(
    "/api/client-daily-lists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.findOne
  );

  app.put(
    "/api/client-daily-lists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.update
  );

  app.delete(
    "/api/client-daily-lists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    clientDailyList.delete
  );
};
