const { getAllAdmins } = require("../controllers/adminControllers");

const AdminHandler = async (req, res) => {
     const { UserId } = req.params;
     console.log(UserId);
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
      const newProduct = await getAllAdmins(
      id,
      name,
      precio,
      descripcion,
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

module.exports = {
    AdminHandler
}
