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
    },
    user_type: {
        type: String,
        required: true
    },
    indiv: {
        name: { type: String },
        indiv_type: { type: String },
        age: { type: Number, min: 18, max: 65 },
        blood_grp: { type: String },    
        gender: { type: String },        
        dob: { type: Date },            
        last_donation: { type: Date },                
        height: { type: Number },    
        weight:{ type: Number },                    
        appointment : {
                        appointment_date: { type: Date },  
                        blood_bank_id :{ type: mongoose.Schema.Types.ObjectId } 
                    }
    },
    non_indiv: {
        org_name: { type: String }, 
        license: { type: String },
        unit_stock: { type: Number}
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
    OAuth2_user: {
        type: Array
    },
    address: {
        addr_type: { type: String },
        addr_line1: { type: String },
        addr_line2: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        place_id: { type: String },
        coordinates: {
                latdec: { type: Number },
                londec: { type: Number }
            }
    },    
    picture: {
        type: Array        
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    updated: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

var User = mongoose.model('user', UserAccount);

module.exports = User;