const Validator= require('validator');
const isEmpty = require('./is-empty');


module.exports = validateLoginInput=(data)=>{
    let errors={};


    data.email= !isEmpty(data.email)?data.email:'';
    data.password= !isEmpty(data.password)?data.password:'';


    if(Validator.isEmpty(data.email)){
        errors.email= 'Email alanı boş bırakılmamalıdır'
    }

    if(!Validator.isEmail(data.email)){
        errors.email= 'Geçerli bir email adresi giriniz'
    }

    if(Validator.isEmpty(data.password)){
        errors.password= 'Parola alanı boş bırakılmamalıdır'
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
};
