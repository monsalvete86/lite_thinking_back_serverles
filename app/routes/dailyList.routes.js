const { authJwt } = require("../middleware/index.js");
const dailyList = require("../controllers/dailyList.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  app.get(
    "api/daily-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.findAll
  );

  app.post(
    "api/daily-list",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    dailyList.create
  );
};
