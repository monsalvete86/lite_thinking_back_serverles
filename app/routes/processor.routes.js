const processor = require("../controllers/processor.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  // Get Products
  app.get(
    "/api/processors",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    processor.findAll
  );

  app.post(
    "/api/processors",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    processor.create
  );

  app.get(
    "/api/processors/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    processor.findOne
  );

  app.put(
    "/api/processors/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    processor.update
  );

  app.delete(
    "/api/processors/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    processor.delete
  );
};
