const { createProduct } = require("../controllers/adminControllers");

const AdminHandler = async (req, res) => {
    const { userId } = req.params;
    const {
      id,
      name,
      precio,
      descripcion
    } = req.body;
    try {
      if (
        !id ||
        !name ||
        !precio ||
        !descripcion
      ) {
        throw Error("All fields are not complete");
      }
      const newProduct = await createProduct(
      id,
      name,
      precio,
      descripcion,
      userId
      );
      if (!newProduct) {
        throw Error("Product is not created");
      }
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    AdminHandler
}