const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      precio: {
        type: DataTypes.INTEGER,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Bebidas", "Platos", "Postres"),
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
       totalprice: {
        type: DataTypes.INTEGER,
       }
    },
    { timestamps: false }
  );
};
