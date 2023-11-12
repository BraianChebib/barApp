const { Users, Product } = require("../db");

const getAllAdmins = async (id, name, precio, descripcion, UserId) => {
  try {
    const admins = await Users.findAll({
      where: {
        role: "admin",
      },
    });

    const adminsWithProducts = await Promise.all(
      admins.map(async (admin) => {
        const [product, created] = await Product.findOrCreate({
          where: { id, name },
          defaults: {
            id, // clave: valor
            name,
            precio,
            descripcion,
            UserId
          },
        });

        return {
          admin,
          product,
          created,
        };
      })
    );

    return adminsWithProducts;
  } catch (error) {
    throw new Error("Error while getting admins");
  }
};

module.exports = {
    getAllAdmins
};

// // Middleware para verificar el rol de administrador
// const isAdmin = (req, res, next) => {
//     // Verifica si el usuario tiene el rol de administrador
//     if (req.user && req.user.role === 'admin') {
//       // Si es un administrador, permite que continúe con la siguiente middleware o ruta
//       next();
//     } else {
//       // Si no es un administrador, responde con un error de acceso no autorizado
//       res.status(403).json({ error: 'Acceso no autorizado' });
//     }
//   };

//   // Uso del middleware en un controlador específico
// app.post('/admin-route', isAdmin, (req, res) => {
//     // Este código solo se ejecutará si el usuario es un administrador
//     res.json({ message: 'Acceso permitido para administradores' });
//   });
