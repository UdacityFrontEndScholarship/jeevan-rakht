const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const fb_client_secret = require('../../config/fb_client_secrets.json');
var { findByEmail, createOAuthUser } = require('../../controllers/userController');
const app_id = fb_client_secret['web']['app_id'];
const app_secret = fb_client_secret['web']['app_secret'];

var rawParser = bodyParser.raw();

router.post('/', rawParser,function(req, res, next) {
    if (req.query.state !== req.session.STATE){
        console.log('Invalid state parameter.');
        res.set('Content-Type', 'application/json');
        res.status(401);
        res.json({"error":"Invalid state parameter."});
        return;
    }
    // Obtain authorization code
        let token = req.body.toString('utf8');
        let url1 = 'https://graph.facebook.com/oauth/access_token?' +
        'grant_type=fb_exchange_token&client_id='+app_id
        +'&client_secret='+app_secret
        +'&fb_exchange_token='+token;
        console.log(url1);
        axios.get(url1)
        .then(response => {
            let result = response.data;
            // let access_token = JSON.stringify(result).split(',')[0].split(':')[1].replace(/"/g,'');
            let access_token = result.access_token;
            console.log(access_token);
            //Get user info from API
            let url2 = 'https://graph.facebook.com/v2.8/me';
            console.log(url2);
            return axios.get(url2,
                {params :
                    {access_token: access_token
                        ,fields: 'name,id,email'
                    }
                }
            );
        })
        .then(response => {
            access_token = response.config.params.access_token;
            let data = response.data;
            // Store the access token and gplus_id in the session for later use.
            req.session.access_token = access_token;
            req.session.provider = 'facebook'
            req.session.fb_id = data['id']
            // Get user picture
            let url3 = 'https://graph.facebook.com/v2.8/me/picture';
            console.log(url3);
            return axios.get(url3,
                {params :
                    {access_token: access_token
                        ,redirect: 0
                        ,height : 200
                        ,width : 200
                        ,email :data['email']
                        ,name :data['name']
                    }
                }
            );
        })
        .then(response => {
            let picture = response.data['data']['url'];
            let email = response.config.params.email;
            let name = response.config.params.name;
            //See if user exists, if it doesn't make a new one
            //Srore the user in session
            findByEmail(email,function(err, user) {
                if (err){
                    return res.status(500).send({ "error": err.message });     
                }                
                let sendResp = function(){
                    console.log("Zooooooooooooooooom");
                    let output = '<div>';
                    output += '<h1>Welcome, ';
                    output += name;
                    output += '!</h1>';
                    output += '<img src="';
                    output += picture;
                    output += ' " style = "width: 150px; height: 150px; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%;"> ';
                    output += '</div>';
                    res.send(output);    
                };
                if (!user) {
                    let userObj = req.session;
                    userObj.username = name
                    userObj.picture = picture
                    userObj.email = email
                    userObj.not_flag = 'N';
                    userObj.active_flag = 'A';
                    userObj.type = 'Individual';
                    createOAuthUser(userObj,function(err, newUser) {
                        if (err) {
                            return res.status(500).send({ "error": err.message });     
                        }
                        req.session.user = newUser;
                        req.flash('successMessage', 'User created with Google Signin.');
                        sendResp();
                    });
                }else if(user){
                    req.session.user = user;
                    sendResp();
                }
            });
        })
        .catch(error => {
            req.session = null;
            console.log("axios inner error");
            console.log(Object.keys(error));
            console.log(error);
            res.set('Content-Type', 'application/json');
            res.status(500);
            res.json({"error":error.response});
        })
        .catch(error => {console.log("inside catch error");console.log(error);})
    });
module.exports = router;
