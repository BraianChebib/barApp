const { Router } = require("express");

const {
  registerUserHandler,
  getAllProductsEnabledHandler,
} = require("../handlers/publicHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
publicRouter.get("/product", getAllProductsEnabledHandler)


module.exports = publicRouter;