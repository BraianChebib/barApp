const { getAllAdmins, getAllUs, upDateProduct, deleteUS, deleteProduct } = require("../controllers/adminControllers");

const AdminHandler = async (req, res) => {
     const { UserId } = req.params;
    const {
      name,
      precio,
      descripcion,
      type,
      image

    } = req.body;
    try {
      if (
        !name ||
        !precio ||
        !descripcion||
        !type||
        !image
      ) {
        throw Error("All fields are not complete");
      }
      const newProduct = await getAllAdmins(
      name,
      precio,
      descripcion,
      type,
      image,
      UserId
      );
      if (!newProduct) {
        throw Error("Product is not created");
      }
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getAllUsers= async (req, res) => {
    try {
        const user = await getAllUs();

        if (user.length === 0) {
          return res.status(404).json({ message: "There are not products" });
        }

        res.status(200).json(user);
      // }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const udDateProduct= async (req,res) => {
    const { id } = req.params;
    const {
      name,
      precio,
      descripcion,
      type,
      image

    } = req.body;
  
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
      if (type) {
        property.type = type;
      }
      if (image) {
        property.image = image;
      }
  
      await property.save();
      res.status(200).json(property);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const deleteUser = async (req, res)=>{
    const { UserId } = req.params;

    try {
      const deleteUser = await deleteUS(UserId);
      await deleteUser.update({ enabled: false });
      res.status(200).json(deleteUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const handlerDeleteProduct = async (req, res)=>{
    const { id } = req.params;

  try {
    await deleteProduct(id);
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  } 

module.exports = {
    AdminHandler,
    getAllUsers,
    udDateProduct,
    deleteUser,
    handlerDeleteProduct
}
