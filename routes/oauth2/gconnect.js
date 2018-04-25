const express = require('express');
const request = require('request');
const axios = require('axios');
const jwtDecode = require('jwt-decode');
const {google} = require('googleapis');
const bodyParser = require('body-parser');
const router = express.Router();
const gp_client_secret = require('../../config/gp_client_secrets.json');
var { findByEmail, createOAuthUser } = require('../../controllers/userController');
const oauth2Client = new google.auth.OAuth2(
    gp_client_secret['web']['client_id'],
    gp_client_secret['web']['client_secret'],
    'postmessage'
  );

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
    let code = req.body.toString('utf8');
    // Exchange authorization code with access token
    oauth2Client.getToken(code, function (err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (err){
            console.log('Failed to exchange the authorization code with access_token.');
            res.set('Content-Type', 'application/json');
            res.status(401);
            res.json({"error":"Failed to exchange the authorization code with access_token."});
            return;
        } else {
          oauth2Client.setCredentials(tokens);
          let access_token = tokens['access_token'];
        //   console.log(tokens);
          let openID_token = jwtDecode(tokens['id_token'])
        //   console.log(openID_token);
          let gplus_id = openID_token['sub'];
          let pr =  function(url1){
            axios.get(url1)
            .then(response => {
                let result = response.data;
                // Verify that the access token is used for the intended user.
                if (result['user_id'] !== gplus_id){
                console.log("Token's user ID doesn't match given user ID.");
                res.set('Content-Type', 'application/json');
                res.status(401);
                res.json({"error":"Token's user ID doesn't match given user ID."});
                }
                // Verify that the access token is valid for this app.
                if (result['issued_to'] !== gp_client_secret['web']['client_id']){
                    console.log("Token's client ID does not match app's.");
                    res.set('Content-Type', 'application/json');
                    res.status(401);
                    res.json({"error":"Token's client ID does not match app's."});
                }
                //Get user info
                let url2 = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+access_token+"&alt=json";
                return axios.get(url2);
                })
                .then(response => {
                    let data = response.data;
                    // Store the access token and gplus_id in the session for later use.
                    req.session.access_token = access_token;
                    req.session.gplus_id = gplus_id;
                    req.session.provider = 'google' 
                    //See if user exists, if it doesn't make a new one
                    //Srore the user in session
                    findByEmail(data['email'],function(err, user) {
                        if (err){
                            return res.status(500).send({ "error": err.message });     
                        }
                        let sendResp = function(){
                            console.log("Zooooooooooooooooom");
                            let output = '';
                            output += '<h1>Welcome, ';
                            output += data['name'];
                            output += '!</h1>';
                            output += '<img src="';
                            output += data['picture'];
                            output += ' " style = "width: 160px; height: 160px;border-radius: 150px;\
                            -webkit-border-radius: 150px;-moz-border-radius: 150px;"> ';
                            res.send(output);                        
                        };                        
                        if (!user) {
                            let userObj = req.session;
                            userObj.username = data['name']
                            userObj.picture = data['picture']
                            userObj.email = data['email']   
                            userObj.not_flag = 'N';
                            userObj.active_flag = 'A';
                            userObj.type = '1';
                            createOAuthUser(userObj,function(err, newUser) {
                                if (err) {
                                    return res.status(500).send({ "error": err.message });     
                                }
                                // sets a cookie with the user's info
                                req.session.user = newUser;
                                req.flash('successMessage', 'User created with Google Signin.');
                                sendResp();
                            });
                        }else if(user){
                            // sets a cookie with the user's info
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
            };
        // check also if access token is valid or expired, if expired then resrore
        // the access token
        let stored_access_token = req.session.access_token;
        let stored_gplus_id = req.session.gplus_id;
        let stored_url = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+stored_access_token;
        axios.get(stored_url)
        .then(response => {
            if (stored_access_token && gplus_id === stored_gplus_id){
                res.status(200);
                res.send("<p>Current user is already connected.</p>");
            }else{
                // Check that the access token is valid.
                let url1 = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+access_token;
                pr(url1);
            }
            })
            .catch(error => {
                console.log("Store access_toke API error");
                console.log(Object.keys(error));
                let url1 = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="+access_token;
                pr(url1);
            })
            .catch(error => {console.log("inside catch error");console.log(error);})
            }
        });
    });
module.exports = router;