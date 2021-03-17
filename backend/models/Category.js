const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  category: { type: String, required: true, unique: true },
  date: {type: Date,default: Date.now}
})


module.exports = Products = mongoose.model('category', categorySchema);
