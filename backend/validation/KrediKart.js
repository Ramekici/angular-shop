const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateKrediKartInput=(data)=>{
    let errors={};


    data.adSoyad= !isEmpty(data.adSoyad)?data.adSoyad:'';
    data.kartNumarası= !isEmpty(data.kartNumarası)?data.kartNumarası:'';
    data.sonKullanmaTarihi= !isEmpty(data.sonKullanmaTarihi)?data.sonKullanmaTarihi:'';


    if(Validator.isEmpty(data.adSoyad)){
        errors.adSoyad= 'advesoyad alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.kartNumarası)){
        errors.kartNumarası= 'kartNumarası alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.sonKullanmaTarihi)){
        errors.sonKullanmaTarihi= 'sonKullanmaTarihi alanı boş bırakılmamalıdır'
    }

    if(!Validator.isLength(data.kartNumarası,{min:16, max:16})){
        errors.kartNumarası= 'Geçerli kartNumarası numarası giriniz'
    }
    if(!Validator.isLength(data.sonKullanmaTarihi,{min:4, max:4})){
        errors.sonKullanmaTarihi= 'Geçerli sonKullanmaTarihi numarası giriniz'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
