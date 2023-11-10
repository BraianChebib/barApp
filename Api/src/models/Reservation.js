const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Reservation",
    {
      id: {
        type: DataTypes.INTEGER, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        primaryKey: true,
        autoIncrement: true,
      },
       cantclient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
       fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
         unique: true,
      },
    },
    { timestamps: false }
  );
};