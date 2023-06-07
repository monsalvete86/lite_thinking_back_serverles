const category = require("../controllers/category.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers"
    );
    next();
  });

  // Get Categories
  app.get(
    "/api/categories",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    category.findAll
  );

  app.post(
    "/api/categories",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    category.create
  );

  app.get(
    "/api/categories/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    category.findOne
  );

  app.put(
    "/api/categories/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    category.update
  );

  app.delete(
    "/api/categories/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    category.delete
  );

};
