const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        primaryKey: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      review: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
