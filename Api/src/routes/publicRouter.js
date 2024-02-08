const { Router } = require("express");

const {
  registerUserHandler,
  getProductByNameHandler,
  getAllProductsEnabledHandler,
  upDateProducto,
} = require("../handlers/publicHandlers");

const {upDate, favUser} = require ("../handlers/userHandlers");

const publicRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
publicRouter.post("/register", registerUserHandler);
//Modificar datos del usuario
publicRouter.put("/upDateUser/:id", upDate);
//producto marcado como favorito por el usuario
publicRouter.post("/favourite/:userId", favUser);
//modificicacion del producto
publicRouter.put("/product/:id", upDateProducto);
//mostrar producto buscado por nombre
publicRouter.get("/product/:nombre", getProduct);
//mostrar todos los productos
publicRouter.get("/product", getAllProductsEnabledHandler);



module.exports = publicRouter;