require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { profileEnd } = require("console");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Favorite, Product, Reservation, Review, Table, Users } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Dog.belongsToMany(Temperament, { through: "dogs_temperaments" });
// Temperament.belongsToMany(Dog, { through: "dogs_temperaments" });
 Users.hasMany(Reservation);
 Reservation.belongsTo(Users);

 Users.hasMany(Product);
 Product.belongsTo(Users);

 Reservation.hasMany(Table);
 Table.belongsTo(Reservation);

 Users.hasMany(Review);
 Review.belongsTo(Users);

Users.hasMany(Favorite);
Favorite.belongsTo(Users);

Product.hasOne(Favorite);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op, // para importart la conexión { conn } = require('./db.js');
};