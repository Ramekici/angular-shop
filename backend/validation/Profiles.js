const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateProfilesInput=(data)=>{
    let errors={};

    data.handle= !isEmpty(data.handle)?data.handle:'';

    if(!Validator.isLength(data.handle,{min:5,max:40})){
        errors.handle= 'Kullanıcı adını 5 karakterden az olmamalıdır'
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle= 'Kullanıcı adını giriniz'
    }
    if(!isEmpty(data.twitter)){
         if(!Validator.isURL(data.twitter)){
        errors.twitter= 'Geçerli Url adresi giriniz'
        }
    }
    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
       errors.facebook= 'Geçerli Url adresi giriniz'
       }
    }
    if(!isEmpty(data.youtube)){
        if(!Validator.isURL(data.youtube)){
       errors.youtube= 'Geçerli Url adresi giriniz'
       }
   }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
