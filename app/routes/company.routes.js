const company = require("../controllers/company.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get company
  app.get(
    "/api/company",
    //[authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    company.findAll
  );

  app.post(
    "/api/company",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    company.create
  );

  app.get(
    "/api/company/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    company.findOne
  );

  app.put(
    "/api/company/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    company.update
  );

  app.delete(
    "/api/company/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    company.delete
  );

};
