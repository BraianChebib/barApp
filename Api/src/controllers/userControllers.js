const { Users } = require("../db");

const upDateUser = async (id) => {
  try {
    // const user = await Users.findByPk(id);

    const user = await Users.findOne({
      where: {
        id: id,
      },
    });

    // if (!user) {
    //   return res.status(404).json({ error: "Usuario no encontrado" });
    // }
    return user;

  } catch (error) {
    console.error("Error al modificar datos del usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { upDateUser };
