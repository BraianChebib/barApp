const { Users, Product } = require("../db");


//Se obtendra al usuario buscando en la BDD por su ID
const getUserById = async (id) => {
  try {
    const user = await Users.findByPk(id);
    return user;
  } catch (error) {
    throw new Error("Error getting user by id");
  }
};

const upDateUser = async (id) => {
  try {
    // const user = await Users.findByPk(id);

    const user = await Users.findOne({
      where: {
        id: id,
      },
    });

    return user;
  } catch (error) {
    console.error("Error al modificar datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const favouriteUser = async (userId, productId) => {
  // const favProduct = 2;
  // const usuario = "primero";
  const producto = await Product.findByPk(productId);
  const usuario = await Users.findByPk(userId);
 console.log(producto);
  if (!producto) {
    return "producto not found";
  }

  if (!usuario) {
    return "user not found";
  }

  // if (!usuario.favorite.include(favProduct)) {
  //   return "product include";
  // }

  const result = await usuario.update({
    favorite: [...usuario.favorite, productId],
  });

  return result;
};

module.exports = { upDateUser, favouriteUser, getUserById};
