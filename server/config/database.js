const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('db connected successfully')
    }).catch((error)=>{
        console.log(error);
        console.log('DB connection failed');
        process.exit(1);
    })
};