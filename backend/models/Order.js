const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiparislerSchema = new Schema({
        user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'users'
        },
        urunler:[{
          urun_id:{
            type:String
          },
          marka:{
            type: String,
          },
          renk: {
            type: String,
          },
          fiyat: {
            type: Number
          },
          miktar:{
            type: Number
          },
          toplam:{
            type:Number
          },
        }],
        adres:{
          tcNo:{
            type:Number,
            required:true
          },
          adresTanim:{
            type:String
          },
          acikAdres:{
            type:String
          },
          acikAdres2:{
            type:String
          },
          ilce:{
            type:String
          },
          il:{
            type:String
          },
          telefon:{
            type:Number
          },
        },
        krediKart:{
          adSoyad:{
            type:String
          },
          kartNumarası:{
            type:Number
          },
        },
        kargo:{
          firma:{
            type:String
          },
          ucret:{
            type:Number
          }
        },
        date:{
            type:Date,
            default: Date.now
        }

});

module.exports = Order = mongoose.model('siparisler', SiparislerSchema);
