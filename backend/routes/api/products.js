const express = require('express');
const router = express.Router();
const Products = require('../../models/Product');
const Profiles = require('../../models/Profile');
const checkAuth = require('../../middleware/check-auth');
const productController =  require('../../controllers/products');


const validateUrunlerInput = require('../../validation/Urunler');


// tum ürünleri almak için pagination
router.get('', productController.getProducts);
router.get('/:productId', productController.getProductsId);
router.get('/:gt-:lt-:urun-:marka', productController.getFilter);



router.get('/:urun',(req,res,next)=>{
  Products.find({$text: {$search:req.params.urun.toLowerCase()}},{ score: { $meta: "textScore" }})
    .sort({date:-1})
    .then(urunler=> res.json(urunler))
    .catch(err=> res.status(404));
});

// canta sektorüne göre ürün alma
router.get('/:canta',(req,res,next)=>{
  Products.find({$text: {$search:req.params.urun.toLowerCase()}},{ score:{$meta:"textScore" }})
    .sort({score: {$meta:"textScore"}})
    .then(urunler=> res.json(urunler))
    .catch(err=> res.status(404));
});
// cuzdan sektore göre ürün alma
router.get('/:cuzdan',(req,res,next)=>{
  Products.find({$text: {$search:req.params.urun.toLowerCase()}},{ score: { $meta: "textScore" }})
    .sort({date:-1})
    .then(urunler=> res.json(urunler))
    .catch(err=> res.status(404));
});
// valiz sektore göre ürün alma
router.get('/:valiz',(req,res, next)=>{
  Products.find({$text: {$search:req.params.urun.toLowerCase()}},{ score: { $meta: "textScore" }})
    .sort({score: {$meta:"textScore"}})
    .then(urunler=> res.json(urunler))
    .catch(err=> res.status(404));
});
// şal sektore göre ürün alma
router.get('/:sal',(req,res, next)=>{
  Products.find({$text: {$search:req.params.urun.toLowerCase()}},{ score: { $meta: "textScore" }})
    .sort({score: {$meta:"textScore"}})
    .then(urunler=> res.json(urunler))
    .catch(err=> res.status(404));
});


//id sine göre urunleri alma


router.post('/like/:urun_id', checkAuth, (req,res)=>{
    Profiles.findOne({user:req.user.id})
        .then(profile=>{
          Products.findById(req.params.id)
                .then(urun=>{
                    // check for adminnn
                    if(urun.yıldız.filter (yıldız=>yıldız.user.toString()===req.user.id).length>0){
                        return res.status(400).json({yıldızverilmis:"onceden yıldız verilmiş"})
                    }
                    urun.yıldız.unshift({user:req.user.id});
                    urun.save().then(urun=>res.json(urun));
                })
                .catch(err=> res.status(404).json({nourun:"urun bulnamadı"}));
                })

});

router.post('/unlike/:urun_id', checkAuth, (req,res, next)=>{
    Profiles.findOne({user:req.user.id})
        .then(profile=>{
          Products.findById(req.params.id)
                .then(urun=>{

                    if(urun.yıldız.filter (yıldız=>yıldız.user.toString()===req.user.id).lengt===0){
                        return res.status(400).json({yıldızverilmis:"onceden yıldız verilmiş"})
                    }
                    return res.status(400).json({notliked:"urun heüz beğenilmemiş"})
                })
                const removeIndex = urun.yıldız
                .map(item=>item.user.toString())
                .indexOf(req.user.id);

                urun.yıldız.splice(removeIndex,1);
                urun.save().then(urun=>res.json(urun));

                })
                .catch(err=> res.status(404).json({nourun:"urun bulnamadı"}));

});


router.post('/yorum/:urun_id', checkAuth, (req, res, next)=>{
  Products.findById(req.params.urun_id)
    .then(urun => {
      const yorumVar = false;
      urun.yorumlar.map(yorum => {
        if(yorum.kullanıcı.toString()===req.userData.userId){
          return (yorumVar = true);
        }
      })
      if(!yorumVar) {
        const newComment = {
        kullanıcı:req.userData.userId,
        name:req.userData.name,
        yorumBaslik:req.body.yorumBaslik,
        yorumMetni:req.body.yorumMetni,
        puan:req.body.puan,
        }
        urun.yorumlar.unshift(newComment);
        urun.save().then(urun=>res.status(201).json({message:"yorum kayd"}));
      }
    })
    .catch(err=> res.status(404).json({message:"yorumunuz var"}));
});



module.exports= router;
