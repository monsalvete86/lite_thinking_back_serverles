const dailyList = require("../controllers/dailyList.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  app.get(
    "api/dailylists",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.findAll
  );

  app.post(
    "api/dailylists",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.create
  ); 

  app.put(
    "/api/dailylists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.update
  );

  app.delete(
    "/api/dailylists/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.delete
  );
};
