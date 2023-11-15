const { Users, Product } = require("../db");

const getAllAdmins = async (id, name, precio, descripcion, UserId) => {
  try {
    const admins = await Users.findAll({
      where: {
        role: "admin",
      },
    });

    const adminsWithProducts = await Promise.all(
      admins.map(async (admin) => {
        const [product, created] = await Product.findOrCreate({
          where: { id, name },
          defaults: {
            id, // clave: valor
            name,
            precio,
            descripcion,
            UserId
          },
        });

        return {
          admin,
          product,
          created,
        };
      })
    );

    return adminsWithProducts;
  } catch (error) {
    throw new Error("Error while getting admins");
  }
};

module.exports = {
    getAllAdmins
};
