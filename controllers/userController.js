const UserAcct = require('../models/user');
const bcrypt = require('bcryptjs');
var moment = require('moment');

var signupUser = function(usrObj, callback) {
    var newUser = new UserAcct(usrObj);
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.log('Some error occured while salting.', err);
            callback(err, undefined);
            return;
        }
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) {
                console.log('Some error occured while hashing the password', err);
                callback(err, undefined);
                return;
            }
            newUser.password = hash;
            newUser.save(function(err, data) {
                if (err) {
                    console.log('Unable to save user', err);
                    callback(err, undefined);
                    return;
                }
                console.log('Saved from user model', data);
                callback(err, data);
            });
        });
    });
}

var findByEmail = function(email, callback) {
    UserAcct.findOne({ email: email }, function(err, emailResult) {
        if (err) {
            console.log('something went wrong while finding user in database.', err);
            callback(err, undefined);
            return;
        } else if (emailResult) {
            console.log('Email found');
            callback(err, emailResult);
            return;
        }
        console.log('Email not found', emailResult);
        callback(err, emailResult);
    });
}

var findById = function(id, callback) {
    UserAcct.findById(id, function(err, emailResult) {
        if (err) {
            console.log('something went wrong while finding user in database.', err);
            callback(err, undefined);
            return;
        } else if (emailResult) {
            console.log('user found');
            callback(err, emailResult);
            return;
        }
        console.log('user not found', emailResult);
        callback(err, emailResult);
    });
}

var deleteUser = function(userObj, callback) {
    UserAcct.findOne({ '_id': userObj.id }, function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
            UserAcct.deleteOne({ '_id': userObj.id }, function(err, success) {
                if (err) {
                    callback(err, undefined);
                } else if (success) {
                    callback(undefined, success);
                } else if (!success) {
                    callback(undefined, undefined);
                }
            });
        }
    });    
}
var createOAuthUser = function(usrObj, callback) {
    var newUser = new UserAcct({
        user_name: usrObj.username,
        'indiv.name': usrObj.username,
        email: usrObj.email,
        picture: usrObj.picture,
        active_flag: usrObj.active_flag,
        user_type: usrObj.type,
        notification_flag: usrObj.not_flag,
        OAuth2_user: [usrObj.provider]
    });
    newUser.save(function(err, data) {
        if (err) {
            console.log('Unable to save user', err);
            callback(err, undefined);
            return;
        }
        callback(err, data);
    });
}

var loginUser = function(userObj, callback) {
    UserAcct.findOne({ email: userObj.email }, function(err, resultFromDb) {
        console.log(resultFromDb);
        if (err) {
            console.log('something went wrong while fetching user from db.');
            callback(err, undefined);
            return;
        } else if (resultFromDb) {
            console.log('user found.');
            bcrypt.compare(userObj.password, resultFromDb.password, function(err, result) {
                if (err) {
                    console.log('something went wrong while comparing password with hashed one.');
                    callback(err, undefined);
                    return;
                } else if (result) {
                    callback(undefined, 1);
                    return;
                } else if (!result) {
                    callback(undefined, 0);
                    return;
                }
            });
        } else if (!resultFromDb) {
            console.log('user not found');
            callback(undefined, resultFromDb);
            return;
        }
    });
}

var activateUser = function(user,callback) {
    user.active_flag = 'A';    
    user.save(function(err, data) {
        if (err) {
            console.log('Unable to save user', err);
            callback(err, undefined);
            return;
        }
        console.log('Saved from user model', data);
        callback(err, data);
    });  
}  
var updatePassword = function(userObj, callback) {
    UserAcct.findOne({ email: userObj.email }, function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                console.log('Some error occured while salting.', err);
                callback(err, undefined);
                return;
            }                    
            bcrypt.hash(userObj.password, salt, function(err, hash) {
                if (err) {
                    callback(err, undefined);
                } else if (hash) {
                    var item = {
                        password: hash
                    }
                    UserAcct.updateOne({ email: userObj.email }, { $set: item }, function(err, newResult) {
                        if (err) {
                            callback(err, undefined);
                        } else if (newResult) {
                            callback(undefined, newResult);
                        }
                    });
                }
            });
        });
        } else if (!result) {
            callback(undefined, undefined);
        }
    });
}

