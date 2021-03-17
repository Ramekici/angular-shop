const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


const users = require('./routes/api/users');
const admin = require('./routes/api/admin');
const profiles = require('./routes/api/profiles');
const products = require('./routes/api/products');
const orders = require('./routes/api/orders');
const session = require('express-session');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'gizli bir anahtar kullanıldı', resave: false, saveUninitialized: false}))

const db = require('./config/config').mongoURI;
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology:true})
                    .then(()=> console.log("mongo db connected"))
                    .catch ((err)=> console.log(err));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
})

app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/profiles', profiles);
app.use('/api/products', products);
app.use('/api/orders', orders);

// Set your secret key: remember to switch to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// (async () => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'try',
//   });
// })();

module.exports = app;
