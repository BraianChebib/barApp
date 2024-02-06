const { Router } = require("express");

const {
  registerUserHandler,
  getProductByNameHandler,
  getAllProductsEnabledHandler,
} = require("../handlers/publicHandlers");

const {upDate} = require ("../handlers/userHandlers")

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
publicRouter.put("/register/:id", upDate);
// publicRouter.get("/products", getProductByNameHandler);
publicRouter.get("/product", getAllProductsEnabledHandler)


module.exports = publicRouter;