var updateUser = function(userObj, callback) {
    var  item ={
        mobile: userObj.mobile,
        address: {
            addr_type: userObj.addrtype,
            addr_line1: userObj.address1,
            addr_line2: userObj.address2,
            city: userObj.city,
            state: userObj.state,
            pincode: userObj.zip,
            place_id: userObj.place_id,
            coordinates: {
                    latdec: userObj.lat,
                    londec: userObj.lng
                }
        },    
        updated : Date.now() 
    };
    if (userObj.usertype === 'Individual'){
        item.indiv = {
            name: userObj.firstname + ' ' + userObj.lastname,
            first_name: userObj.firstname,  
            last_name : userObj.lastname, 
            age: userObj.age,
            blood_grp: userObj.bloodgroup,
            gender: userObj.gender,        
            last_donation: moment(userObj.last_donation,'DD/MM/YYYY').format('MM/DD/YYYY'),                
            height: userObj.height,    
            weight: userObj.weight
        };
        if (userObj.appointment){
            item.indiv.appointment = userObj.appointment;    
        }
    }else{
        item.non_indiv = {
            org_name: userObj.orgname,
            license: userObj.license,
            unit_stock: userObj.stock
        };
    }

    UserAcct.findByIdAndUpdate(userObj.id, { $set: item }, function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
            callback(undefined, result);
        } else if (!result) {
            callback(undefined, undefined);
        }
    });    
}

var bookAppointment = function(userObj, callback) {    
    var  item ={"indiv.appointment.appointment_date": moment(userObj.bookdate,'DD/MM/YYYY').format('MM/DD/YYYY'),
                "indiv.appointment.donor_city" : userObj.bookcity,
                "updated" : Date.now() 
            };
    UserAcct.findByIdAndUpdate(userObj.id, { $set: item }, function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
            callback(undefined, result);
        } else if (!result) {
            callback(undefined, undefined);
        }
    });    
}

var getDonarList = function(userObj, callback) {    
    var queryFilter = { $and: [
        {'indiv.appointment':{$exists:true}}
        ,{'indiv.appointment':{$ne:null}}
        ,{'indiv.appointment':{$ne:{}}}
        ] };
    if (userObj.user_id) { queryFilter.$and.push({'_id':{$ne:userObj.user_id}}); }
    if (userObj.bloodgroup) { queryFilter.$and.push({"indiv.blood_grp": userObj.bloodgroup}); }
    if (userObj.bookcity) { queryFilter.$and.push({"indiv.appointment.donor_city": userObj.bookcity}); }
    if (userObj.bookdate) { queryFilter.$and.push({"indiv.appointment.appointment_date": moment.utc(userObj.bookdate,'DD/MM/YYYY').format()}); }    
    var  donars =[];      
    UserAcct.find(queryFilter, 
                        { 'email':1
                        ,'mobile':1
                        ,'indiv.name':1
                        ,'indiv.appointment':1
                        ,'indiv.age':1
                        ,'indiv.blood_grp': 1
                        // ,'picture':1
                        }
        , function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
            callback(undefined, result);
        } else if (!result) {
            callback(undefined, undefined);
        }
    });    
}

var getDonarCount = function(userObj, callback) {    
    var  donars =[];
    UserAcct.count({$and : [
                        {'indiv.appointment':{$exists:true}}
                        ,{'indiv.appointment':{$ne:null}}
                        ,{'indiv.appointment':{$ne:{}}}
                        ]},
        function(err, result) {
        if (err) {
            callback(err, undefined);
        } else if (result) {
            callback(undefined, result);
        } else if (!result) {
            callback(undefined, undefined);
        }
    });    
}

module.exports.signupUser = signupUser;
module.exports.findByEmail = findByEmail;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.createOAuthUser = createOAuthUser;
module.exports.loginUser = loginUser;
module.exports.findById = findById;
module.exports.activateUser = activateUser;
module.exports.updatePassword = updatePassword;
module.exports.bookAppointment = bookAppointment;
module.exports.getDonarList = getDonarList;
module.exports.getDonarCount = getDonarCount;