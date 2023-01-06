const product = require("../controllers/product.controller.js");

const controller = require("../controllers/user.controller");

app.get("/home", (req, res, next) => {
    try {
        
        return res.status(200).json({
            message: controller.allAccess
        });
    } catch(e) {
        return res.status(500).json({
            message: e.message
        })
    }
});