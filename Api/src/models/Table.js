const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Table",
    {
      id: {
        type: DataTypes.INTEGER, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        primaryKey: true,
        autoIncrement: true,
      },
      ability: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
