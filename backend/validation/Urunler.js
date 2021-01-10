const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateUrunlerInput=(data)=>{
    let errors={};

    data.urunKodu= !isEmpty(data.urunKodu)?data.urunKodu:'';
    data.marka= !isEmpty(data.marka)?data.marka:'';
    data.fiyat= !isEmpty(data.fiyat)?data.fiyat:'';
    data.acıklama= !isEmpty(data.acıklama)?data.acıklama:'';
    data.miktar= !isEmpty(data.miktar)?data.miktar:'';
    data.image1= !isEmpty(data.image1)?data.image1:'';
    data.sektor= !isEmpty(data.sektor)?data.sektor:'';


    if(Validator.isEmpty(data.urunKodu)){
        errors.urunKodu= 'urunKodu alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.sektor)){
        errors.sektor= 'sektor alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.marka)){
        errors.marka= 'marka alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.fiyat)){
        errors.fiyat= 'fiyat alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.image1)){
        errors.image1= 'image alanı boş bırakılmamalıdır'
    }
    if(!Validator.isURL(data.image1)){
        errors.image1= 'Geçerli Url adresi giriniz'
    }
    if(Validator.isEmpty(data.miktar)){
        errors.miktar= 'miktar alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.acıklama)){
        errors.acıklama= 'acıklama alanı boş bırakılmamalıdır'
    }
    if(!Validator.isLength(data.acıklama,{min:10,max:200})){
        errors.acıklama= 'acıklama alanı 200 karakter ile sınırlandırılmıştır.'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
