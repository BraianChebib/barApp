const { Router } = require("express");

const {
    AdminHandler,
    getAllUsers,
    udDateProduct,
    deleteUser, 
    handlerDeleteProduct,
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
adminRouter.post("/product/:UserId", AdminHandler);
adminRouter.get("/getAllUsers", getAllUsers);
adminRouter.delete("/deleteUser/:id", deleteUser);
adminRouter.put("/updateProduct/:id", udDateProduct);
adminRouter.delete("/deleteProduct/:id", handlerDeleteProduct);


module.exports = adminRouter;