const product = require("../controllers/product.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get Products
  app.get(
    "/api/products",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    product.findAll
  );

  app.post(
    "/api/products",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    product.create
  );

  app.get(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    product.findOne
  );

  app.put(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    product.update
  );

  app.delete(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    product.delete
  );

};
