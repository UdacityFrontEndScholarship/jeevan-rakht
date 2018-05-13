var express = require('express');
var router = express.Router();
var { login_required } = require('../../utils/authValidator');
var { getDonarCount,getDonarList } = require('../../controllers/userController');

router.get('/', function(req, res, next) {
    let donorlist = [];
    let param ={'title':'Donor List'};    
    if(req.user && req.user._id){
        getDonarList({'user_id':req.user._id}, function(err, result) {
            if (err) {
                param.alertMessage = "DB Error:"+err.message;
                res.render('main/donorlist', param);
            } else if (result) {
                if (req.query.next) {
                    var nextUrl = req.query.next;
                    res.redirect(nextUrl);
                } else {
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                }                                        
            }
        });    
    }else{
        getDonarCount({}, function(err, result) {
            if (err) {
                res.send(JSON.stringify({'error':err.message}));
            } else if (result) {
                if (req.query.next) {
                    var nextUrl = req.query.next;
                    res.redirect(nextUrl);
                } else {
                    console.log(JSON.stringify({'donor_count':result}));
                    res.send(JSON.stringify({'donor_count':result}));
                }                                        
            }
        });
    }    
    });
module.exports = router;
