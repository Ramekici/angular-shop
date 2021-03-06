const mongoose = require('mongoose');

const productSchema =  mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    category:{ type:String, required:true },
    isim:{ type:String,required:true },
    marka:{ type:String, required:true },
    miktar:{ type:Number, required:true },
    fiyat:{ type:Number, required:true },
    aciklama:{ type:String, required:true },
    indirim:{ type:Number },
    renk:[],
    imagePath: { type:String },
    yorumlar:[{
      kullanıcı:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
      },
      name:{
        type:String
      },
      yorumBaslik:{
        type:String
      },
      yorumMetni:{
        type:String
      },
      puan:{
        type:Number
      },
      date:{
        type:Date,
        default: Date.now
      }
    }],
    date:{
      type:Date,
      default: Date.now
    }
})


module.exports = Products = mongoose.model('products', productSchema);
