//Importar los controllers
const {
    createUsers,
  } = require("../controllers/publicControllers");

  const registerUserHandler = async (req, res) => {
    var { email, id, name, lastname } = req.body;
  
    try {
      if (!email ||!name || !lastname) {
        throw new Error("All fields are not complete");
      }
      const newUser = await createUsers(email, id, name, lastname);
      if (!newUser) {

        throw new Error("User not created");
        
      }
      // Si todo sale bien se crea al nuevo usuario
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    registerUserHandler,
  };