const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');
const checkAuth = require('../../middleware/check-auth');


const validateUrunlerInput = require('../../validation/Urunler');
//const validateAdresInput = require('../../validation/Adres');
//const validateKrediKartInput = require('../../validation/KrediKart');

// tum ürünleri almak için
router.get('/',(req,res)=>{
    Order.find()
    .sort({date:-1})
    .then(siparis=> res.json(siparis))
    .catch(err=> res.status(404));
});

router.get('/:user_id',(req,res)=>{
    Order.find({user:req.params.user_id})
    .sort({date:-1})
    .then(siparis=> res.json(siparis))
    .catch(err=> res.status(404));
});
//id sine göre urunleri alma
router.get('/:siparis_id',(req,res)=>{
    Order.findById(req.params.siparis_id)
    .then(siparis=> res.json(siparis))
    .catch(err=> res.status(404).json({msg:"Siparis bulunamadı"}));
});

// urun bilgilerini gönderen api
router.post('/', checkAuth, (req, res, next)=>{
    //const {errors, isValid} = validateUrunlerInput(req.body);
    //if(!isValid){
    //    return res.status(400).json(errors);
    //}
    const newOrder = new Order({
        user:req.userData.userId,
        adres: {
          tcNo:req.body.tcNo,
          adresTanim:req.body.adresTanim,
          acikAdres:req.body.acikAdres,
          acikAdres2:req.body.acikAdres2,
          ilce:req.body.ilce,
          il:req.body.il,
          telefon:req.body.telefon
        },
        krediKart: {
          adSoyad:req.body.adSoyad,
          kartNumarasi:req.body.kartNumarasi,
        },
        kargo: {
          firma: req.body.firma,
          ucret: req.body.ucret
        }
    });
    req.body.urunlerim.map(urun => {
        return newOrder.urunler.unshift({
            urun_id: urun.urun_id,
            marka: urun.marka,
            miktar: urun.miktar,
            renk: urun.renk,
            fiyat: urun.fiyat,
            toplam: urun.toplam
        })
    });
    newOrder.save()
    .then(order => res.status(201).json({order:order, message: "başarılı"}))
    .catch(err => res.status(401).json({message: "sipariş hatalı"})
    );
});



module.exports= router;
