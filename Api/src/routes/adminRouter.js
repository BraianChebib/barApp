const { Router } = require("express");

const {
    AdminHandler,
    getAllUsers,
    udDateProduct,
    deleteUser
} = require("../handlers/adminHandlers");

const adminRouter = Router();

/**************** RUTAS PUBLICAS SIN AUTENTICARSE ****************/

//Registro de usuario
adminRouter.post("/product/:UserId", AdminHandler);
adminRouter.get("/getAllUsers", getAllUsers);
adminRouter.delete("/deleteUser/:id", deleteUser);
adminRouter.put("/upDateProduct/:id", udDateProduct);


module.exports = adminRouter;