const { Router } = require("express");

const {
    AdminHandler,
    getAllUsers
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
adminRouter.post("/product/:UserId", AdminHandler);
adminRouter.get("/getAllUsers", getAllUsers);


module.exports = adminRouter;