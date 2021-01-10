const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');

const validateProfilesInput = require('../../validation/Profiles');
const validateAdresInput = require('../../validation/Adres');
const validateKrediKartInput = require('../../validation/KrediKart');


router.get('/', checkAuth, (req,res)=>{
    const errors={};
    Profile.findOne({user:req.user.id})
        .populate('user',['name','avatar'])
        .then(profile=>{
            if(!profile){
                errors.noprofile ="Bu sitede bu isimle herhangi bir kullanıcı bulunamadı";
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err=>res.status(404).json(err));
})

// kullanıcı id'sine göre kullanıcı bilgilerini getiren api

router.get('/user/:user_id', (req,res)=>{
    const errors={};
    Profile.findOne({user:req.params.user_id})
    .populate('user',['name','avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile ="Bu sitede bu isimle herhangi bir kullanıcı bulunamadı";
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err=>res.status(404).json({profile:"Bu idye sahip kullanıcı bulunmadı"}));

})


// Adres bilgilerini kaydeden api

router.post('/adres', checkAuth, (req,res, next)=>{

    //const {errors, isValid} = validateAdresInput(req.body);

    //if(!isValid){
    //    return res.status(400).json(errors);
   // }

    Profile.findOne({user:req.userData.userId})
        .then(profile => {
            const newAdres = {
                ad:req.body.ad,
                soyad:req.body.soyad,
                tcNo:req.body.tcNo,
                adresTanim: req.body.adresTanim,
                acikAdres1:req.body.acikAdres1,
                acikAdres2:req.body.acikAdres2,
                ilce:req.body.ilce,
                il:req.body.il,
                telefon:req.body.telefon,
                postaKodu:req.body.postaKodu
            }
            profile.adres.unshift(newAdres);
            profile.save().then(profile => res.status(201).json({
              profile: profile,
              message:"adres Created"}));
        }
)})

// Kredi kart bilgilerini kaydeden api
router.post('/kredikart', checkAuth, (req, res, next)=>{
    const {errors, isValid} = validateKrediKartInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    Profile.findOne({user:req.userData.userId})
        .then(profile=>{
            const newKrediKart = {
                adSoyad:req.body.adSoyad,
                kartNumarası:req.body.kartNumarası,
                sonKullanmaTarihi:req.body.sonKullanmaTarihi,
            }
            profile.krediKart.unshift(newKrediKart);
            profile.save().then(profile=> res.json(profile));

        }

)})

// Adres bilgileri silen api
// token bilgisi

router.delete('/adres/:adr_id', checkAuth, (req, res, next)=>{
    Profile.findOne({user:req.userData.userId})
        .then(profile=>{
            const removeIndex = profile.adres
            .map(item => item.id)
            .indexOf(req.params.adr_id);
            profile.adres.splice(removeIndex, 1);
            profile.save().then(profile=> res.json(profile));
        }
)});

router.put('/adres/:adr_id', checkAuth, (req, res, next)=>{
  const newAdres = {
    _id:req.body.id,
    ad:req.body.ad,
    soyad:req.body.soyad,
    tcNo:req.body.tcNo,
    adresTanim:req.body.adresTanim,
    acikAdres1:req.body.acikAdres1,
    acikAdres2:req.body.acikAdres2,
    ilce:req.body.ilce,
    il:req.body.il,
    telefon:req.body.telefon,
    postaKodu:req.body.postaKodu
  };
  Profile.findOne({user:req.userData.userId})
      .then(profile=>{
          const updateIndex = profile.adres
          .map(item=>item.id)
          .indexOf(req.params.adr_id);
          profile.adres.splice(updateIndex,1);
          profile.adres.unshift(newAdres);
          profile.save().then(profile=> res.status(201).json({
            profile: profile ,
            message: 'Updated Adres'}));
      }
)});
// KrediKart bilgilerini silen api
// token bilgisi

router.delete('/kredikart/:kart_id', checkAuth, (req, res, next)=>{
    Profile.findOne({user:req.userData.userId})
        .then(profile=>{
            const removeIndex = profile.krediKart
            .map(item=>item.id)
            .indexOf(req.params.kart_id);
            profile.krediKart.splice(removeIndex,1);
            profile.save().then(profile=> res.json(profile));
        }
)})

router.get('/adres', checkAuth, (req, res, next)=>{
    const errors={};
    Profile.findOne({user:req.userData.userId})
        .then(profile=>{
            if(!profile){
                errors.noprofile ="Bu sitede bu isimle herhangi bir kullanıcı bulunamadı";
                return res.status(404).json(errors)
            }
            res.status(201).json({
              profile: profile.adres,
              message:"adres gönderildi"})
        })
        .catch(err=>res.status(404).json(err));
})

router.get('/kredikart', checkAuth, (req, res, next)=>{
    const errors={};
    Profile.findOne({user:req.userData.userId})
        .then(profile=>{
            if(!profile){
                errors.noprofile ="Bu sitede bu isimle herhangi bir kullanıcı bulunamadı";
                return res.status(404).json(errors)
            }
            res.json(profile.krediKart)
        })
        .catch(err=>res.status(404).json(err));
})


router.post('/cart', checkAuth, (req,res, next)=>{
  Profile.findOne({user:req.userData.userId})
    .then(profile => {
      const carts = {
        productId: req.body.productId,
        fiyat: req.body.fiyat,
        name: req.body.name,
        image: req.body.image,
        quantity: req.body.quantity,
        renk: req.body.renk
      };
      profile.cart.products.unshift(carts);
      profile.save()
      .then(profile => res.status(201).json({
      profile: profile.cart}))
      .catch(error=>{
        res.status(404).json({ messsage:"urun sepete eklenmedi"})
      });
    }
)});

router.put('/cart/:id', checkAuth, (req,res, next)=>{
  Profile.findOne({user:req.userData.userId})
    .then(profile => {
      const quan = req.body.quantity;
      const inde = profile.cart.products.find(prod=>{
        return prod._id.toString() === req.params.id;
      })
      const indeP = profile.cart.products.findIndex(prod=>{
        return prod._id.toString() === req.params.id
      })
      inde.quantity= quan;
      profile.cart.products.splice(indeP, 1);
      profile.cart.products.unshift(inde);
      profile.save().then(profile => res.status(201).json({
      profile: profile.cart,
      message:"cart updated"}));
    }
)});

router.get('/cart', checkAuth, (req, res, next)=>{
  Profile.findOne({user:req.userData.userId})
      .then(profile => {
        res.status(200).json({
          cart: profile.cart.products,
          message: "Sepet gönderildi" })
      })
      .catch(err=> res.status(404).json({
        message: "sepetiniz gönderilemedi"
      }));
})

router.delete('/cart/:id', checkAuth, (req, res, next)=>{
  Profile.findOne({user:req.userData.userId})
      .then(profile => {
          const urunSil = profile.cart.products.findIndex(prod => {
          return prod.productId === req.params.id;
          })
          profile.cart.products.splice(urunSil, 1);
          profile.save()
          .then(profile => res.status(201).json({
            profile: profile.cart,
            message:"cart deleted"}));
      }
)})

router.delete('/cart', checkAuth, (req, res, next)=>{
  Profile.findOne({user:req.userData.userId})
      .then(profile => {
        profile.cart.products.splice(0);
        profile.save()
        .then(profile => res.status(201).json({
          message:"cart deleted"})
        );
      }
)})


module.exports= router;
