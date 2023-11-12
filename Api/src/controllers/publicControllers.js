const {Users} = require("../db")

const createUsers = async (email,id, name, lastname) => {
    const [newUser, created] = await Users.findOrCreate({
      //busca por estos datos al usuario
      where: { email, id, name, lastname},
      //sino lo encuentra lo crea con los valores del defaults
      defaults: { email, id, name, lastname},
    });
    if (!created) {
      throw new Error("User already exists");
    }

    return newUser;
  };

  module.exports = {
    createUsers,

  };
  