const Products = require('../models/Product');


exports.getProducts = (req, res, next)=>{
  const pageSize= +req.query.ps;
  const currentPage= +req.query.pg;
  var urunlerim = Products.find();
  let fetchProducts;
  if(pageSize && currentPage){
    urunlerim
    .sort({date:-1})
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  urunlerim
    .then(urun => { fetchProducts = urun; return Products.countDocuments()})
    .then(count => res.json({products: fetchProducts, message:"urunler gönderildi", maxProducts: count}))
    .catch(err => res.status(404).json({
      message: "urunleri getirme başarısız"
    }));
}


exports.getProductsId = (req, res, next)=>{
  Products.findById(req.params.productId)
    .then(urun =>  {
      console.log(urun);
      res.status(201).json(urun);
    })
    .catch(err=> res.status(404).json({message :"Urun bulunamadı"}));
}


exports.getFilter = (req, res, next)=>{
  Products.find({fiyat: { $gt:req.params.gt, $lt: req.params.lt}, sektor:req.params.urun.toLowerCase(), marka:req.params.marka.toLowerCase()})
    .sort({date:-1})
    .then(urunler => res.json(urunler))
    .catch(err => res.status(404));
}
