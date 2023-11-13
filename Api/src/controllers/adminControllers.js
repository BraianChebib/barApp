const {Users, Product} = require ("../db")

const createProduct = async (id, name, precio, descripcion) => {
    try {
      const admins = await Users.findByPk({
        where: {
          role: "admin",
        },
      });
  
      const adminsWithProducts = await Promise.all(
        admins.map(async (admin) => {
          const product = await Product.findOrCreate({
            where: { id, name },
            defaults: {
              id, // clave: valor
              name,
              precio,
              descripcion,
              UserId: userId
            },
          });
  
          return {
            admin,
            product,
          };
        })
      );
  
      return adminsWithProducts;
    } catch (error) {
      throw new Error("Error while getting admins");
    }
  };
  
  module.exports = {
    createProduct
  };
  