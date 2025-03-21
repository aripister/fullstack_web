const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;

const verify = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado. Debes iniciar sesión." });
  }
  try {
    const decodedToken = jwt.verify(token.replace("Bearer ", ""), secret_key);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).send("No autorizado");
  }
};

module.exports = { verify };