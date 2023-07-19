const role = require("../controllers/role.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });

  // Get Roles
  app.get(
    "/api/roles",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    role.findAll
  );

  app.post(
    "/api/roles",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    role.create
  );

  app.get(
    "/api/roles/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    role.findOne
  );

  app.put(
    "/api/roles/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    role.update
  );

  app.delete(
    "/api/roles/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    role.delete
  );
};
