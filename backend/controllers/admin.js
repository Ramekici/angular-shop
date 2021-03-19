const Products = require('../models/Product');
const Category = require('../models/Category');
const Marka = require('../models/Marka');


exports.productCreated = async (req, res, next) => {

  try {
    const url = req.protocol + '://' + req.get("host");
    const newUrunler = new Products({
      category: req.body.category,
      isim: req.body.isim,
      marka: req.body.marka,
      fiyat: parseInt(req.body.fiyat, 0),
      miktar: parseInt(req.body.miktar, 0),
      aciklama: req.body.aciklama,
      indirim: parseInt(req.body.indirim, 0),
      renk: req.body.renkler,
      imagePath: url + '/images/' + req.file.filename,
      user: req.userData.userId
    });
    const urun = await newUrunler.save();

    res.status(201).json({
      message: "Product added successfully",
      product: {
        ...urun,
        id: urun._id
      }
    })
  }
  catch (error) {
    res.status(404).json({
      message: 'Urun kaydetme başarısız'
    })
  }
}


exports.categoryCreated = async (req, res, next) => {
  try {
    const dataCategory = await Category.findOne({category: req.body.category});
    if(dataCategory){
      return res.status(403).json({message: "Aynı kategori mevcut."});
    }
    const newCategory = new Category({
      category: req.body.category
    });
    const data = await newCategory.save();
    res.status(201).json(data._id);
  } catch (err) {
    res.status(403).json(err);
  }
}

exports.markaCreated = async (req, res, next) => {
  try {
    const markaCategory = await Marka.findOne({marka: req.body.marka});
    if(markaCategory){
      return res.status(403).json({message: "Aynı marka mevcut."});
    }
    const newMarka = new Marka({
      marka: req.body.marka
    });
    await newMarka.save();
    res.status(201).json({message:"Urun Başarılı"});
  } catch (err) {
    res.status(403).json(err);
  }
}


exports.markaDelete= async (req, res, next) => {
  try {
    await Marka.deleteOne({_id: req.params.id});
    res.status(201).json();
  } catch (err) {
    res.status(403).json(err);
  }
}

exports.categoryDelete = async (req, res, next) => {
  try {
    await Category.deleteOne({_id: req.params.id});
    res.status(201).json();
  } catch (err) {
    res.status(403).json(err);
  }
}

exports.categoryGet= async (req, res, next) => {
  try {
    const response = await Category.find();
    res.status(201).json(response);
  } catch (err) {
    res.status(403).json(err);
  }
}

exports.markaGet= async (req, res, next) => {
  try {
    const response = await Marka.find();
    res.status(201).json(response);
  } catch (err) {
    res.status(403).json(err);
  }
}

exports.productUpdated = (req, res, next) => {

  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + '/images/' + req.file.filename
  };

  const newProduct = new Products({
    _id: req.body.id,
    sektor: req.body.sektor,
    isim: req.body.isim,
    marka: req.body.marka,
    fiyat: req.body.fiyat,
    miktar: req.body.miktar,
    aciklama: req.body.aciklama,
    indirim: req.body.indirim,
    renk: {
      renk1: req.body.renk1,
      renk2: req.body.renk2,
      renk3: req.body.renk3
    },
    user: req.userData.userId,
    imagePath: imagePath
  });

  Products.updateOne({ _id: req.params.id, user: req.userData.userId }, newProduct)
    .then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Updated successful" });
      } else {
        res.status(401).json({ message: "Yetkili değilsiniz" })
      }
    })
    .catch(error => {
      res.status(404).json({
        message: 'Urun güncelleme başarısız'
      })
    })
}

exports.productDeleted = async (req, res, next) => {

  try {
    const result = await Products.deleteOne({ _id: req.params.id, user: req.userData.userId });
    if (result.n > 0) {
      res.status(201).json({ message: "Silme başarılı" })
    } else {
      res.status(401).json({ message: "Yetkisiz kullanıcı" })
    }
  } catch (error) {
    res.status(403).json({
      message: "Ürünü silme başarısız"
    })
  }

}
