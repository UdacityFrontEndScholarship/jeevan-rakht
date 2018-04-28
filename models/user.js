const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserAccount = new Schema({
    user_name: {
        type: String,
        minlength: 6,
    },            
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    user_type: {
        type: String,
        required: true
    },
    indiv: {
        name: { type: String },
        indiv_type: { type: String },
        age: { type: Number, min: 18, max: 65 }
    },
    non_indiv: {
        org_name: { type: String }, 
        license: { type: String },
        unit_stock: { type: Number}
    },
    gender: {
        type: String
    },        
    dob: {
        type: Date
    },            
    last_donation: {
        type: Date
    },                
    height: {
        type: Number
    },    
    weight:{
        type: Number
    },            
    notification_flag: {
        type: String,
        required: true
    },
    active_flag: {
        type: String,
        required: true
    },        
    mobile: {
        type: String
    },
    password: {
        type: String
    },
    OAuth2_user: {
        type: Array
    },
    blood_grp: {
        type: String
    },    
    address: {
        addr_line1: { type: String },
        addr_line2: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        place_id: { type: String }
    },    
    picture: {
        type: Array        
    },
    updated: { 
        type: Date, 
        default: Date.now 
    }
});

var User = mongoose.model('user', UserAccount);

module.exports = User;