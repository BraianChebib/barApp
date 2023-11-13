const { Router } = require("express");

const {
    AdminHandler,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/****** RUTAS PUBLICAS SIN AUTENTICARSE ******/

//Registro de usuario
adminRouter.post("/product/:userId", AdminHandler);


module.exports = adminRouter;