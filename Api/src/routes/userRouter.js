const { Router } = require("express");
const {
  getUserByIdHandler,
} = require("../handlers/userHandlers");

const userRouter = Router();

//Obtener informacion de otro usuario por su ID
userRouter.get("/info/:id", getUserByIdHandler);

module.exports = userRouter;