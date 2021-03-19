const mongoose = require('mongoose');

const markaSchema = mongoose.Schema({
  marka: { type: String, required: true, unique: true },
  date: {type: Date,default: Date.now}
})


module.exports = Products = mongoose.model('marka', markaSchema);
