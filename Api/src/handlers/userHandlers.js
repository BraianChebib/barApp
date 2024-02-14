const { upDateUser } = require("../controllers/userControllers");
const {favouriteUser} = require ("../controllers/userControllers");

const upDate = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, phone, image } = req.body;

  try {
    const property = await upDateUser(id);

    if (!property) {
      throw new Error("property not found");
    }
    if (name) {
      property.name = name;
    }
    if (lastname) {
      property.lastname = lastname;
    }
    if (email) {
      property.email = email;
    }
    if (phone) {
      property.phone = phone;
    }
    if (image) {
      property.image = image;
    }

    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const favUser = async (req, res) => {
  const { userId } = req.params;
  const {productId} = req.body
   console.log(userId);
  try {
   if (!userId) {
     throw new Error("User not found");
   }
   const favorito = await favouriteUser(userId, productId);
   if (!favorito) {

     throw new Error("erro not found");

   }

   res.status(200).json(favorito);
 } catch (error) {
   res.status(400).json({ error: error.message });
 }
};

module.exports = {
  upDate,
  favUser
};
