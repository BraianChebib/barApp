const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.STRING, //UUID es para que genere un número random con letras/números y único, habilitado en sql
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //no permito que esté vacío
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
         unique: true,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      image: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "user",
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};