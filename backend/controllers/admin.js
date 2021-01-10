const Products = require('../models/Product');

exports.productCreated = (req, res, next) =>{
  const url = req.protocol + '://' + req.get("host");
  const newUrunler = new Products({
      sektor:req.body.sektor,
      isim:req.body.isim,
      marka:req.body.marka,
      fiyat: parseInt(req.body.fiyat, 0),
      miktar: parseInt(req.body.miktar, 0),
      aciklama:req.body.aciklama,
      indirim: parseInt(req.body.indirim,0),
      renk:{
        renk1:req.body.renk1,
        renk2:req.body.renk2,
        renk3:req.body.renk3
      },
      imagePath: url + '/images/' + req.file.filename,
      user:req.userData.userId
  });
  newUrunler.save().then(urun => res.status(201).json({
    message:"Product added successfully",
    product:{
      ...urun,
      id:urun._id
    }
  }))
  .catch(error=>{
    res.status(404).json({
      message: 'Urun kaydetme başarısız'
    })
  })
}

exports.productUpdated = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/images/' + req.file.filename
  };

  const newProduct = new Products({
    _id:req.body.id,
    sektor:req.body.sektor,
    isim:req.body.isim,
    marka:req.body.marka,
    fiyat:req.body.fiyat,
    miktar:req.body.miktar,
    aciklama:req.body.aciklama,
    indirim:req.body.indirim,
    renk:{
      renk1:req.body.renk1,
      renk2:req.body.renk2,
      renk3:req.body.renk3
    },
    user:req.userData.userId,
    imagePath: imagePath
  });
  Products.updateOne({_id: req.params.id, user: req.userData.userId}, newProduct)
  .then(result => {
    if(result.nModified > 0) {
      res.status(200).json({message: "Updated successful"});
    } else {
      res.status(401).json({message: "Yetkili değilsiniz"})
    }
  })
  .catch(error=>{
    res.status(404).json({
      message: 'Urun güncelleme başarısız'
    })
  })
}

exports.productDeleted = (req, res, next) => {
  Products.deleteOne({_id: req.params.id, user:req.userData.userId })
    .then(result => {
      if(result.n > 0) {
        res.status(200).json({ message: "Silme başarılı"})
      } else {
        res.status(401).json({ message:"Yetkisiz kullanıcı"})
      }
    })
    .catch ( error => {
    res.status(500).json({
      message: "Ürünü silme başarısız"
    })
  });
  // eski yöntem
  //Profiles.findOne({user:req.userData.userId})
  //    .then( profile =>{
  //      Products.findById(req.params.id)
  //        .then(urun=>{
  //          // check for adminnn
  //          if(urun.user.toString()!== req.userData.userId){
  //            return res.status(401).json({ message:"user not authorized"})
  //          }
  //          urun.remove().then(()=>res.json({success:true}))
  //          .catch(err=> res.status(404).json({ message:"urun bulunamadı"}));
  //        })
  // })
}
