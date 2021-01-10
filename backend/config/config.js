
module.exports = {
  mongoURI: "mongodb+srv://ramazan:" + process.env.MONGO_ATLAS_PW + "@cluster0-rspay.mongodb.net/angular",
  secretOrKey: process.env.JWT_KEY
}
