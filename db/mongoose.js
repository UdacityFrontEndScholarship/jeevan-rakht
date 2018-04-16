const mongoose = require('mongoose');
const userCtrl = require('../controllers/userController.js');

const keys = require('../config/keys');

mongoose.connect(keys.mongodb || 'mongodb://localhost:27017/jeevanrakht',function(error){
  if (error) {
    console.log('Error connecting to database.');
  }  
  console.log('Connected');
});

module.exports = mongoose;