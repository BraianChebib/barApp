//Importar los controllers
const {
    createUsers,
    searchProductName,
    getAllProducts,
    upDateProduct,
    favouriteUser
  } = require("../controllers/publicControllers");

  const {Favorite} = require ("../db");

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


  const getProduct =async (req, res)=>{
    const nombreProducto = req.params.nombre;
     console.log(nombreProducto);
     const result = await searchProductName(nombreProducto);

     res.status(200).send(result);
  }


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


const upDateProducto = async (req, res) => {
  const { id } = req.params;
  const { name, precio, descripcion, image, enabled, type } = req.body;

  try {
    const property = await upDateProduct(id);

    if (!property) {
      throw new Error("property not found");
    }
    if (name) {
      property.name = name;
    }
    if (precio) {
      property.precio = precio;
    }
    if (descripcion) {
      property.descripcion = descripcion;
    }
    if (image) {
      property.image = image;
    }
    if (enabled) {
      property.enabled = enabled;
    }
    if (type) {
      property.type = type;
    }

    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



  module.exports = {
    registerUserHandler,
    getAllProductsEnabledHandler,
    getProduct,
    upDateProducto,
  };