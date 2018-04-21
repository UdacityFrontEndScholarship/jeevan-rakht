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
        console.log(token);
        console.log(url1);
        axios.get(url1)
        .then(response => {
            let result = response.data;
            console.log(result);
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
            console.log(data);
            // Store the access token and gplus_id in the session for later use.
            req.session.access_token = access_token;
            req.session.provider = 'facebook'
            req.session.username = data['name']
            req.session.fb_id = data['id']
            req.session.email = data['email']
            // Get user picture
            let url3 = 'https://graph.facebook.com/v2.8/me/picture';
            console.log(url3);
            return axios.get(url3,
                {params :
                    {access_token: access_token
                        ,redirect: 0
                        ,height : 200
                        ,width : 200
                        ,email:data['email']
                    }
                }
            );
        })
        .then(response => {
            req.session.picture = response.data['data']['url'];
            let email = response.config.params.email;
            console.log(response.data);
            //See if user exists, if it doesn't make a new one
            //Srore the user in session
            findByEmail(email,function(err, user) {
                console.log("email");
                if (!err && !user) {
                    let userObj = req.session;
                    userObj.not_flag = 'N';
                    userObj.active_flag = 'A';
                    userObj.type = '1';
                    console.log("create");
                    createOAuthUser(userObj,function(err, newUser) {
                        if (err) {
                            console.log(err);
                            res.status(500);
                            res.send("Internal DB Error");
                            return;
                        }
                        console.log("new");
                        req.session.user = newUser;
                        req.flash('successMessage', 'User created with Google Signin.');
                    });
                }else if(user){
                    req.session.user = user;
                }
            });
            console.log(req.session);
            let output = '';
            output += '<h1>Welcome, ';
            output += req.session.username;
            output += '!</h1>';
            output += '<img src="';
            output += req.session.picture;
            output += ' " style = "width: 160px; height: 160px;border-radius: 150px;\
            -webkit-border-radius: 150px;-moz-border-radius: 150px;"> ';
            res.send(output);
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
