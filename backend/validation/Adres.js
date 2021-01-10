const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateAdresInput=(data)=>{
    let errors={};

    data.tcNo= !isEmpty(data.tcNo)?data.tcNo:'';
    data.adresTanım= !isEmpty(data.adresTanım)?data.adresTanım:'';
    data.acıkAdres= !isEmpty(data.acıkAdres)?data.acıkAdres:'';
    data.ilce= !isEmpty(data.ilce)?data.ilce:'';
    data.il= !isEmpty(data.il)?data.il:'';
    data.telefon= !isEmpty(data.telefon)?data.telefon:'';
    data.postaKodu= !isEmpty(data.postaKodu)?data.postaKodu:'';

    if(Validator.isEmpty(data.tcNo)){
        errors.tcNo= 'TC no alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.adresTanım)){
        errors.adresTanım= 'Adres Tanım alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.acıkAdres)){
        errors.acıkAdres= 'Adres alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.ilce)){
        errors.ilce= 'ilce alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.il)){
        errors.il= 'il alanı boş bırakılmamalıdır'
    }
    if(Validator.isEmpty(data.telefon)){
        errors.telefon= 'Telefon alanı boş bırakılmamalıdır'
    }
    if(!Validator.isLength(data.tcNo,{min:11, max:11})){
        errors.tcNo= 'Geçerli tcn numarası giriniz'
    }
    if(!Validator.isLength(data.telefon,{min:11, max:11})){
        errors.telefon= 'Geçerli telefon numarası giriniz'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
