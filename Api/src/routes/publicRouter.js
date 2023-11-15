const { Router } = require("express");

const {
  registerUserHandler,
  getProduct
} = require("../handlers/publicHandlers");

const {upDate} = require ("../handlers/userHandlers")

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
publicRouter.put("/register/:id", upDate);
publicRouter.get("/:nombre", getProduct);


module.exports = publicRouter;