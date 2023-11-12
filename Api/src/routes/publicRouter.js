const { Router } = require("express");

const {
  registerUserHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);


module.exports = publicRouter;