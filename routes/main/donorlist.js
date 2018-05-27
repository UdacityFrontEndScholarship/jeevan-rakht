var express = require('express');
var router = express.Router();
var { login_required } = require('../../utils/authValidator');
var { getDonarCount,getDonarList } = require('../../controllers/userController');

router.post('/', function(req, res, next) {
    let userObj = req.body;
    if(req.user){
        userObj.user_id = req.user._id
    };
    let donorlist = [];
    let param ={'title':'Donor List'};    
    getDonarList(userObj, function(err, result) {
        if (err) {
            res.send(JSON.stringify({'error':err.message}));
        } else if (result) {
            if (req.query.next) {
                var nextUrl = req.query.next;
                res.redirect(nextUrl);
            } else {
                if(req.user && req.user._id){        
                    res.send(JSON.stringify(result));
                }else{
                    res.send(JSON.stringify({'donor_count':result.length}));
                }    
            }                                        
        }
    });    
});
module.exports = router;
