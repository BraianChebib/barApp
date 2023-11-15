const {Users, Product} = require("../db")

const createUsers = async (email,id, name, lastname, phone, role) => {
    const [newUser, created] = await Users.findOrCreate({
      //busca por estos datos al usuario
      where: { email, id, name, lastname, phone, role},
      //sino lo encuentra lo crea con los valores del defaults
      defaults: { email, id, name, lastname, phone, role},
    });
    if (!created) {
      throw new Error("User already exists");
    }

    return newUser;
  };
  const getAllProducts =async()=>{
    try {
      const products = await Product.findAll({
        where:{
          enabled: true,
        },
      })
      return products;
      
    } catch (error) {
      throw new Error("Error getting all products");
    }
  }

  module.exports = {
    createUsers,
    getAllProducts,
  };
  