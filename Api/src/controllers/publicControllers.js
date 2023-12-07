const { Users, Product } = require("../db");

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

const searchProductName = async (name) => {
  const databaseProduct = await Product.findOne({
    where: {
      name: name,
    },
  });

  return databaseProduct;
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

const upDateProduct = async (id) => {
  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    return product;
  } catch (error) {
    console.error("Error al modificar datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
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
  searchProductName,
  upDateProduct,
};
