const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/config');

exports.createUser = (req, res, next) => {

  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
    .then( hash =>{
      const user= new User({
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:hash,
        phoneNumber:req.body.phoneNumber,
      });
      user.save()
      .then(result=>{
        const profile= new Profile({
        user:result._id
        });
        profile.save();
        res.status(201).json({
          message:"User and profile Created",
          result:result
        })
      })
      .catch(err=>{
        res.status(500).json({
            message: "Geçersiz üye bilgileri"
        })
      })
  });
}

exports.userLogin = (req, res, next)=>{
  let fetchedUser;
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(401).json({
                message:"Auth is failed"
              });
          }
          fetchedUser=user;
          return bcrypt.compare(req.body.password, user.password);
      })
      .then(result=> {
        if(!result){
          return res.status(401).json({
            message:"Auth is failed"
          });
        }
        const payload = {userId:fetchedUser._id,
                        name:fetchedUser.name,
                        surname:fetchedUser.surname,
                        phoneNumber:fetchedUser.phoneNumber,
                        email: fetchedUser.email};
        const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn:"1h"});
        res.status(200).json({
          userId: fetchedUser._id,
          token:token,
          expiresIn: 3600
        })
      })
      .catch(err=>{
        return res.status(401).json({
          message:"Auth is failed"
        });
      })
}
