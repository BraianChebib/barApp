const { Users, Product } = require("../db");
const { Op } = require("sequelize");

const createUsers = async (email, id, name, lastname, phone, role) => {
  const [newUser, created] = await Users.findOrCreate({
    //busca por estos datos al usuario
    where: { email, id, name, lastname, phone, role },
    //sino lo encuentra lo crea con los valores del defaults
    defaults: { email, id, name, lastname, phone, role },
  });
  if (!created) {
    throw new Error("User already exists");
  }

  return newUser;
};

const getProductsByName = async (name) => {
  try {
    const products = await Product.findAll({
      where: {

        name: { [Op.iLike]: "%" + name + "%" },
      },

    });
    if(products.length !== 0){
      return products
    }else{
      throw new Error("No se encontraron propiedad con este nombre")
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al realizar la busqueda")
  }
};
const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      where: {
        enabled: true,
      },
    });
    return products;
  } catch (error) {
    throw new Error("Error getting all products");
  }
};

// const favouriteUser = async (userId) => {
//   const favourite = await Favorite.Create({nombre, userId: userId});

//   return favourite;
// };

// const favouriteUser = async (userId) => {
//   try {
//     // const user = await Users.findByPk(id);

//     const user = await Users.findOne({
//       where: {
//         userId: userId,
//       },
//     });

//     return user;

//   } catch (error) {
//     console.error("Error al modificar datos del usuario:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };



module.exports = {
  createUsers,
  getAllProducts,
  getProductsByName,
};
