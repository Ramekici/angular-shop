const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateRegisterInput=(data)=>{
    let errors={};

    data.name= !isEmpty(data.name)?data.name:'';
    data.email= !isEmpty(data.email)?data.email:'';
    data.password= !isEmpty(data.password)?data.password:'';
    data.password2= !isEmpty(data.password2)?data.password2:'';


    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.name="İsim 2 ile 30 karater arasında girilmelidir."
    }

    if(Validator.isEmpty(data.name)){
        errors.name= 'İsim alanı boş bırakılmamalıdır'
    }

    if(Validator.isEmpty(data.email)){
        errors.email= 'Email alanı boş bırakılmamalıdır'
    }

    if(!Validator.isEmail(data.email)){
        errors.email= 'Geçerli bir email adresi giriniz'
    }

    if(Validator.isEmpty(data.password)){
        errors.password= 'Parola alanı boş bırakılmamalıdır'
    }

    if(!Validator.isLength(data.password, {min:6, max:20})){
        errors.password= 'Minumum 6 ile 20 arasında karekter giriniz'
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2= 'Parolayı doğrulayınız'
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2= 'Parolalar birbiri ike uyumlu değil'
    }


    return{
        errors,
        isValid:isEmpty(errors)
    }
};
