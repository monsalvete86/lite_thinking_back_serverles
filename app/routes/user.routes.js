const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Content-Type', 'application/json')
    next();
  });
  
  


  app.get("/api/test/all", controller.allAccess);
  
  
  app.post(
    "/api/user/update_company",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.updateCompany
  );
  
  app.get(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.findOne
  );

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
