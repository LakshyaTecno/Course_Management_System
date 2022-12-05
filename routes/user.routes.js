const userController = require('../controllers/user.controller')
const {authJwt, validateIdInParams, validateUserRequestBodies} = require('../middlewares')

module.exports = (app)=>{
    app.get("/cms/api/v1/users", [authJwt.verifyToken, authJwt.isSuperAdmin], userController.findAll)
    app.get("/cms/api/v1/users/:id", [authJwt.verifyToken, validateIdInParams.userInParams, authJwt.isSuperAdmin], userController.findByUserId)
    app.put("/cms/api/v1/users/:id", [authJwt.verifyToken, validateIdInParams.userInParams, authJwt.isSuperAdmin, validateUserRequestBodies.UserUpdateBody], userController.updateUser)
}