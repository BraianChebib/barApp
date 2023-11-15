//Importar los controllers
const {
    createUsers,
    getAllProducts,
  } = require("../controllers/publicControllers");

  const registerUserHandler = async (req, res) => {
    var { email, id, name, lastname, phone, role } = req.body;
  
    try {
      if (!email ||!name || !lastname) {
        throw new Error("All fields are not complete");
      }
      const newUser = await createUsers(email, id, name, lastname, phone, role);
      if (!newUser) {

        throw new Error("User not created");
        
      }
      // Si todo sale bien se crea al nuevo usuario
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getAllProductsEnabledHandler= async (req, res) => {
  try {
      const products = await getAllProducts();

      if (products.length === 0) {
        return res.status(404).json({ message: "There are not products" });
      }
      
      res.status(200).json(products);
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

  module.exports = {
    registerUserHandler,
    getAllProductsEnabledHandler
  };