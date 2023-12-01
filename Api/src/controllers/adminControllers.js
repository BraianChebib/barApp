const { Users, Product } = require("../db");

const getAllAdmins = async (id, name, precio, descripcion, type, image, UserId) => {
  try {
    // Obtener todos los administradores
    const admins = await Users.findAll({
      where: {
        role: "admin",
      },
    });

    // Crear productos para cada administrador
    const adminsWithProducts = await Promise.all(
      admins.map(async (admin) => {
        try {
          // Buscar o crear el producto para el administrador actual
          const [product, created] = await Product.findOrCreate({
            where: { id, name, UserId: admin.id }, // Ajustar la condición de búsqueda
            defaults: {
              id,
              name,
              precio,
              descripcion,
              type,
              image,
              UserId: admin.id,
            },
          });

          // Devolver información sobre el administrador y el producto
          return {
            admin,
            product,
            created,
          };
        } catch (productError) {
          console.error("Error while creating product:", productError);
          throw new Error("Error while creating product for admin");
        }
      })
    );

    return adminsWithProducts;
  } catch (adminError) {
    console.error("Error while getting admins:", adminError);
    throw new Error("Error while getting admins");
  }
};

module.exports = {
    getAllAdmins
};
