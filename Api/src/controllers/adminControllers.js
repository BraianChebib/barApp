const { Users, Product } = require("../db");

const getAllAdmins = async ( name, precio, descripcion, type, image, UserId) => {
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
            where: { name, UserId: admin.id }, // Ajustar la condición de búsqueda
            defaults: {
              name,
              precio,
              descripcion,
              type,
              image
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

const getAllUs = async () => {
  try {
    const products = await Users.findAll();
    return products;
  } catch (error) {
    throw new Error("Error getting all products");
  }
};

const upDateProduct = async (id) => {
  try {
    // const user = await Users.findByPk(id);

    const Producto = await Product.findOne({
      where: {
        id: id,
      },
    });

    return Producto;
  } catch (error) {
    console.error("Error al modificar datos del producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

   const deleteUS = async (id)=>{
        const  userExist = Users.findByPk(id);

      if(!userExist){
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }else{
         return userExist;
      }
   }
 
module.exports = {
    getAllAdmins,
    getAllUs,
    upDateProduct,
    deleteUS
};
