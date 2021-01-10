const jwt = require("jsonwebtoken");
const keys = require('../config/config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.userData = { email: decodedToken.email,
      userId: decodedToken.userId, name: decodedToken.name, surname: decodedToken.surname,
      phoneNumber: decodedToken.phoneNumber }
    next();
  } catch(error) {
      return res.status(401).json({
      message: "Üyeliğiniz kabul edilmedi..."
    })
  }

}
