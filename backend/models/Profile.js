const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users'
    },
    adres:[{
        ad:{
          type:String,
          required:true
        },
        soyad:{
          type:String,
          required:true
        },
        adresTanim:{
          type:String,
          required:true
        },
        tcNo:{
          type:String,
          required:true
        },
        acikAdres1:{
          type:String,
          required:true
        },
        acikAdres2:{
          type:String
        },
        ilce:{
          type:String,
          required:true
        },
        il:{
          type:String,
          required:true
        },
        telefon:{
          type:String,
          required:true
        },
        postaKodu:{
          type:String
        }
    }],
    cart:{
      products:[{
        productId:{
          type: String,
          required: true
        },
        fiyat:{
          type : Number,
          required : true
        },
        name:{
          type: String,
          required: true
        },
        image:{
          type: String,
          required: true
        },
        renk: {
          type: String
        },
        quantity:{
          type : Number,
          required : true
        }
      }]
    },
    krediKart:[{
        adSoyad:{
            type:String
        },
        kartNumarası:{
            type:Number
        },
        sonKullanmaTarihi:{
            type:String
        },
    }],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
